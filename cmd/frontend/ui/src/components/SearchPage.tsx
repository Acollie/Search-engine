import { useState, useEffect, FormEvent } from 'react'

interface Props {
  onSearch: (query: string) => void
  onAbout: () => void
}

interface Stats {
  pagesIndexed: number
  crawledLast24h: number
  queueDepth: number
  crawlRatePerHr: number
}

const LOGO = `
 ██████╗ ███████╗ █████╗ ██████╗  ██████╗██╗  ██╗
██╔════╝ ██╔════╝██╔══██╗██╔══██╗██╔════╝██║  ██║
╚█████╗  █████╗  ███████║██████╔╝██║     ███████║
 ╚═══██╗ ██╔══╝  ██╔══██║██╔══██╗██║     ██╔══██║
██████╔╝ ███████╗██║  ██║██║  ██║╚██████╗██║  ██║
╚═════╝  ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝`.trim()

function now() {
  return new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC'
}

function fmtNum(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M'
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K'
  return n.toLocaleString()
}

export default function SearchPage({ onSearch, onAbout }: Props) {
  const [query, setQuery] = useState('')
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    fetch('/api/stats')
      .then(r => r.ok ? r.json() : Promise.reject())
      .then((data: Stats) => setStats(data))
      .catch(() => { /* stats unavailable — panel stays hidden */ })
  }, [])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (query.trim()) onSearch(query.trim())
  }

  return (
    <>
      <header className="site-header">
        <div className="header-meta">
          <span>CORP. NETWORK INTERFACE // AUTHORIZED ACCESS ONLY</span>
          <span>{now()}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '6px' }}>
          <button className="crt-btn" onClick={onAbout} style={{ fontSize: '0.78em' }}>ABOUT</button>
        </div>
        <div className="header-status">
          <span className="status-dot">■</span> MAINFRAME OPERATIONAL&ensp;
          <span className="status-dot">■</span> SEARCH NODE ONLINE&ensp;
          <span className="status-dot">■</span> CRAWLER NET ACTIVE
        </div>
      </header>

      <div className="home-hero">
        <pre className="ascii-logo glow">{LOGO}</pre>

        <p className="subtitle">D I S T R I B U T E D &ensp; W E B &ensp; I N D E X &ensp; v 2 . 4</p>

        <form className="search-form-home" onSubmit={handleSubmit}>
          <div className="search-row">
            <span className="prompt-label">QUERY&gt;</span>
            <input
              className="search-input"
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="enter search terms..."
              autoFocus
              spellCheck={false}
              autoComplete="off"
            />
            <span className="cursor" />
          </div>
          <div className="search-submit-row">
            <button type="submit" className="crt-btn">[ EXECUTE SEARCH ]</button>
          </div>
        </form>

        <div className="sys-panel">
          <span className="sys-panel-title">// SUBSYSTEM STATUS</span>
          <div className="sys-row dim">
            <span>SUBSYSTEM</span><span>STATUS</span>
          </div>
          <hr className="divider" />
          <div className="sys-row">
            <span>FULL-TEXT SEARCH ENGINE</span>
            <span className="sys-ok">■ ONLINE</span>
          </div>
          <div className="sys-row">
            <span>PAGERANK SCORER</span>
            <span className="sys-ok">■ ONLINE</span>
          </div>
          <div className="sys-row">
            <span>DISTRIBUTED CRAWLER NET</span>
            <span className="sys-ok">■ ONLINE</span>
          </div>
          <div className="sys-row">
            <span>MICROSERVICE MESH</span>
            <span className="sys-ok">■ 5 NODES</span>
          </div>
          <div className="sys-row">
            <span>GRPC TRANSPORT</span>
            <span className="sys-ok">■ READY</span>
          </div>
        </div>

        {stats && (
          <div className="sys-panel" style={{ marginTop: '1rem' }}>
            <span className="sys-panel-title">// INDEX STATISTICS</span>
            <div className="sys-row dim">
              <span>METRIC</span><span>VALUE</span>
            </div>
            <hr className="divider" />
            <div className="sys-row">
              <span>PAGES INDEXED</span>
              <span className="sys-ok">{fmtNum(stats.pagesIndexed)}</span>
            </div>
            <div className="sys-row">
              <span>CRAWLED LAST 24H</span>
              <span className="sys-ok">{fmtNum(stats.crawledLast24h)}</span>
            </div>
            <div className="sys-row">
              <span>CRAWL QUEUE DEPTH</span>
              <span className="sys-ok">{fmtNum(stats.queueDepth)}</span>
            </div>
            <div className="sys-row">
              <span>PAGES / HOUR</span>
              <span className="sys-ok">{fmtNum(stats.crawlRatePerHr)}</span>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
