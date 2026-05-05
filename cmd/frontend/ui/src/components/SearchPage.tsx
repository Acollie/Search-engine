import { useState, FormEvent } from 'react'

interface Props {
  onSearch: (query: string) => void
  onAbout: () => void
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

export default function SearchPage({ onSearch, onAbout }: Props) {
  const [query, setQuery] = useState('')

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
      </div>
    </>
  )
}
