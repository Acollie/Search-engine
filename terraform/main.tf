terraform {
  required_providers {
    hcloud = {
      source  = "hetznercloud/hcloud"
      version = "~> 1.50"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.6"
    }
  }
}

provider "hcloud" {
  token = var.hcloud_token
}

# Stable cluster join token — do not change after first apply
resource "random_password" "k3s_token" {
  length  = 64
  special = false
}

# Private overlay network (eu-central covers fsn1 + nbg1)
resource "hcloud_network" "main" {
  name     = "search-engine"
  ip_range = "10.0.0.0/16"
}

resource "hcloud_network_subnet" "k8s" {
  network_id   = hcloud_network.main.id
  type         = "cloud"
  network_zone = "eu-central"
  ip_range     = "10.0.1.0/24"
}

resource "hcloud_firewall" "k8s" {
  name = "search-engine-k8s"

  rule {
    direction  = "in"
    protocol   = "tcp"
    port       = "22"
    source_ips = var.allowed_ssh_ips
  }

  rule {
    direction  = "in"
    protocol   = "tcp"
    port       = "80"
    source_ips = ["0.0.0.0/0", "::/0"]
  }

  rule {
    direction  = "in"
    protocol   = "tcp"
    port       = "443"
    source_ips = ["0.0.0.0/0", "::/0"]
  }

  # kubectl access — restrict to your IP via allowed_ssh_ips
  rule {
    direction  = "in"
    protocol   = "tcp"
    port       = "6443"
    source_ips = var.allowed_ssh_ips
  }

  # Traefik NodePorts — Hetzner LB connects to servers on public IPs
  rule {
    direction  = "in"
    protocol   = "tcp"
    port       = "30080"
    source_ips = ["0.0.0.0/0", "::/0"]
  }

  rule {
    direction  = "in"
    protocol   = "tcp"
    port       = "30443"
    source_ips = ["0.0.0.0/0", "::/0"]
  }

  # flannel VXLAN — required for cross-node pod networking
  rule {
    direction  = "in"
    protocol   = "udp"
    port       = "8472"
    source_ips = ["0.0.0.0/0", "::/0"]
  }

  # kubelet API — required for kubectl exec/logs/port-forward and metrics-server
  rule {
    direction  = "in"
    protocol   = "tcp"
    port       = "10250"
    source_ips = ["0.0.0.0/0", "::/0"]
  }

  # Allow ICMP for debugging
  rule {
    direction  = "in"
    protocol   = "icmp"
    source_ips = ["0.0.0.0/0", "::/0"]
  }
}

resource "hcloud_ssh_key" "default" {
  name       = "search-engine-key"
  public_key = var.ssh_public_key
}

resource "hcloud_server" "control_plane" {
  name         = "search-engine-cp-1"
  image        = "ubuntu-22.04"
  server_type  = var.control_plane_type
  location     = var.location
  ssh_keys     = [hcloud_ssh_key.default.id]
  firewall_ids = [hcloud_firewall.k8s.id]

  user_data = templatefile("${path.module}/cloud-init/control-plane.yaml.tpl", {
    k3s_version = var.k3s_version
    k3s_token   = random_password.k3s_token.result
  })

  network {
    network_id = hcloud_network.main.id
    subnet_id  = hcloud_network_subnet.k8s.id
  }

  depends_on = [hcloud_network_subnet.k8s]
}

resource "hcloud_server" "workers" {
  count        = var.worker_count
  name         = "search-engine-worker-${count.index + 1}"
  image        = "ubuntu-22.04"
  server_type  = var.worker_type
  location     = var.location
  ssh_keys     = [hcloud_ssh_key.default.id]
  firewall_ids = [hcloud_firewall.k8s.id]

  user_data = templatefile("${path.module}/cloud-init/worker.yaml.tpl", {
    k3s_version = var.k3s_version
    k3s_token   = random_password.k3s_token.result
    server_ip   = hcloud_server.control_plane.ipv4_address
  })

  network {
    network_id = hcloud_network.main.id
    subnet_id  = hcloud_network_subnet.k8s.id
  }

  depends_on = [hcloud_network_subnet.k8s, hcloud_server.control_plane]
}

resource "hcloud_load_balancer" "ingress" {
  name               = "search-engine-lb"
  load_balancer_type = "lb11"
  location           = var.location
}

resource "hcloud_load_balancer_network" "ingress" {
  load_balancer_id = hcloud_load_balancer.ingress.id
  network_id       = hcloud_network.main.id
  depends_on       = [hcloud_network_subnet.k8s]
}

resource "hcloud_load_balancer_target" "workers" {
  count            = var.worker_count
  load_balancer_id = hcloud_load_balancer.ingress.id
  type             = "server"
  server_id        = hcloud_server.workers[count.index].id
  use_private_ip   = false
  depends_on       = [hcloud_load_balancer_network.ingress]
}

# :80 → Traefik NodePort 30080
resource "hcloud_load_balancer_service" "http" {
  load_balancer_id = hcloud_load_balancer.ingress.id
  protocol         = "tcp"
  listen_port      = 80
  destination_port = 30080

  health_check {
    protocol = "tcp"
    port     = 30080
    interval = 15
    timeout  = 10
    retries  = 3
  }
}

# :443 → Traefik NodePort 30443 (TCP passthrough, TLS terminated by Traefik)
resource "hcloud_load_balancer_service" "https" {
  load_balancer_id = hcloud_load_balancer.ingress.id
  protocol         = "tcp"
  listen_port      = 443
  destination_port = 30443

  health_check {
    protocol = "tcp"
    port     = 30443
    interval = 15
    timeout  = 10
    retries  = 3
  }
}

# DNS — update these A records manually in your DNS provider after apply:
#   search.collie.codes  → <load_balancer_ip from terraform output>
#   metrics.collie.codes → <load_balancer_ip from terraform output>
