import { useState, useEffect, FormEvent } from 'react'
import { useTextScramble } from '../hooks/useTextScramble'

interface Props {
  onSearch: (q: string) => void
}

interface Stats {
  pagesIndexed: number
  crawledLast24h: number
  queueDepth: number
  crawlRatePerHr: number
}

function fmtNum(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M'
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K'
  return n.toLocaleString()
}

export default function AboutPage({ onSearch }: Props) {
  const [query, setQuery] = useState('')
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    fetch('/api/stats')
      .then(r => r.ok ? r.json() : Promise.reject())
      .then((data: Stats) => setStats(data))
      .catch(() => {})
  }, [])

  const { output: title, replay: replayTitle } = useTextScramble('MICHICHUSA', 900)
  const { output: kanji, replay: replayKanji } = useTextScramble('道草', 700)
  const { output: sub,   replay: replaySub   } = useTextScramble(
    'WANDER · DISCOVER · SEARCH',
    1100
  )

  const replayAll = () => { replayTitle(); replayKanji(); replaySub() }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (query.trim()) onSearch(query.trim())
  }

  return (
    <div className="about-root">

      <nav className="about-nav">
        <span className="about-nav-brand">道草</span>
        <div className="about-nav-links">
          <span className="about-nav-link about-nav-active">ABOUT</span>
        </div>
      </nav>

      {/* ── Hero — full viewport height ── */}
      <section className="about-hero">
        <div className="about-hero-glow" />

        <button className="about-title-wrap" onClick={replayAll} title="replay animation">
          <h1 className="about-title neon-flicker">{title || ' '}</h1>
          <p  className="about-kanji  neon-pulse">{kanji || ' '}</p>
        </button>

        <p className="about-sub">{sub}</p>

        {/* Search box */}
        <form className="about-search-form" onSubmit={handleSubmit}>
          <div className="about-search-row">
            <span className="about-search-prompt">›</span>
            <input
              className="about-search-input"
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="search the index..."
              spellCheck={false}
              autoComplete="off"
            />
            <button type="submit" className="about-search-btn">SEARCH</button>
          </div>
        </form>

        <p className="about-scroll-hint">↓ scroll</p>
      </section>

      {/* ── Info — below the fold ── */}
      <section className="about-body">
        <div className="about-grid">

          <div className="about-card">
            <h2 className="about-card-title">// WHAT IS THIS</h2>
            <p className="about-card-text">
              Michichusa is a distributed web search engine built from scratch in Go.
              Five microservices crawl, index, rank, and serve results — no third-party
              search API, no shortcuts.
            </p>
            <p className="about-card-text">
              道草 <span className="about-dim">(michikusa)</span> — to dawdle by the
              roadside, to linger and notice what others walk past. That's how this
              engine approaches the web: patient, thorough, unhurried.
            </p>
          </div>

          <div className="about-card">
            <h2 className="about-card-title">// HOW IT WORKS</h2>
            <ul className="about-list">
              <li><span className="about-tag">SPIDER</span> crawls URLs, respects robots.txt, guards against SSRF</li>
              <li><span className="about-tag">CONDUCTOR</span> deduplicates and queues pages via PostgreSQL</li>
              <li><span className="about-tag">CARTOGRAPHER</span> computes PageRank across the crawled graph</li>
              <li><span className="about-tag">SEARCHER</span> ranks by full-text (30%) + PageRank (70%)</li>
              <li><span className="about-tag">FRONTEND</span> this terminal you're looking at</li>
            </ul>
          </div>

          <div className="about-card">
            <h2 className="about-card-title">// INDEX</h2>
            <div className="about-stat-grid">
              <div className="about-stat">
                <span className="about-stat-val">{stats ? fmtNum(stats.pagesIndexed) : '—'}</span>
                <span className="about-stat-label">pages indexed</span>
              </div>
              <div className="about-stat">
                <span className="about-stat-val">{stats ? fmtNum(stats.crawledLast24h) : '—'}</span>
                <span className="about-stat-label">crawled last 24h</span>
              </div>
              <div className="about-stat">
                <span className="about-stat-val">{stats ? fmtNum(stats.queueDepth) : '—'}</span>
                <span className="about-stat-label">queued to crawl</span>
              </div>
              <div className="about-stat">
                <span className="about-stat-val">{stats ? fmtNum(stats.crawlRatePerHr) : '—'}</span>
                <span className="about-stat-label">pages / hour</span>
              </div>
            </div>
          </div>

          <div className="about-card">
            <h2 className="about-card-title">// PHILOSOPHY</h2>
            <p className="about-card-text about-quote">
              "The one who wanders is not always lost —
              sometimes they are the only one paying attention."
            </p>
            <p className="about-card-text">
              Search engines shape what we find. Building one by hand is the only way
              to understand what that means.
            </p>
          </div>

        </div>
      </section>

      <footer className="about-footer">
        <span className="about-dim">MICHICHUSA · 道草 · DISTRIBUTED WEB INDEX</span>
      </footer>

    </div>
  )
}
