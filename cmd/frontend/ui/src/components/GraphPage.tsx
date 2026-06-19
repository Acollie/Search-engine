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
}

interface PhysNode extends RawNode {
  x: number; y: number; z: number
  vx: number; vy: number; vz: number
  r: number
  sprite: THREE.Sprite
  light: THREE.PointLight
}

interface Props {
  onHome: () => void
}

const GREEN        = 0x33ff33
const GREEN_CSS    = '#33ff33'
const GREEN_DIM    = '#1a7a1a'
const BG           = '#030c03'

// Build a glowing-dot canvas texture once and reuse.
function makeGlowTexture(color: string): THREE.CanvasTexture {
  const size = 128
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')!
  const mid = size / 2
  const grad = ctx.createRadialGradient(mid, mid, 0, mid, mid, mid)
  grad.addColorStop(0,   color)
  grad.addColorStop(0.3, color)
  grad.addColorStop(0.7, 'rgba(51,255,51,0.15)')
  grad.addColorStop(1,   'transparent')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, size, size)
  return new THREE.CanvasTexture(canvas)
}

export default function GraphPage({ onHome }: Props) {
  const mountRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading')
  const [info, setInfo]     = useState({ nodes: 0, edges: 0 })
  const [tooltip, setTooltip] = useState<{ title: string; x: number; y: number } | null>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    // ── Three.js setup ────────────────────────────────────────
    const w = mount.clientWidth, h = mount.clientHeight

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(w, h)
    renderer.setClearColor(0x030c03, 1)
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 2000)
    camera.position.set(0, 0, 280)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping  = true
    controls.dampingFactor  = 0.08
    controls.autoRotate     = true
    controls.autoRotateSpeed = 0.4
    controls.minDistance    = 80
    controls.maxDistance    = 600

    // Dim ambient + green point at origin for subtle volume lighting
    scene.add(new THREE.AmbientLight(0x001a00, 2))
    const centreLight = new THREE.PointLight(0x33ff33, 1.2, 600)
    scene.add(centreLight)

    const glowTexture  = makeGlowTexture('rgba(51,255,51,0.9)')
    const dimTexture   = makeGlowTexture('rgba(10,60,10,0.7)')

    // Shared material for edges
    const edgeMat = new THREE.LineBasicMaterial({
      color: GREEN,
      transparent: true,
      opacity: 0.10,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const edgeMatHot = new THREE.LineBasicMaterial({
      color: GREEN,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    let nodes: PhysNode[]  = []
    let edges: RawEdge[]   = []
    let edgeObjects: { line: THREE.Line; src: string; tgt: string }[] = []
    let hoveredNode: PhysNode | null = null
    let hoverNeighbours = new Set<string>()
    let animId = 0

    // ── Fetch data ────────────────────────────────────────────
    fetch('/api/graph?n=100')
      .then(r => r.json())
      .then((data: { nodes: RawNode[]; edges: RawEdge[] }) => {
        const maxScore = Math.max(...data.nodes.map(n => n.score), 0.001)
        const spread   = 120

        nodes = data.nodes.map((n, i) => {
          const phi    = Math.acos(-1 + (2 * i) / data.nodes.length)
          const theta  = Math.sqrt(data.nodes.length * Math.PI) * phi
          const r      = 3 + (n.score / maxScore) * 9
          const pos    = new THREE.Vector3(
            spread * 0.5 * Math.sin(phi) * Math.cos(theta) + (Math.random() - 0.5) * 30,
            spread * 0.5 * Math.sin(phi) * Math.sin(theta) + (Math.random() - 0.5) * 30,
            spread * 0.5 * Math.cos(phi) + (Math.random() - 0.5) * 30,
          )

          const spriteMat = new THREE.SpriteMaterial({
            map: glowTexture,
            color: GREEN,
            transparent: true,
            opacity: 1,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          })
          const sprite = new THREE.Sprite(spriteMat)
          sprite.scale.setScalar(r * 3.5)
          sprite.position.copy(pos)
          scene.add(sprite)

          // Tiny point light per node (cheap: only 100 of them, low range)
          const light = new THREE.PointLight(GREEN, 0.15, r * 12)
          light.position.copy(pos)
          scene.add(light)

          return { ...n, x: pos.x, y: pos.y, z: pos.z, vx: 0, vy: 0, vz: 0, r, sprite, light }
        })

        edges = data.edges || []

        // Build edge lines
        for (const e of edges) {
          const src = nodes.find(n => n.id === e.source)
          const tgt = nodes.find(n => n.id === e.target)
          if (!src || !tgt) continue
          const geo = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(src.x, src.y, src.z),
            new THREE.Vector3(tgt.x, tgt.y, tgt.z),
          ])
          const line = new THREE.Line(geo, edgeMat.clone())
          scene.add(line)
          edgeObjects.push({ line, src: e.source, tgt: e.target })
        }

        setInfo({ nodes: nodes.length, edges: edges.length })
        setStatus('ok')
      })
      .catch(() => setStatus('error'))

    // ── Physics ───────────────────────────────────────────────
    const tick = () => {
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]
        // Center gravity
        n.vx -= n.x * 0.002
        n.vy -= n.y * 0.002
        n.vz -= n.z * 0.002

        // Pairwise repulsion (3D)
        for (let j = i + 1; j < nodes.length; j++) {
          const m  = nodes[j]
          const dx = n.x - m.x, dy = n.y - m.y, dz = n.z - m.z
          const d2 = Math.max(dx*dx + dy*dy + dz*dz, 100)
          const d  = Math.sqrt(d2)
          const f  = 220 / d2
          const fx = (dx/d)*f, fy = (dy/d)*f, fz = (dz/d)*f
          n.vx += fx; n.vy += fy; n.vz += fz
          m.vx -= fx; m.vy -= fy; m.vz -= fz
        }
      }

      // Spring forces along edges
      const nodeMap = new Map(nodes.map(n => [n.id, n]))
      for (const e of edges) {
        const src = nodeMap.get(e.source), tgt = nodeMap.get(e.target)
        if (!src || !tgt) continue
        const dx = tgt.x - src.x, dy = tgt.y - src.y, dz = tgt.z - src.z
        const d  = Math.sqrt(dx*dx + dy*dy + dz*dz) || 1
        const f  = (d - 70) * 0.006
        const fx = (dx/d)*f, fy = (dy/d)*f, fz = (dz/d)*f
        src.vx += fx; src.vy += fy; src.vz += fz
        tgt.vx -= fx; tgt.vy -= fy; tgt.vz -= fz
      }

      // Integrate, damp, cap speed
      const maxSpeed = 5
      for (const n of nodes) {
        n.vx *= 0.80; n.vy *= 0.80; n.vz *= 0.80
        const spd = Math.sqrt(n.vx*n.vx + n.vy*n.vy + n.vz*n.vz)
        if (spd > maxSpeed) { n.vx = n.vx/spd*maxSpeed; n.vy = n.vy/spd*maxSpeed; n.vz = n.vz/spd*maxSpeed }
        n.x += n.vx; n.y += n.vy; n.z += n.vz
        n.sprite.position.set(n.x, n.y, n.z)
        n.light.position.set(n.x, n.y, n.z)
      }

      // Update edge geometry
      const positions = new Float32Array(2 * 3)
      for (const { line, src, tgt } of edgeObjects) {
        const s = nodeMap.get(src), t = nodeMap.get(tgt)
        if (!s || !t) continue
        positions[0] = s.x; positions[1] = s.y; positions[2] = s.z
        positions[3] = t.x; positions[4] = t.y; positions[5] = t.z
        line.geometry.setAttribute('position', new THREE.BufferAttribute(positions.slice(), 3))
        line.geometry.attributes.position.needsUpdate = true
      }
    }

    // ── Raycasting for hover/click ────────────────────────────
    const raycaster = new THREE.Raycaster()
    raycaster.params.Sprite = { threshold: 4 }
    const mouse = new THREE.Vector2()

    const updateHover = (mx: number, my: number) => {
      const rect = renderer.domElement.getBoundingClientRect()
      mouse.x = ((mx - rect.left) / rect.width)  * 2 - 1
      mouse.y = -((my - rect.top)  / rect.height) * 2 + 1
      raycaster.setFromCamera(mouse, camera)

      const sprites = nodes.map(n => n.sprite)
      const hits = raycaster.intersectObjects(sprites)

      if (hits.length > 0) {
        const hitSprite = hits[0].object as THREE.Sprite
        const found = nodes.find(n => n.sprite === hitSprite) || null
        if (found !== hoveredNode) {
          hoveredNode = found
          hoverNeighbours = new Set<string>()
          if (found) {
            for (const e of edges) {
              if (e.source === found.id) hoverNeighbours.add(e.target)
              if (e.target === found.id) hoverNeighbours.add(e.source)
            }
          }
        }
        renderer.domElement.style.cursor = 'pointer'
        if (found) {
          const projected = found.sprite.position.clone().project(camera)
          const rect2 = renderer.domElement.getBoundingClientRect()
          const sx = (projected.x + 1) / 2 * rect2.width + rect2.left
          const sy = -(projected.y - 1) / 2 * rect2.height + rect2.top
          setTooltip({ title: found.title.length > 50 ? found.title.slice(0, 50) + '…' : found.title, x: sx, y: sy })
        }
      } else {
        if (hoveredNode) { hoveredNode = null; hoverNeighbours = new Set() }
        renderer.domElement.style.cursor = 'default'
        setTooltip(null)
      }

      // Update sprite brightness based on hover state
      for (const n of nodes) {
        const mat = n.sprite.material as THREE.SpriteMaterial
        if (!hoveredNode) {
          mat.map = glowTexture
          mat.opacity = 1
          mat.color.setHex(GREEN)
        } else if (n === hoveredNode) {
          mat.map = glowTexture
          mat.opacity = 1
          mat.color.set(0x99ff99)
        } else if (hoverNeighbours.has(n.id)) {
          mat.map = glowTexture
          mat.opacity = 0.9
          mat.color.set(0x55ff55)
        } else {
          mat.map = dimTexture
          mat.opacity = 0.25
          mat.color.setHex(GREEN)
        }
        mat.needsUpdate = true
        n.light.intensity = hoveredNode ? (n === hoveredNode ? 0.4 : hoverNeighbours.has(n.id) ? 0.2 : 0.02) : 0.15
      }

      // Update edge materials
      for (const { line, src, tgt } of edgeObjects) {
        const mat = line.material as THREE.LineBasicMaterial
        if (!hoveredNode) {
          mat.opacity = 0.10; mat.color.setHex(GREEN)
        } else if (src === hoveredNode.id || tgt === hoveredNode.id) {
          mat.opacity = 0.65; mat.color.set(0x66ff66)
        } else {
          mat.opacity = 0.04; mat.color.setHex(GREEN)
        }
        mat.needsUpdate = true
      }
    }

    const onMouseMove = (e: MouseEvent) => updateHover(e.clientX, e.clientY)
    const onClick = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect()
      mouse.x = ((e.clientX - rect.left) / rect.width)  * 2 - 1
      mouse.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1
      raycaster.setFromCamera(mouse, camera)
      const hits = raycaster.intersectObjects(nodes.map(n => n.sprite))
      if (hits.length > 0) {
        const hitSprite = hits[0].object as THREE.Sprite
        const found = nodes.find(n => n.sprite === hitSprite)
        if (found) window.open(found.url, '_blank', 'noopener,noreferrer')
      }
    }

    renderer.domElement.addEventListener('mousemove', onMouseMove)
    renderer.domElement.addEventListener('click', onClick)

    // ── Resize ───────────────────────────────────────────────
    const onResize = () => {
      const nw = mount.clientWidth, nh = mount.clientHeight
      camera.aspect = nw / nh
      camera.updateProjectionMatrix()
      renderer.setSize(nw, nh)
    }
    window.addEventListener('resize', onResize)

    // ── Render loop ───────────────────────────────────────────
    const loop = () => {
      animId = requestAnimationFrame(loop)
      tick()
      controls.update()
      renderer.render(scene, camera)
    }
    animId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
      renderer.domElement.removeEventListener('mousemove', onMouseMove)
      renderer.domElement.removeEventListener('click', onClick)
      controls.dispose()
      renderer.dispose()
      glowTexture.dispose()
      dimTexture.dispose()
      edgeMat.dispose()
      edgeMatHot.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div style={{ position: 'fixed', inset: 0, background: BG, overflow: 'hidden' }}>
      <div ref={mountRef} style={{ width: '100%', height: '100%' }} />

      {/* Top bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        padding: '14px 20px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: 'linear-gradient(to bottom, rgba(3,12,3,0.92) 60%, transparent)',
        pointerEvents: 'none',
      }}>
        <div style={{ color: GREEN_DIM, fontSize: '0.72em', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          <span style={{ color: GREEN_CSS, textShadow: `0 0 6px ${GREEN_CSS}` }}>■</span>
          &ensp;LINK GRAPH 3D&ensp;//&ensp;{info.nodes} NODES&ensp;{info.edges} EDGES
        </div>
        <button
          className="crt-btn"
          onClick={onHome}
          style={{ pointerEvents: 'all', fontSize: '0.72em' }}
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
          DRAG TO ROTATE &nbsp;·&nbsp; SCROLL TO ZOOM &nbsp;·&nbsp; CLICK NODE TO OPEN
        </div>
      )}

      {/* Hover tooltip */}
      {tooltip && (
        <div style={{
          position: 'fixed',
          left: tooltip.x,
          top: tooltip.y - 28,
          transform: 'translateX(-50%)',
          color: GREEN_CSS,
          textShadow: `0 0 8px ${GREEN_CSS}`,
          fontSize: '0.72em',
          letterSpacing: '0.08em',
          fontFamily: '"Share Tech Mono", "Courier New", monospace',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          background: 'rgba(3,12,3,0.7)',
          padding: '3px 8px',
          borderRadius: '2px',
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
