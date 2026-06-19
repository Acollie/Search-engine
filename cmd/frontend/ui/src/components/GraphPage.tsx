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

const GREEN     = 0x33ff33
const GREEN_CSS = '#33ff33'
const GREEN_DIM = '#1a7a1a'
const BG        = '#030c03'

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
  const mountRef  = useRef<HTMLDivElement>(null)
  const [status, setStatus]     = useState<'loading' | 'ok' | 'error'>('loading')
  const [info, setInfo]         = useState({ nodes: 0, edges: 0 })
  const [tooltip, setTooltip]   = useState<{ title: string; x: number; y: number } | null>(null)
  const [n, setN]               = useState(100)   // committed value — triggers refetch
  const [displayN, setDisplayN] = useState(100)   // live label while dragging

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    setStatus('loading')
    setInfo({ nodes: 0, edges: 0 })
    setTooltip(null)

    const w = mount.clientWidth, h = mount.clientHeight

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(w, h)
    renderer.setClearColor(0x030c03, 1)
    mount.appendChild(renderer.domElement)

    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 2000)
    camera.position.set(0, 0, 280)

    const controls          = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping  = true
    controls.dampingFactor  = 0.08
    controls.autoRotate     = true
    controls.autoRotateSpeed = 0.4
    controls.minDistance    = 80
    controls.maxDistance    = 600

    scene.add(new THREE.AmbientLight(0x001a00, 2))
    const centreLight = new THREE.PointLight(0x33ff33, 1.2, 600)
    scene.add(centreLight)

    const glowTexture = makeGlowTexture('rgba(51,255,51,0.9)')
    const dimTexture  = makeGlowTexture('rgba(10,60,10,0.7)')

    let nodes: PhysNode[]  = []
    let edges: RawEdge[]   = []
    let edgeObjects: { line: THREE.Line; src: string; tgt: string }[] = []
    let hoveredNode: PhysNode | null  = null
    let hoverNeighbours = new Set<string>()
    let animId = 0

    fetch(`/api/graph?n=${n}`)
      .then(r => r.json())
      .then((data: { nodes: RawNode[]; edges: RawEdge[] }) => {
        const maxScore = Math.max(...data.nodes.map(nd => nd.score), 0.001)
        const spread   = 120

        nodes = data.nodes.map((nd, i) => {
          const phi   = Math.acos(-1 + (2 * i) / data.nodes.length)
          const theta = Math.sqrt(data.nodes.length * Math.PI) * phi
          const r     = 3 + (nd.score / maxScore) * 9
          const pos   = new THREE.Vector3(
            spread * 0.5 * Math.sin(phi) * Math.cos(theta) + (Math.random() - 0.5) * 30,
            spread * 0.5 * Math.sin(phi) * Math.sin(theta) + (Math.random() - 0.5) * 30,
            spread * 0.5 * Math.cos(phi)                   + (Math.random() - 0.5) * 30,
          )

          const spriteMat = new THREE.SpriteMaterial({
            map: glowTexture, color: GREEN,
            transparent: true, opacity: 1,
            blending: THREE.AdditiveBlending, depthWrite: false,
          })
          const sprite = new THREE.Sprite(spriteMat)
          sprite.scale.setScalar(r * 3.5)
          sprite.position.copy(pos)
          scene.add(sprite)

          const light = new THREE.PointLight(GREEN, 0.15, r * 12)
          light.position.copy(pos)
          scene.add(light)

          return { ...nd, x: pos.x, y: pos.y, z: pos.z, vx: 0, vy: 0, vz: 0, r, sprite, light }
        })

        edges = data.edges || []

        for (const e of edges) {
          const src = nodes.find(nd => nd.id === e.source)
          const tgt = nodes.find(nd => nd.id === e.target)
          if (!src || !tgt) continue
          const geo  = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(src.x, src.y, src.z),
            new THREE.Vector3(tgt.x, tgt.y, tgt.z),
          ])
          const mat = new THREE.LineBasicMaterial({
            color: GREEN, transparent: true, opacity: 0.10,
            blending: THREE.AdditiveBlending, depthWrite: false,
          })
          const line = new THREE.Line(geo, mat)
          scene.add(line)
          edgeObjects.push({ line, src: e.source, tgt: e.target })
        }

        setInfo({ nodes: nodes.length, edges: edges.length })
        setStatus('ok')
      })
      .catch(() => setStatus('error'))

    // ── Physics ───────────────────────────────────────────────
    const tick = () => {
      const nodeMap = new Map(nodes.map(nd => [nd.id, nd]))

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        a.vx -= a.x * 0.002; a.vy -= a.y * 0.002; a.vz -= a.z * 0.002

        for (let j = i + 1; j < nodes.length; j++) {
          const b  = nodes[j]
          const dx = a.x - b.x, dy = a.y - b.y, dz = a.z - b.z
          const d2 = Math.max(dx*dx + dy*dy + dz*dz, 100)
          const d  = Math.sqrt(d2)
          const f  = 220 / d2
          const fx = (dx/d)*f, fy = (dy/d)*f, fz = (dz/d)*f
          a.vx += fx; a.vy += fy; a.vz += fz
          b.vx -= fx; b.vy -= fy; b.vz -= fz
        }
      }

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

      const maxSpeed = 5
      for (const nd of nodes) {
        nd.vx *= 0.80; nd.vy *= 0.80; nd.vz *= 0.80
        const spd = Math.sqrt(nd.vx*nd.vx + nd.vy*nd.vy + nd.vz*nd.vz)
        if (spd > maxSpeed) { nd.vx = nd.vx/spd*maxSpeed; nd.vy = nd.vy/spd*maxSpeed; nd.vz = nd.vz/spd*maxSpeed }
        nd.x += nd.vx; nd.y += nd.vy; nd.z += nd.vz
        nd.sprite.position.set(nd.x, nd.y, nd.z)
        nd.light.position.set(nd.x, nd.y, nd.z)
      }

      const pos = new Float32Array(6)
      for (const { line, src, tgt } of edgeObjects) {
        const s = nodeMap.get(src), t = nodeMap.get(tgt)
        if (!s || !t) continue
        pos[0] = s.x; pos[1] = s.y; pos[2] = s.z
        pos[3] = t.x; pos[4] = t.y; pos[5] = t.z
        line.geometry.setAttribute('position', new THREE.BufferAttribute(pos.slice(), 3))
        line.geometry.attributes.position.needsUpdate = true
      }
    }

    // ── Raycasting ────────────────────────────────────────────
    const raycaster = new THREE.Raycaster()
    raycaster.params.Sprite = { threshold: 4 }
    const mouse = new THREE.Vector2()

    const updateHover = (mx: number, my: number) => {
      const rect = renderer.domElement.getBoundingClientRect()
      mouse.x =  ((mx - rect.left) / rect.width)  * 2 - 1
      mouse.y = -((my - rect.top)  / rect.height) * 2 + 1
      raycaster.setFromCamera(mouse, camera)

      const hits = raycaster.intersectObjects(nodes.map(nd => nd.sprite))
      const found = hits.length > 0
        ? (nodes.find(nd => nd.sprite === hits[0].object) ?? null)
        : null

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

      renderer.domElement.style.cursor = found ? 'pointer' : 'default'

      if (found) {
        const proj = found.sprite.position.clone().project(camera)
        const rect2 = renderer.domElement.getBoundingClientRect()
        setTooltip({
          title: found.title.length > 52 ? found.title.slice(0, 52) + '…' : found.title,
          x: (proj.x + 1) / 2 * rect2.width  + rect2.left,
          y: -(proj.y - 1) / 2 * rect2.height + rect2.top,
        })
      } else {
        setTooltip(null)
      }

      for (const nd of nodes) {
        const mat = nd.sprite.material as THREE.SpriteMaterial
        if (!hoveredNode) {
          mat.map = glowTexture; mat.opacity = 1; mat.color.setHex(GREEN)
          nd.light.intensity = 0.15
        } else if (nd === hoveredNode) {
          mat.map = glowTexture; mat.opacity = 1; mat.color.set(0x99ff99)
          nd.light.intensity = 0.4
        } else if (hoverNeighbours.has(nd.id)) {
          mat.map = glowTexture; mat.opacity = 0.9; mat.color.set(0x55ff55)
          nd.light.intensity = 0.2
        } else {
          mat.map = dimTexture; mat.opacity = 0.25; mat.color.setHex(GREEN)
          nd.light.intensity = 0.02
        }
        mat.needsUpdate = true
      }

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
      mouse.x =  ((e.clientX - rect.left) / rect.width)  * 2 - 1
      mouse.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1
      raycaster.setFromCamera(mouse, camera)
      const hits = raycaster.intersectObjects(nodes.map(nd => nd.sprite))
      if (hits.length > 0) {
        const found = nodes.find(nd => nd.sprite === hits[0].object)
        if (found) window.open(found.url, '_blank', 'noopener,noreferrer')
      }
    }

    renderer.domElement.addEventListener('mousemove', onMouseMove)
    renderer.domElement.addEventListener('click',     onClick)

    const onResize = () => {
      const nw = mount.clientWidth, nh = mount.clientHeight
      camera.aspect = nw / nh
      camera.updateProjectionMatrix()
      renderer.setSize(nw, nh)
    }
    window.addEventListener('resize', onResize)

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
      renderer.domElement.removeEventListener('click',     onClick)
      controls.dispose()
      // Dispose all Three.js objects
      for (const nd of nodes) {
        ;(nd.sprite.material as THREE.SpriteMaterial).dispose()
        nd.sprite.geometry.dispose()
      }
      for (const { line } of edgeObjects) {
        ;(line.material as THREE.Material).dispose()
        line.geometry.dispose()
      }
      glowTexture.dispose()
      dimTexture.dispose()
      renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [n]) // re-run when node count changes

  const commitN = (val: number) => { setN(val); setDisplayN(val) }

  return (
    <div style={{ position: 'fixed', inset: 0, background: BG, overflow: 'hidden' }}>
      <div ref={mountRef} style={{ width: '100%', height: '100%' }} />

      {/* Top bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        padding: '12px 20px',
        display: 'flex', alignItems: 'center', gap: '20px',
        background: 'linear-gradient(to bottom, rgba(3,12,3,0.92) 60%, transparent)',
        pointerEvents: 'none',
      }}>
        {/* Title + stats */}
        <div style={{ color: GREEN_DIM, fontSize: '0.72em', letterSpacing: '0.2em', textTransform: 'uppercase', flexShrink: 0 }}>
          <span style={{ color: GREEN_CSS, textShadow: `0 0 6px ${GREEN_CSS}` }}>■</span>
          &ensp;LINK GRAPH 3D&ensp;//&ensp;{info.nodes} NODES&ensp;{info.edges} EDGES
        </div>

        {/* Slider */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          pointerEvents: 'all', flex: 1, maxWidth: 280,
        }}>
          <span style={{ color: GREEN_DIM, fontSize: '0.65em', letterSpacing: '0.15em', flexShrink: 0 }}>N:</span>
          <input
            type="range"
            min={2} max={300} step={1}
            value={displayN}
            onChange={e => setDisplayN(Number(e.target.value))}
            onMouseUp={e  => commitN(Number((e.target as HTMLInputElement).value))}
            onTouchEnd={e => commitN(Number((e.currentTarget as HTMLInputElement).value))}
            style={{
              flex: 1,
              WebkitAppearance: 'none',
              appearance: 'none',
              height: '2px',
              background: `linear-gradient(to right, ${GREEN_CSS} 0%, ${GREEN_CSS} ${((displayN - 2) / 298) * 100}%, rgba(51,255,51,0.2) ${((displayN - 2) / 298) * 100}%, rgba(51,255,51,0.2) 100%)`,
              outline: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          />
          <span style={{ color: GREEN_CSS, fontSize: '0.68em', letterSpacing: '0.1em', minWidth: '3ch', textAlign: 'right', textShadow: `0 0 4px ${GREEN_CSS}` }}>
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
          DRAG TO ROTATE &nbsp;·&nbsp; SCROLL TO ZOOM &nbsp;·&nbsp; CLICK NODE TO OPEN
        </div>
      )}

      {/* Hover tooltip */}
      {tooltip && (
        <div style={{
          position: 'fixed',
          left: tooltip.x, top: tooltip.y - 28,
          transform: 'translateX(-50%)',
          color: GREEN_CSS,
          textShadow: `0 0 8px ${GREEN_CSS}`,
          fontSize: '0.72em', letterSpacing: '0.08em',
          fontFamily: '"Share Tech Mono", "Courier New", monospace',
          pointerEvents: 'none', whiteSpace: 'nowrap',
          background: 'rgba(3,12,3,0.75)',
          padding: '3px 8px', borderRadius: '2px',
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
