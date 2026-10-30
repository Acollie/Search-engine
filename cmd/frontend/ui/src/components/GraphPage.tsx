import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

interface RawNode {
  id: string
  url: string
  title: string
  score: number
}

interface RawEdge {
  source: string
  target: string
  weight?: number
}

interface Props {
  onHome: () => void
}

const GREEN     = '#33ff33'
const GREEN_HEX = 0x33ff33
const GREEN_DIM = '#1a7a1a'
const BG        = '#030c03'

function makeGlowTexture(color: string): THREE.CanvasTexture {
  const size = 128
  const c = document.createElement('canvas')
  c.width = c.height = size
  const ctx = c.getContext('2d')!
  const mid = size / 2
  const g = ctx.createRadialGradient(mid, mid, 0, mid, mid, mid)
  g.addColorStop(0,   color)
  g.addColorStop(0.3, color)
  g.addColorStop(0.7, 'rgba(51,255,51,0.15)')
  g.addColorStop(1,   'transparent')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  return new THREE.CanvasTexture(c)
}

export default function GraphPage({ onHome }: Props) {
  const mountRef              = useRef<HTMLDivElement>(null)
  const [mode, setMode]       = useState<'3d' | '2d' | 'constellation'>('3d')
  const [status, setStatus]   = useState<'loading' | 'ok' | 'error'>('loading')
  const [info, setInfo]       = useState({ nodes: 0, edges: 0 })
  const [tooltip, setTooltip] = useState<{ title: string; x: number; y: number } | null>(null)
  const [n, setN]             = useState(100)
  const [displayN, setDisplayN] = useState(100)

  // ── 3D effect ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (mode !== '3d') return
    const mount = mountRef.current
    if (!mount) return

    setStatus('loading')
    setInfo({ nodes: 0, edges: 0 })
    setTooltip(null)

    const w = mount.clientWidth, h = mount.clientHeight
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(w, h)
    renderer.setClearColor(0x030c03, 1)
    mount.appendChild(renderer.domElement)

    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 2000)
    camera.position.set(0, 0, 280)

    const controls           = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping   = true
    controls.dampingFactor   = 0.08
    controls.autoRotate      = true
    controls.autoRotateSpeed = 0.4
    controls.minDistance     = 80
    controls.maxDistance     = 600

    scene.add(new THREE.AmbientLight(0x001a00, 2))
    scene.add(new THREE.PointLight(GREEN_HEX, 1.2, 600))

    const glowTex = makeGlowTexture('rgba(51,255,51,0.9)')
    const dimTex  = makeGlowTexture('rgba(10,60,10,0.7)')

    interface PhysNode3D extends RawNode {
      x: number; y: number; z: number
      vx: number; vy: number; vz: number
      r: number
      sprite: THREE.Sprite
      light: THREE.PointLight
    }

    let nodes: PhysNode3D[]  = []
    let edges: RawEdge[]     = []
    let edgeObjects: { line: THREE.Line; src: string; tgt: string }[] = []
    let hovered: PhysNode3D | null = null
    let hoverNeighbours = new Set<string>()
    let animId = 0

    fetch(`/api/graph?n=${n}`)
      .then(r => r.json())
      .then((data: { nodes: RawNode[]; edges: RawEdge[] }) => {
        const maxScore = Math.max(...data.nodes.map(nd => nd.score), 0.001)

        nodes = data.nodes.map((nd, i) => {
          const phi   = Math.acos(-1 + (2 * i) / data.nodes.length)
          const theta = Math.sqrt(data.nodes.length * Math.PI) * phi
          const r     = 3 + (nd.score / maxScore) * 9
          const pos   = new THREE.Vector3(
            60 * Math.sin(phi) * Math.cos(theta) + (Math.random() - 0.5) * 30,
            60 * Math.sin(phi) * Math.sin(theta) + (Math.random() - 0.5) * 30,
            60 * Math.cos(phi)                   + (Math.random() - 0.5) * 30,
          )
          const mat = new THREE.SpriteMaterial({
            map: glowTex, color: GREEN_HEX,
            transparent: true, opacity: 1,
            blending: THREE.AdditiveBlending, depthWrite: false,
          })
          const sprite = new THREE.Sprite(mat)
          sprite.scale.setScalar(r * 3.5)
          sprite.position.copy(pos)
          scene.add(sprite)

          const light = new THREE.PointLight(GREEN_HEX, 0.15, r * 12)
          light.position.copy(pos)
          scene.add(light)

          return { ...nd, x: pos.x, y: pos.y, z: pos.z, vx: 0, vy: 0, vz: 0, r, sprite, light }
        })

        edges = data.edges || []

        for (const e of edges) {
          const s = nodes.find(nd => nd.id === e.source)
          const t = nodes.find(nd => nd.id === e.target)
          if (!s || !t) continue
          const geo = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(s.x, s.y, s.z),
            new THREE.Vector3(t.x, t.y, t.z),
          ])
          const lineMat = new THREE.LineBasicMaterial({
            color: GREEN_HEX, transparent: true, opacity: 0.10,
            blending: THREE.AdditiveBlending, depthWrite: false,
          })
          const line = new THREE.Line(geo, lineMat)
          scene.add(line)
          edgeObjects.push({ line, src: e.source, tgt: e.target })
        }

        setInfo({ nodes: nodes.length, edges: edges.length })
        setStatus('ok')
      })
      .catch(() => setStatus('error'))

    const tick = () => {
      const map = new Map(nodes.map(nd => [nd.id, nd]))
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        a.vx -= a.x * 0.002; a.vy -= a.y * 0.002; a.vz -= a.z * 0.002
        for (let j = i + 1; j < nodes.length; j++) {
          const b  = nodes[j]
          const dx = a.x-b.x, dy = a.y-b.y, dz = a.z-b.z
          const d2 = Math.max(dx*dx+dy*dy+dz*dz, 100)
          const d  = Math.sqrt(d2), f = 220/d2
          const fx = (dx/d)*f, fy = (dy/d)*f, fz = (dz/d)*f
          a.vx+=fx; a.vy+=fy; a.vz+=fz
          b.vx-=fx; b.vy-=fy; b.vz-=fz
        }
      }
      for (const e of edges) {
        const s = map.get(e.source), t = map.get(e.target)
        if (!s || !t) continue
        const dx = t.x-s.x, dy = t.y-s.y, dz = t.z-s.z
        const d  = Math.sqrt(dx*dx+dy*dy+dz*dz)||1
        const f  = (d-70)*0.006
        const fx=(dx/d)*f, fy=(dy/d)*f, fz=(dz/d)*f
        s.vx+=fx; s.vy+=fy; s.vz+=fz
        t.vx-=fx; t.vy-=fy; t.vz-=fz
      }
      const maxSpd = 5, pos = new Float32Array(6)
      for (const nd of nodes) {
        nd.vx*=0.80; nd.vy*=0.80; nd.vz*=0.80
        const spd = Math.sqrt(nd.vx*nd.vx+nd.vy*nd.vy+nd.vz*nd.vz)
        if (spd>maxSpd){nd.vx=nd.vx/spd*maxSpd;nd.vy=nd.vy/spd*maxSpd;nd.vz=nd.vz/spd*maxSpd}
        nd.x+=nd.vx; nd.y+=nd.vy; nd.z+=nd.vz
        nd.sprite.position.set(nd.x,nd.y,nd.z)
        nd.light.position.set(nd.x,nd.y,nd.z)
      }
      for (const {line,src,tgt} of edgeObjects) {
        const s=map.get(src),t=map.get(tgt)
        if(!s||!t) continue
        pos[0]=s.x;pos[1]=s.y;pos[2]=s.z;pos[3]=t.x;pos[4]=t.y;pos[5]=t.z
        line.geometry.setAttribute('position',new THREE.BufferAttribute(pos.slice(),3))
        line.geometry.attributes.position.needsUpdate=true
      }
    }

    const raycaster = new THREE.Raycaster()
    raycaster.params.Sprite = { threshold: 4 }
    const mouse = new THREE.Vector2()

    const updateHover = (mx: number, my: number) => {
      const rect = renderer.domElement.getBoundingClientRect()
      mouse.x =  ((mx-rect.left)/rect.width)*2-1
      mouse.y = -((my-rect.top)/rect.height)*2+1
      raycaster.setFromCamera(mouse, camera)
      const hits  = raycaster.intersectObjects(nodes.map(nd => nd.sprite))
      const found = hits.length > 0 ? (nodes.find(nd => nd.sprite === hits[0].object)??null) : null

      if (found !== hovered) {
        hovered = found
        hoverNeighbours = new Set()
        if (found) {
          for (const e of edges) {
            if (e.source === found.id) hoverNeighbours.add(e.target)
            if (e.target === found.id) hoverNeighbours.add(e.source)
          }
        }
      }
      renderer.domElement.style.cursor = found ? 'pointer' : 'default'
      if (found) {
        const proj = found.sprite.position.clone().project(camera)
        const r2   = renderer.domElement.getBoundingClientRect()
        setTooltip({
          title: found.title.length>52 ? found.title.slice(0,52)+'…' : found.title,
          x: (proj.x+1)/2*r2.width+r2.left,
          y: -(proj.y-1)/2*r2.height+r2.top,
        })
      } else setTooltip(null)

      for (const nd of nodes) {
        const mat = nd.sprite.material as THREE.SpriteMaterial
        if (!hovered)                      { mat.map=glowTex;mat.opacity=1;mat.color.setHex(GREEN_HEX);nd.light.intensity=0.15 }
        else if (nd===hovered)             { mat.map=glowTex;mat.opacity=1;mat.color.set(0x99ff99);nd.light.intensity=0.4 }
        else if (hoverNeighbours.has(nd.id)){ mat.map=glowTex;mat.opacity=0.9;mat.color.set(0x55ff55);nd.light.intensity=0.2 }
        else                               { mat.map=dimTex;mat.opacity=0.25;mat.color.setHex(GREEN_HEX);nd.light.intensity=0.02 }
        mat.needsUpdate=true
      }
      for (const {line,src,tgt} of edgeObjects) {
        const mat = line.material as THREE.LineBasicMaterial
        if (!hovered)                                    { mat.opacity=0.10;mat.color.setHex(GREEN_HEX) }
        else if (src===hovered.id||tgt===hovered.id)    { mat.opacity=0.65;mat.color.set(0x66ff66) }
        else                                             { mat.opacity=0.04;mat.color.setHex(GREEN_HEX) }
        mat.needsUpdate=true
      }
    }

    const onMove  = (e: MouseEvent) => updateHover(e.clientX, e.clientY)
    const onClick = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect()
      mouse.x =  ((e.clientX-rect.left)/rect.width)*2-1
      mouse.y = -((e.clientY-rect.top)/rect.height)*2+1
      raycaster.setFromCamera(mouse, camera)
      const hits = raycaster.intersectObjects(nodes.map(nd => nd.sprite))
      if (hits.length>0) {
        const found = nodes.find(nd => nd.sprite===hits[0].object)
        if (found) window.open(found.url,'_blank','noopener,noreferrer')
      }
    }
    const onResize = () => {
      const nw=mount.clientWidth,nh=mount.clientHeight
      camera.aspect=nw/nh; camera.updateProjectionMatrix(); renderer.setSize(nw,nh)
    }
    renderer.domElement.addEventListener('mousemove', onMove)
    renderer.domElement.addEventListener('click',     onClick)
    window.addEventListener('resize', onResize)

    const loop = () => { animId=requestAnimationFrame(loop); tick(); controls.update(); renderer.render(scene,camera) }
    animId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
      renderer.domElement.removeEventListener('mousemove', onMove)
      renderer.domElement.removeEventListener('click',     onClick)
      controls.dispose()
      for (const nd of nodes) { (nd.sprite.material as THREE.Material).dispose(); nd.sprite.geometry.dispose() }
      for (const {line} of edgeObjects) { (line.material as THREE.Material).dispose(); line.geometry.dispose() }
      glowTex.dispose(); dimTex.dispose()
      renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [n, mode])

  // ── 2D effect ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (mode !== '2d') return
    const mount = mountRef.current
    if (!mount) return

    setStatus('loading')
    setInfo({ nodes: 0, edges: 0 })
    setTooltip(null)

    const canvas = document.createElement('canvas')
    canvas.style.display = 'block'
    canvas.style.width   = '100%'
    canvas.style.height  = '100%'
    mount.appendChild(canvas)
    const ctx = canvas.getContext('2d')!

    interface PhysNode2D extends RawNode {
      x: number; y: number; vx: number; vy: number; r: number
    }

    let nodes: PhysNode2D[]  = []
    let edges: RawEdge[]     = []
    let drag: PhysNode2D | null  = null
    let hover: PhysNode2D | null = null
    let animId = 0

    const resize = () => { canvas.width=mount.clientWidth; canvas.height=mount.clientHeight }
    resize()
    window.addEventListener('resize', resize)

    fetch(`/api/graph?n=${n}`)
      .then(r => r.json())
      .then((data: { nodes: RawNode[]; edges: RawEdge[] }) => {
        const w = canvas.width, h = canvas.height
        const maxScore = Math.max(...data.nodes.map(nd => nd.score), 0.001)
        nodes = data.nodes.map((nd, i) => {
          const angle  = (i / data.nodes.length) * Math.PI * 2
          const spread = Math.min(w, h) * 0.35
          return {
            ...nd,
            x:  w/2 + Math.cos(angle)*spread*(0.5+Math.random()*0.5),
            y:  h/2 + Math.sin(angle)*spread*(0.5+Math.random()*0.5),
            vx: 0, vy: 0,
            r:  3 + (nd.score / maxScore) * 8,
          }
        })
        edges = data.edges || []
        setInfo({ nodes: nodes.length, edges: edges.length })
        setStatus('ok')
      })
      .catch(() => setStatus('error'))

    const tick = () => {
      const w = canvas.width, h = canvas.height
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        if (a === drag) continue
        a.vx += (w/2 - a.x) * 0.002
        a.vy += (h/2 - a.y) * 0.002
        for (let j = i+1; j < nodes.length; j++) {
          const b  = nodes[j]
          const dx = a.x-b.x, dy = a.y-b.y
          const d2 = Math.max(dx*dx+dy*dy, 100)
          const d  = Math.sqrt(d2), f = 250/d2
          const fx = (dx/d)*f, fy = (dy/d)*f
          a.vx+=fx; a.vy+=fy; b.vx-=fx; b.vy-=fy
        }
      }
      const map = new Map(nodes.map(nd => [nd.id, nd]))
      for (const e of edges) {
        const s = map.get(e.source), t = map.get(e.target)
        if (!s||!t) continue
        const dx=t.x-s.x, dy=t.y-s.y
        const d=Math.sqrt(dx*dx+dy*dy)||1
        const f=(d-90)*0.008
        const fx=(dx/d)*f, fy=(dy/d)*f
        if(s!==drag){s.vx+=fx;s.vy+=fy}
        if(t!==drag){t.vx-=fx;t.vy-=fy}
      }
      const maxSpd = 6
      for (const nd of nodes) {
        if (nd===drag) continue
        nd.vx*=0.78; nd.vy*=0.78
        const spd = Math.sqrt(nd.vx*nd.vx+nd.vy*nd.vy)
        if (spd>maxSpd){nd.vx=nd.vx/spd*maxSpd;nd.vy=nd.vy/spd*maxSpd}
        nd.x+=nd.vx; nd.y+=nd.vy
        const pad=nd.r+4
        if(nd.x<pad)     {nd.x=pad;     nd.vx*=-0.4}
        if(nd.x>w-pad)   {nd.x=w-pad;   nd.vx*=-0.4}
        if(nd.y<pad)     {nd.y=pad;     nd.vy*=-0.4}
        if(nd.y>h-pad)   {nd.y=h-pad;   nd.vy*=-0.4}
      }
    }

    const draw = () => {
      const w = canvas.width, h = canvas.height
      ctx.fillStyle = BG; ctx.fillRect(0,0,w,h)
      const map = new Map(nodes.map(nd => [nd.id, nd]))
      const nbSet = new Set<string>()
      if (hover) {
        for (const e of edges) {
          if (e.source===hover.id) nbSet.add(e.target)
          if (e.target===hover.id) nbSet.add(e.source)
        }
      }
      // Edges
      for (const e of edges) {
        const s=map.get(e.source), t=map.get(e.target)
        if(!s||!t) continue
        const active = hover && (e.source===hover.id||e.target===hover.id)
        ctx.beginPath(); ctx.moveTo(s.x,s.y); ctx.lineTo(t.x,t.y)
        ctx.strokeStyle = active ? 'rgba(102,255,102,0.45)' : 'rgba(51,255,51,0.10)'
        ctx.lineWidth   = active ? 1.5 : 0.8
        ctx.stroke()
      }
      // Nodes
      for (const nd of nodes) {
        const isHover = nd===hover
        const isNb    = nbSet.has(nd.id)
        const dimmed  = hover && !isHover && !isNb
        const r       = isHover ? nd.r*1.35 : isNb ? nd.r*1.1 : nd.r
        ctx.globalAlpha = dimmed ? 0.25 : 1
        const gr = ctx.createRadialGradient(nd.x,nd.y,0,nd.x,nd.y,r*3)
        gr.addColorStop(0, isHover ? 'rgba(102,255,102,0.5)' : 'rgba(51,255,51,0.22)')
        gr.addColorStop(1, 'transparent')
        ctx.beginPath(); ctx.arc(nd.x,nd.y,r*3,0,Math.PI*2); ctx.fillStyle=gr; ctx.fill()
        ctx.beginPath(); ctx.arc(nd.x,nd.y,r,0,Math.PI*2)
        ctx.fillStyle = isHover ? '#66ff66' : isNb ? '#4dff4d' : GREEN
        ctx.fill()
        ctx.globalAlpha = 1
      }
      // Tooltip
      if (hover) {
        const label = hover.title.length>42 ? hover.title.slice(0,42)+'…' : hover.title
        const px = Math.min(Math.max(hover.x,180), w-180)
        const py = hover.y - hover.r*1.4 - 8
        ctx.font      = '13px "Share Tech Mono","Courier New",monospace'
        ctx.textAlign = 'center'
        ctx.fillStyle = GREEN_DIM; ctx.fillText(label,px,py)
        ctx.fillStyle = '#66ff66'; ctx.shadowColor=GREEN; ctx.shadowBlur=8
        ctx.fillText(label,px,py); ctx.shadowBlur=0
      }
    }

    const hitTest = (mx: number, my: number) => {
      for (let i=nodes.length-1; i>=0; i--) {
        const nd=nodes[i], dx=nd.x-mx, dy=nd.y-my
        if (Math.sqrt(dx*dx+dy*dy) <= nd.r+6) return nd
      }
      return null
    }

    const onMove = (e: MouseEvent) => {
      const rect=canvas.getBoundingClientRect()
      const mx=e.clientX-rect.left, my=e.clientY-rect.top
      if (drag) { drag.vx=(mx-drag.x)*0.6; drag.vy=(my-drag.y)*0.6; drag.x=mx; drag.y=my }
      else { hover=hitTest(mx,my); canvas.style.cursor=hover?'pointer':'default' }
    }
    const onDown = (e: MouseEvent) => {
      const rect=canvas.getBoundingClientRect()
      drag=hitTest(e.clientX-rect.left, e.clientY-rect.top)
    }
    const onUp = (e: MouseEvent) => {
      if (drag) { drag.vx=(e.movementX||0)*0.8; drag.vy=(e.movementY||0)*0.8; drag=null }
    }
    const onClick = (e: MouseEvent) => {
      const rect=canvas.getBoundingClientRect()
      const nd=hitTest(e.clientX-rect.left, e.clientY-rect.top)
      if (nd) window.open(nd.url,'_blank','noopener,noreferrer')
    }
    canvas.addEventListener('mousemove', onMove)
    canvas.addEventListener('mousedown', onDown)
    canvas.addEventListener('mouseup',   onUp)
    canvas.addEventListener('click',     onClick)

    const loop = () => { tick(); draw(); animId=requestAnimationFrame(loop) }
    animId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', onMove)
      canvas.removeEventListener('mousedown', onDown)
      canvas.removeEventListener('mouseup',   onUp)
      canvas.removeEventListener('click',     onClick)
      if (mount.contains(canvas)) mount.removeChild(canvas)
    }
  }, [n, mode])

  // ── Constellation effect ──────────────────────────────────────────────────
  // Star-chart of the top hubs. Links are co-citation (shared out-links) from
  // /api/graph?mode=constellation. Canvas 2D, pan (drag) + zoom (wheel).
  useEffect(() => {
    if (mode !== 'constellation') return
    const mount = mountRef.current
    if (!mount) return

    setStatus('loading')
    setInfo({ nodes: 0, edges: 0 })
    setTooltip(null)

    const dpr    = window.devicePixelRatio || 1
    const canvas = document.createElement('canvas')
    canvas.style.display = 'block'
    canvas.style.width   = '100%'
    canvas.style.height  = '100%'
    canvas.style.cursor  = 'grab'
    mount.appendChild(canvas)
    const ctx = canvas.getContext('2d')!

    interface Star extends RawNode {
      x: number; y: number; vx: number; vy: number
      b: number      // brightness / size factor 0..1
      phase: number  // twinkle phase
      nb: number[]   // neighbour indices
    }

    // Pre-rendered soft glow sprite (white; tinted by globalAlpha only).
    const GLOW = 128
    const glow = document.createElement('canvas')
    glow.width = glow.height = GLOW
    {
      const g = glow.getContext('2d')!
      const gr = g.createRadialGradient(GLOW/2, GLOW/2, 0, GLOW/2, GLOW/2, GLOW/2)
      gr.addColorStop(0,    'rgba(190,255,190,1)')
      gr.addColorStop(0.12, 'rgba(120,255,120,0.55)')
      gr.addColorStop(0.4,  'rgba(51,255,51,0.14)')
      gr.addColorStop(1,    'rgba(51,255,51,0)')
      g.fillStyle = gr; g.fillRect(0, 0, GLOW, GLOW)
    }

    let stars: Star[] = []
    let links: { a: number; b: number; w: number }[] = []
    let W = 0, H = 0
    let k = 1, tx = 0, ty = 0          // view transform (CSS px)
    let hover: Star | null = null
    let dragging = false, moved = 0, lastX = 0, lastY = 0
    let animId = 0
    let cancelled = false

    const resize = () => {
      W = mount.clientWidth; H = mount.clientHeight
      canvas.width  = Math.max(1, Math.round(W * dpr))
      canvas.height = Math.max(1, Math.round(H * dpr))
    }
    resize()
    window.addEventListener('resize', resize)

    const fit = () => {
      if (!stars.length) return
      let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity
      for (const s of stars) { x0 = Math.min(x0, s.x); x1 = Math.max(x1, s.x); y0 = Math.min(y0, s.y); y1 = Math.max(y1, s.y) }
      const bw = Math.max(x1 - x0, 1), bh = Math.max(y1 - y0, 1)
      k  = Math.min((W * 0.86) / bw, (H * 0.78) / bh)
      tx = W / 2 - ((x0 + x1) / 2) * k
      ty = H / 2 + 20 - ((y0 + y1) / 2) * k
    }

    fetch(`/api/graph?n=${n}&mode=constellation`)
      .then(r => r.json())
      .then((data: { nodes: RawNode[]; edges: RawEdge[] }) => {
        if (cancelled) return
        const raw = data.nodes || []
        const idx = new Map(raw.map((nd, i) => [nd.id, i]))
        const maxScore = Math.max(...raw.map(nd => nd.score), 1e-9)
        const deg = new Array(raw.length).fill(0)
        links = []
        for (const e of data.edges || []) {
          const a = idx.get(e.source), b = idx.get(e.target)
          if (a === undefined || b === undefined) continue
          links.push({ a, b, w: e.weight ?? 1 })
          deg[a]++; deg[b]++
        }
        const maxDeg = Math.max(...deg, 1)
        const maxW   = Math.max(...links.map(l => l.w), 1)
        stars = raw.map((nd, i) => {
          // Golden-angle spiral by rank as the layout seed (hubs near centre).
          const ang = i * 2.399963, rad = 30 * Math.sqrt(i + 1)
          return {
            ...nd,
            x: Math.cos(ang) * rad, y: Math.sin(ang) * rad, vx: 0, vy: 0,
            b: Math.min(1, 0.75 * Math.sqrt(nd.score / maxScore) + 0.25 * (deg[i] / maxDeg)),
            phase: Math.random() * Math.PI * 2,
            nb: [],
          }
        })
        for (const l of links) { stars[l.a].nb.push(l.b); stars[l.b].nb.push(l.a) }

        // Settle the layout up front (bounded: ≤500 nodes × 250 steps), then draw statically.
        const N = stars.length
        for (let it = 0; it < 250; it++) {
          const cool = 1 - it / 250
          for (let i = 0; i < N; i++) {
            const a = stars[i]
            a.vx -= a.x * 0.0015; a.vy -= a.y * 0.0015
            for (let j = i + 1; j < N; j++) {
              const b = stars[j]
              const dx = a.x - b.x, dy = a.y - b.y
              const d2 = Math.max(dx*dx + dy*dy, 25), d = Math.sqrt(d2), f = 900 / d2
              a.vx += (dx/d)*f; a.vy += (dy/d)*f; b.vx -= (dx/d)*f; b.vy -= (dy/d)*f
            }
          }
          for (const l of links) {
            const s = stars[l.a], t = stars[l.b]
            const dx = t.x - s.x, dy = t.y - s.y, d = Math.sqrt(dx*dx + dy*dy) || 1
            const f = (d - 60) * 0.01 * (0.5 + l.w / maxW)
            s.vx += (dx/d)*f; s.vy += (dy/d)*f; t.vx -= (dx/d)*f; t.vy -= (dy/d)*f
          }
          for (const s of stars) {
            s.vx *= 0.75; s.vy *= 0.75
            const sp = Math.hypot(s.vx, s.vy), mx = 8 * cool + 0.5
            if (sp > mx) { s.vx = s.vx / sp * mx; s.vy = s.vy / sp * mx }
            s.x += s.vx; s.y += s.vy
          }
        }
        fit()
        setInfo({ nodes: stars.length, edges: links.length })
        setStatus('ok')
      })
      .catch(() => { if (!cancelled) setStatus('error') })

    const starR = (s: Star) => 1.2 + 4.2 * Math.pow(s.b, 1.3)

    const draw = (time: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.fillStyle = BG; ctx.fillRect(0, 0, W, H)
      if (!stars.length) return

      const inView = (s: Star, m: number) => {
        const x = s.x * k + tx, y = s.y * k + ty
        return x > -m && x < W + m && y > -m && y < H + m
      }
      const hl = new Set<number>()
      if (hover) { hl.add(stars.indexOf(hover)); for (const i of hover.nb) hl.add(i) }
      const hi = hover ? stars.indexOf(hover) : -1

      // faint chart rings around the centroid of the layout
      ctx.strokeStyle = 'rgba(51,255,51,0.05)'; ctx.lineWidth = 1
      ctx.setLineDash([1, 6])
      for (const rr of [150, 320, 520]) {
        ctx.beginPath(); ctx.arc(tx, ty, rr * k, 0, Math.PI * 2); ctx.stroke()
      }
      ctx.setLineDash([])

      // links: thin and faint, stronger with co-citation weight
      let maxW = 1
      for (const l of links) if (l.w > maxW) maxW = l.w
      ctx.lineWidth = 0.7
      for (const l of links) {
        const a = stars[l.a], b = stars[l.b]
        const active = hi >= 0 && (l.a === hi || l.b === hi)
        const al = hi >= 0 ? (active ? 0.6 : 0.03) : 0.07 + 0.28 * (l.w / maxW)
        ctx.strokeStyle = `rgba(120,255,120,${al})`
        ctx.beginPath(); ctx.moveTo(a.x * k + tx, a.y * k + ty); ctx.lineTo(b.x * k + tx, b.y * k + ty); ctx.stroke()
      }

      // stars: additive glow + core
      ctx.globalCompositeOperation = 'lighter'
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i]
        if (!inView(s, 80)) continue
        const x = s.x * k + tx, y = s.y * k + ty
        const tw = 0.88 + 0.12 * Math.sin(time * 0.0012 + s.phase)
        const dim = hi >= 0 && !hl.has(i) ? 0.3 : 1
        const r = starR(s) * (i === hi ? 1.4 : 1) * Math.min(1.8, Math.max(0.7, Math.sqrt(k)))
        const gs = r * (7 + 10 * s.b)
        ctx.globalAlpha = (0.35 + 0.65 * s.b) * tw * dim
        ctx.drawImage(glow, x - gs, y - gs, gs * 2, gs * 2)
        ctx.globalAlpha = dim
        ctx.fillStyle = s.b > 0.5 ? '#f2fff0' : '#b8ffb8'
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill()
      }
      // diffraction glints on the brightest stars
      ctx.lineCap = 'round'
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i]
        if (s.b < 0.3 || !inView(s, 120)) continue
        const x = s.x * k + tx, y = s.y * k + ty
        const dim = hi >= 0 && !hl.has(i) ? 0.3 : 1
        const L = (8 + 46 * Math.pow(s.b, 0.8)) * Math.min(1.8, Math.max(0.7, Math.sqrt(k)))
        const tw = 0.85 + 0.15 * Math.sin(time * 0.0012 + s.phase)
        const arms: [number, number, number][] = [[1, 0, L], [0, 1, L * 0.62]]
        if (s.b > 0.6) arms.push([0.7071, 0.7071, L * 0.4], [0.7071, -0.7071, L * 0.4])
        for (const [dx, dy, len] of arms) {
          const g = ctx.createLinearGradient(x - dx*len, y - dy*len, x + dx*len, y + dy*len)
          const c = `rgba(190,255,190,${0.55 * s.b * tw * dim})`
          g.addColorStop(0, 'rgba(190,255,190,0)'); g.addColorStop(0.5, c); g.addColorStop(1, 'rgba(190,255,190,0)')
          ctx.strokeStyle = g; ctx.lineWidth = 0.8
          ctx.beginPath(); ctx.moveTo(x - dx*len, y - dy*len); ctx.lineTo(x + dx*len, y + dy*len); ctx.stroke()
        }
      }
      ctx.globalCompositeOperation = 'source-over'
      ctx.globalAlpha = 1

      if (hover) {
        const x = hover.x * k + tx, y = hover.y * k + ty
        const label = hover.title.length > 52 ? hover.title.slice(0, 52) + '…' : hover.title
        const px = Math.min(Math.max(x, 190), W - 190)
        const py = y - starR(hover) * 1.4 - 14
        ctx.font = '13px "Share Tech Mono","Courier New",monospace'
        ctx.textAlign = 'center'
        ctx.fillStyle = 'rgba(3,12,3,0.8)'
        const tw = ctx.measureText(label).width
        ctx.fillRect(px - tw/2 - 6, py - 13, tw + 12, 19)
        ctx.fillStyle = '#66ff66'; ctx.shadowColor = GREEN; ctx.shadowBlur = 8
        ctx.fillText(label, px, py); ctx.shadowBlur = 0
      }
    }

    const hitTest = (mx: number, my: number) => {
      let best: Star | null = null, bd = Infinity
      for (const s of stars) {
        const d = Math.hypot(s.x * k + tx - mx, s.y * k + ty - my)
        if (d <= starR(s) + 8 && d < bd) { best = s; bd = d }
      }
      return best
    }

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const mx = e.clientX - rect.left, my = e.clientY - rect.top
      if (dragging) {
        tx += mx - lastX; ty += my - lastY; moved += Math.abs(mx - lastX) + Math.abs(my - lastY)
        lastX = mx; lastY = my
        return
      }
      hover = hitTest(mx, my)
      canvas.style.cursor = hover ? 'pointer' : 'grab'
    }
    const onDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      dragging = true; moved = 0
      lastX = e.clientX - rect.left; lastY = e.clientY - rect.top
      canvas.style.cursor = 'grabbing'
    }
    const onUp = () => { dragging = false; canvas.style.cursor = hover ? 'pointer' : 'grab' }
    const onLeave = () => { dragging = false; hover = null }
    const onClick = (e: MouseEvent) => {
      if (moved > 4) return
      const rect = canvas.getBoundingClientRect()
      const s = hitTest(e.clientX - rect.left, e.clientY - rect.top)
      if (s) window.open(s.url, '_blank', 'noopener,noreferrer')
    }
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const rect = canvas.getBoundingClientRect()
      const mx = e.clientX - rect.left, my = e.clientY - rect.top
      const nk = Math.min(40, Math.max(0.05, k * Math.exp(-e.deltaY * 0.0015)))
      tx = mx - (mx - tx) * (nk / k); ty = my - (my - ty) * (nk / k); k = nk
    }
    canvas.addEventListener('mousemove', onMove)
    canvas.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    canvas.addEventListener('mouseleave', onLeave)
    canvas.addEventListener('click', onClick)
    canvas.addEventListener('wheel', onWheel, { passive: false })

    const loop = (t: number) => { draw(t); animId = requestAnimationFrame(loop) }
    animId = requestAnimationFrame(loop)

    return () => {
      cancelled = true
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mouseup', onUp)
      canvas.removeEventListener('mousemove', onMove)
      canvas.removeEventListener('mousedown', onDown)
      canvas.removeEventListener('mouseleave', onLeave)
      canvas.removeEventListener('click', onClick)
      canvas.removeEventListener('wheel', onWheel)
      if (mount.contains(canvas)) mount.removeChild(canvas)
    }
  }, [n, mode])

  const commitN = (val: number) => { setN(val); setDisplayN(val) }
  const sliderMax = mode === 'constellation' ? 500 : 300

  return (
    <div style={{ position: 'fixed', inset: 0, background: BG, overflow: 'hidden' }}>
      <div ref={mountRef} style={{ width: '100%', height: '100%' }} />

      {/* Top bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        padding: '12px 20px',
        display: 'flex', alignItems: 'center', gap: '16px',
        background: 'linear-gradient(to bottom, rgba(3,12,3,0.92) 60%, transparent)',
        pointerEvents: 'none',
      }}>
        {/* Title + stats */}
        <div style={{ color: GREEN_DIM, fontSize: '0.72em', letterSpacing: '0.2em', textTransform: 'uppercase', flexShrink: 0 }}>
          <span style={{ color: GREEN, textShadow: `0 0 6px ${GREEN}` }}>■</span>
          &ensp;LINK GRAPH&ensp;//&ensp;{info.nodes} {mode === 'constellation' ? 'STARS' : 'NODES'}&ensp;{info.edges} {mode === 'constellation' ? 'LINKS' : 'EDGES'}
        </div>

        {/* 2D / 3D toggle */}
        <div style={{ display: 'flex', gap: '4px', pointerEvents: 'all', flexShrink: 0 }}>
          {(['3d', '2d', 'constellation'] as const).map(m => (
            <button
              key={m}
              className="crt-btn"
              onClick={() => { setMode(m); const cap = m === 'constellation' ? 500 : 300; if (displayN > cap) commitN(cap) }}
              style={{
                fontSize: '0.68em',
                opacity: mode === m ? 1 : 0.38,
                boxShadow: mode === m ? `0 0 6px ${GREEN}` : 'none',
              }}
            >
              {m === 'constellation' ? 'STARS' : m.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Node count slider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', pointerEvents: 'all', flex: 1, maxWidth: 260 }}>
          <span style={{ color: GREEN_DIM, fontSize: '0.65em', letterSpacing: '0.15em', flexShrink: 0 }}>N:</span>
          <input
            type="range" min={2} max={sliderMax} step={1}
            value={displayN}
            onChange={e  => setDisplayN(Number(e.target.value))}
            onMouseUp={e  => commitN(Number((e.target as HTMLInputElement).value))}
            onTouchEnd={e => commitN(Number((e.currentTarget as HTMLInputElement).value))}
            style={{
              flex: 1, WebkitAppearance: 'none', appearance: 'none',
              height: '2px', outline: 'none', border: 'none', cursor: 'pointer',
              background: `linear-gradient(to right, ${GREEN} 0%, ${GREEN} ${((displayN-2)/(sliderMax-2))*100}%, rgba(51,255,51,0.2) ${((displayN-2)/(sliderMax-2))*100}%, rgba(51,255,51,0.2) 100%)`,
            }}
          />
          <span style={{ color: GREEN, fontSize: '0.68em', letterSpacing: '0.1em', minWidth: '3ch', textAlign: 'right', textShadow: `0 0 4px ${GREEN}` }}>
            {displayN}
          </span>
        </div>

        <div style={{ flex: 1 }} />

        <button
          className="crt-btn"
          onClick={onHome}
          style={{ pointerEvents: 'all', fontSize: '0.72em', flexShrink: 0 }}
        >
          ← BACK
        </button>
      </div>

      {/* Bottom hint */}
      {status === 'ok' && (
        <div style={{
          position: 'absolute', bottom: 18, left: '50%', transform: 'translateX(-50%)',
          color: GREEN_DIM, fontSize: '0.68em', letterSpacing: '0.2em',
          textTransform: 'uppercase', pointerEvents: 'none', whiteSpace: 'nowrap',
        }}>
          {mode === '3d'
            ? 'DRAG TO ROTATE · SCROLL TO ZOOM · CLICK NODE TO OPEN'
            : mode === 'constellation'
            ? 'DRAG TO PAN · SCROLL TO ZOOM · CLICK STAR TO OPEN · LINKS = SHARED CITATIONS'
            : 'DRAG NODES · CLICK TO OPEN URL · NODE SIZE = PAGERANK'}
        </div>
      )}

      {/* Hover tooltip (3D only — 2D draws its own on canvas) */}
      {tooltip && mode === '3d' && (
        <div style={{
          position: 'fixed', left: tooltip.x, top: tooltip.y - 28,
          transform: 'translateX(-50%)',
          color: GREEN, textShadow: `0 0 8px ${GREEN}`,
          fontSize: '0.72em', letterSpacing: '0.08em',
          fontFamily: '"Share Tech Mono","Courier New",monospace',
          pointerEvents: 'none', whiteSpace: 'nowrap',
          background: 'rgba(3,12,3,0.75)', padding: '3px 8px', borderRadius: '2px',
        }}>
          {tooltip.title}
        </div>
      )}

      {status === 'loading' && (
        <div style={{
          position: 'absolute', inset: 0, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          color: GREEN_DIM, fontSize: '1em', letterSpacing: '0.25em', textTransform: 'uppercase',
        }}>
          LOADING GRAPH<span className="loading-dots" />
        </div>
      )}

      {status === 'error' && (
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: '20px',
        }}>
          <div style={{ color: '#ff4444', letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: '0.9em' }}>
            GRAPH DATA UNAVAILABLE
          </div>
          <button className="crt-btn" onClick={onHome}>← RETURN TO MAIN</button>
        </div>
      )}
    </div>
  )
}
