import { useState, useEffect, FormEvent } from 'react'
import { SearchResponse, SearchResult } from '../types'

interface Props {
  query: string
  onSearch: (q: string) => void
  onHome: () => void
  onAbout: () => void
}

export default function ResultsPage({ query, onSearch, onHome, onAbout }: Props) {
  const [data, setData] = useState<SearchResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [input, setInput] = useState(query)
  const [page, setPage] = useState(1)

  useEffect(() => {
    setLoading(true)
    setData(null)
    fetch(`/api/search?q=${encodeURIComponent(query)}&page=${page}`)
      .then(r => r.json())
      .then((d: SearchResponse) => { setData(d); setLoading(false) })
      .catch(() => {
        setData({
          results: [],
          resultCount: 0,
          page,
          nextPage: page + 1,
          prevPage: page - 1,
          hasNext: false,
          hasPrev: false,
          searchTime: 0,
          error: 'CONNECTION TO SEARCH NODE FAILED — RETRY OR CHECK SYSTEM STATUS',
          query,
        })
        setLoading(false)
      })
  }, [query, page])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (input.trim()) { setPage(1); onSearch(input.trim()) }
  }

  return (
    <>
      <header className="site-header">
        <div className="header-bar">
          <button className="crt-btn" onClick={onHome} style={{ letterSpacing: '0.22em' }}>
            SEARCH//SYS
          </button>
          <button className="crt-btn" onClick={onAbout} style={{ fontSize: '0.82em' }}>
            ABOUT
          </button>
          <form onSubmit={handleSubmit} style={{ flex: 1 }}>
            <div className="search-row">
              <span className="prompt-label">QUERY&gt;</span>
              <input
                className="search-input"
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                autoFocus
                spellCheck={false}
                autoComplete="off"
              />
              <button type="submit" className="crt-btn">EXEC</button>
            </div>
          </form>
        </div>
      </header>

      <main>
        {loading && (
          <div className="loading">
            <span className="loading-dots">SEARCHING INDEXED DOCUMENTS</span>
          </div>
        )}

        {!loading && data && (
          <>
            <div className="results-meta">
              {data.error ? (
                <span className="err">!! {data.error}</span>
              ) : (
                <>
                  <span>RECORDS FOUND: {data.resultCount}</span>
                  &ensp;|&ensp;
                  <span>QUERY TIME: {data.searchTime.toFixed(3)}s</span>
                  &ensp;|&ensp;
                  <span>PAGE: {data.page}</span>
                </>
              )}
            </div>

            {data.results && data.results.length > 0 ? (
              <>
                {data.results.map((r, i) => (
                  <Record key={r.url} result={r} index={(page - 1) * 10 + i + 1} />
                ))}

                <div className="pagination">
                  {data.hasPrev && (
                    <button className="crt-btn" onClick={() => setPage(p => p - 1)}>
                      ◄ PREV
                    </button>
                  )}
                  <span className="page-info">PAGE {data.page}</span>
                  {data.hasNext && (
                    <button className="crt-btn" onClick={() => setPage(p => p + 1)}>
                      NEXT ►
                    </button>
                  )}
                </div>
              </>
            ) : (
              !data.error && (
                <div className="no-results">
                  <div>NO RECORDS MATCH QUERY: "{query}"</div>
                  <div className="dim" style={{ fontSize: '0.82em', marginTop: '8px' }}>
                    SUGGEST: CHECK SPELLING · BROADEN SEARCH TERMS · TRY SYNONYMS
                  </div>
                </div>
              )
            )}
          </>
        )}
      </main>
    </>
  )
}

function Record({ result, index }: { result: SearchResult; index: number }) {
  return (
    <div className="result-record">
      <span className="record-id">[{String(index).padStart(3, '0')}] RECORD</span>
      <div className="record-title">
        <a href={result.url} target="_blank" rel="noopener noreferrer">
          {result.title || result.url}
        </a>
      </div>
      <div className="record-url">{result.url}</div>
      {result.snippet && (
        <div className="record-snippet">{result.snippet}</div>
      )}
      {result.lastCrawled && (
        <div className="record-footer">INDEXED: {result.lastCrawled}</div>
      )}
    </div>
  )
}
