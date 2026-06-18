import { useEffect, useRef, useState } from 'react'

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
  x: number
  y: number
  vx: number
  vy: number
  r: number
}

interface Props {
  onHome: () => void
}

const GREEN       = '#33ff33'
const GREEN_BRIGHT = '#66ff66'
const GREEN_DIM   = '#1a7a1a'
const BG          = '#030c03'

export default function GraphPage({ onHome }: Props) {
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading')
  const [info, setInfo]     = useState({ nodes: 0, edges: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    let animId  = 0
    let nodes: PhysNode[]  = []
    let edges: RawEdge[]   = []
    let drag: PhysNode | null = null
    let hover: PhysNode | null = null

    // ── resize ────────────────────────────────────────
    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // ── load ─────────────────────────────────────────
    fetch('/api/graph?n=100')
      .then(r => r.json())
      .then((data: { nodes: RawNode[], edges: RawEdge[] }) => {
        const w = canvas.width, h = canvas.height
        const maxScore = Math.max(...data.nodes.map(n => n.score), 0.001)

        // Spread nodes evenly so they don't start piled on top of each other
        nodes = data.nodes.map((n, i) => {
          const angle = (i / data.nodes.length) * Math.PI * 2
          const spread = Math.min(w, h) * 0.35
          return {
            ...n,
            x:  w / 2 + Math.cos(angle) * spread * (0.5 + Math.random() * 0.5),
            y:  h / 2 + Math.sin(angle) * spread * (0.5 + Math.random() * 0.5),
            vx: 0,
            vy: 0,
            r:  3 + (n.score / maxScore) * 8,
          }
        })
        edges = data.edges || []
        setInfo({ nodes: nodes.length, edges: edges.length })
        setStatus('ok')
      })
      .catch(() => setStatus('error'))

    // ── physics tick ──────────────────────────────────
    const tick = () => {
      const w = canvas.width, h = canvas.height
      const map = new Map(nodes.map(n => [n.id, n]))

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]
        if (n === drag) continue

        // Center gravity
        n.vx += (w / 2 - n.x) * 0.002
        n.vy += (h / 2 - n.y) * 0.002

        // Repulsion — scaled down so cumulative force stays bounded with 100 nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const m  = nodes[j]
          const dx = n.x - m.x
          const dy = n.y - m.y
          const d2 = Math.max(dx * dx + dy * dy, 100) // floor at 10px to avoid explosion
          const d  = Math.sqrt(d2)
          const f  = 250 / d2
          const fx = (dx / d) * f
          const fy = (dy / d) * f
          n.vx += fx;  n.vy += fy
          m.vx -= fx;  m.vy -= fy
        }
      }

      // Spring force along edges
      for (const e of edges) {
        const src = map.get(e.source)
        const tgt = map.get(e.target)
        if (!src || !tgt) continue
        const dx   = tgt.x - src.x
        const dy   = tgt.y - src.y
        const d    = Math.sqrt(dx * dx + dy * dy) || 1
        const rest = 90
        const f    = (d - rest) * 0.008
        const fx   = (dx / d) * f
        const fy   = (dy / d) * f
        if (src !== drag) { src.vx += fx; src.vy += fy }
        if (tgt !== drag) { tgt.vx -= fx; tgt.vy -= fy }
      }

      // Integrate, damp, bounce — clamp speed so nothing flies off screen
      const maxSpeed = 6
      for (const n of nodes) {
        if (n === drag) continue
        n.vx *= 0.78
        n.vy *= 0.78
        const speed = Math.sqrt(n.vx * n.vx + n.vy * n.vy)
        if (speed > maxSpeed) { n.vx = n.vx / speed * maxSpeed; n.vy = n.vy / speed * maxSpeed }
        n.x  += n.vx
        n.y  += n.vy
        const pad = n.r + 4
        if (n.x < pad)     { n.x = pad;     n.vx *= -0.4 }
        if (n.x > w - pad) { n.x = w - pad; n.vx *= -0.4 }
        if (n.y < pad)     { n.y = pad;     n.vy *= -0.4 }
        if (n.y > h - pad) { n.y = h - pad; n.vy *= -0.4 }
      }
    }

    // ── draw ─────────────────────────────────────────
    const draw = () => {
      const w = canvas.width, h = canvas.height
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = BG
      ctx.fillRect(0, 0, w, h)

      const map = new Map(nodes.map(n => [n.id, n]))

      // Identify hover neighbours for highlighting
      const neighbourSet = new Set<string>()
      if (hover) {
        for (const e of edges) {
          if (e.source === hover.id) neighbourSet.add(e.target)
          if (e.target === hover.id) neighbourSet.add(e.source)
        }
      }

      // Edges
      for (const e of edges) {
        const src = map.get(e.source)
        const tgt = map.get(e.target)
        if (!src || !tgt) continue
        const isActive = hover && (e.source === hover.id || e.target === hover.id)
        ctx.beginPath()
        ctx.moveTo(src.x, src.y)
        ctx.lineTo(tgt.x, tgt.y)
        ctx.strokeStyle = isActive ? 'rgba(102,255,102,0.45)' : 'rgba(51,255,51,0.10)'
        ctx.lineWidth   = isActive ? 1.5 : 0.8
        ctx.stroke()
      }

      // Nodes
      for (const n of nodes) {
        const isHover  = n === hover
        const isNeigh  = neighbourSet.has(n.id)
        const dimmed   = hover && !isHover && !isNeigh
        const r        = isHover ? n.r * 1.35 : isNeigh ? n.r * 1.1 : n.r
        const alpha    = dimmed ? 0.25 : 1

        ctx.globalAlpha = alpha

        // Outer glow
        const glowR = r * 3
        const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowR)
        grd.addColorStop(0, isHover ? 'rgba(102,255,102,0.5)' : 'rgba(51,255,51,0.22)')
        grd.addColorStop(1, 'transparent')
        ctx.beginPath()
        ctx.arc(n.x, n.y, glowR, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()

        // Core
        ctx.beginPath()
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2)
        ctx.fillStyle = isHover ? GREEN_BRIGHT : isNeigh ? '#4dff4d' : GREEN
        ctx.fill()

        ctx.globalAlpha = 1
      }

      // Label for hovered node
      if (hover) {
        const label = hover.title.length > 42
          ? hover.title.slice(0, 42) + '…'
          : hover.title
        const px = Math.min(Math.max(hover.x, 180), w - 180)
        const py = hover.y - hover.r * 1.4 - 8
        ctx.font      = '13px "Share Tech Mono", "Courier New", monospace'
        ctx.textAlign = 'center'
        ctx.fillStyle = GREEN_DIM
        ctx.fillText(label, px, py)
        ctx.fillStyle = GREEN_BRIGHT
        ctx.shadowColor  = GREEN
        ctx.shadowBlur   = 8
        ctx.fillText(label, px, py)
        ctx.shadowBlur = 0
      }
    }

    const loop = () => {
      tick()
      draw()
      animId = requestAnimationFrame(loop)
    }
    animId = requestAnimationFrame(loop)

    // ── interaction ───────────────────────────────────
    const hitTest = (mx: number, my: number) => {
      for (let i = nodes.length - 1; i >= 0; i--) {
        const n = nodes[i]
        const dx = n.x - mx, dy = n.y - my
        if (Math.sqrt(dx * dx + dy * dy) <= n.r + 6) return n
      }
      return null
    }

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const mx = e.clientX - rect.left
      const my = e.clientY - rect.top
      if (drag) {
        drag.vx  = (mx - drag.x) * 0.6
        drag.vy  = (my - drag.y) * 0.6
        drag.x   = mx
        drag.y   = my
      } else {
        hover = hitTest(mx, my)
        canvas.style.cursor = hover ? 'pointer' : 'default'
      }
    }

    const onDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      drag = hitTest(e.clientX - rect.left, e.clientY - rect.top)
    }

    const onUp = (e: MouseEvent) => {
      if (drag) {
        // fling on release
        drag.vx = (e.movementX || 0) * 0.8
        drag.vy = (e.movementY || 0) * 0.8
        drag = null
      }
    }

    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const n = hitTest(e.clientX - rect.left, e.clientY - rect.top)
      if (n) window.open(n.url, '_blank', 'noopener,noreferrer')
    }

    canvas.addEventListener('mousemove', onMove)
    canvas.addEventListener('mousedown', onDown)
    canvas.addEventListener('mouseup',   onUp)
    canvas.addEventListener('click',     onClick)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', onMove)
      canvas.removeEventListener('mousedown', onDown)
      canvas.removeEventListener('mouseup',   onUp)
      canvas.removeEventListener('click',     onClick)
    }
  }, [])

  return (
    <div style={{ position: 'fixed', inset: 0, background: BG, overflow: 'hidden' }}>
      <canvas
        ref={canvasRef}
        style={{ display: 'block', width: '100%', height: '100%' }}
      />

      {/* Top bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        padding: '14px 20px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: 'linear-gradient(to bottom, rgba(3,12,3,0.92) 60%, transparent)',
        pointerEvents: 'none',
      }}>
        <div style={{ color: GREEN_DIM, fontSize: '0.72em', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          <span style={{ color: GREEN, textShadow: `0 0 6px ${GREEN}` }}>■</span>
          &ensp;LINK GRAPH&ensp;//&ensp;{info.nodes} NODES&ensp;{info.edges} EDGES
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
          DRAG NODES &nbsp;·&nbsp; CLICK TO OPEN URL &nbsp;·&nbsp; NODE SIZE = PAGERANK SCORE
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
