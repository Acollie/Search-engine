import { useState, useEffect, FormEvent } from 'react'
import { SearchResponse, SearchResult } from '../types'
import SearchInput from './SearchInput'
import ThemeToggle from './ThemeToggle'
import Snippet from './Snippet'
import { useClassicTheme } from '../hooks/useClassicTheme'

interface Props {
  params: URLSearchParams
  onNavigate: (p: URLSearchParams) => void
  onHome: () => void
  onAbout: () => void
  onGraph: () => void
}

const WIKI_DOMAIN = 'en.wikipedia.org'
const LANGUAGES: [string, string][] = [
  ['', 'Any language'], ['en', 'English'], ['de', 'German'], ['fr', 'French'],
  ['es', 'Spanish'], ['it', 'Italian'], ['pt', 'Portuguese'], ['nl', 'Dutch'],
  ['ja', 'Japanese'], ['zh', 'Chinese'], ['ru', 'Russian'],
]
const SINCE: [string, string][] = [
  ['', 'Any time'], ['day', 'Past day'], ['week', 'Past week'],
  ['month', 'Past month'], ['year', 'Past year'],
]

function pick(v: string | null, allowed: [string, string][]): string {
  return v && allowed.some(([k]) => k === v) ? v : ''
}

export default function ResultsPage({ params, onNavigate, onHome, onAbout, onGraph }: Props) {
  const [classic] = useClassicTheme()
  const query = params.get('q') ?? ''
  const language = pick(params.get('language'), LANGUAGES)
  const since = pick(params.get('since'), SINCE)
  const wiki = params.get('domain') === WIKI_DOMAIN
  const page = Math.max(1, parseInt(params.get('page') ?? '1', 10) || 1)

  const [data, setData] = useState<SearchResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [input, setInput] = useState(query)

  useEffect(() => { setInput(query) }, [query])

  useEffect(() => {
    const ctrl = new AbortController()
    setLoading(true)
    setData(null)
    const qs = new URLSearchParams({ q: query, page: String(page) })
    if (language) qs.set('language', language)
    if (wiki) qs.set('domain', WIKI_DOMAIN)
    if (since) qs.set('since', since)
    fetch(`/api/search?${qs}`, { signal: ctrl.signal })
      .then(r => r.json())
      .then((d: SearchResponse) => { setData(d); setLoading(false) })
      .catch(err => {
        if (ctrl.signal.aborted || err?.name === 'AbortError') return
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
    return () => ctrl.abort()
  }, [query, page, language, wiki, since])

  /** Build the next URL state, keeping current filters unless overridden. */
  const go = (over: Record<string, string>) => {
    const next = new URLSearchParams()
    const cur: Record<string, string> = {
      q: query, language, domain: wiki ? WIKI_DOMAIN : '', since, page: page > 1 ? String(page) : '',
    }
    for (const [k, v] of Object.entries({ ...cur, ...over })) if (v) next.set(k, v)
    onNavigate(next)
  }

  const search = (q: string) => { if (q.trim()) go({ q: q.trim(), page: '' }) }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    search(input)
  }

  return (
    <>
      <header className="site-header">
        <div className="header-bar">
          <button className="crt-btn" onClick={onHome} style={{ letterSpacing: '0.22em' }}>
            {classic ? '道草' : 'SEARCH//SYS'}
          </button>
          <button className="crt-btn" onClick={onGraph} style={{ fontSize: '0.82em' }}>
            GRAPH
          </button>
          <button className="crt-btn" onClick={onAbout} style={{ fontSize: '0.82em' }}>
            ABOUT
          </button>
          <ThemeToggle />
          <form onSubmit={handleSubmit} style={{ flex: 1 }}>
            <div className="search-row">
              <span className="prompt-label">QUERY&gt;</span>
              <SearchInput
                value={input}
                onChange={setInput}
                onPick={q => { setInput(q); search(q) }}
                autoFocus
              />
              <button type="submit" className="crt-btn">{classic ? 'Search' : 'EXEC'}</button>
            </div>
          </form>
        </div>
        <div className="filters" role="group" aria-label="Search filters">
          <label className="filter">
            <span>LANG</span>
            <select value={language} onChange={e => go({ language: e.target.value, page: '' })}>
              {LANGUAGES.map(([k, n]) => <option key={k} value={k}>{n}</option>)}
            </select>
          </label>
          <label className="filter">
            <span>TIME</span>
            <select value={since} onChange={e => go({ since: e.target.value, page: '' })}>
              {SINCE.map(([k, n]) => <option key={k} value={k}>{n}</option>)}
            </select>
          </label>
          <button
            type="button"
            className={'crt-btn filter-toggle' + (wiki ? ' on' : '')}
            aria-pressed={wiki}
            onClick={() => go({ domain: wiki ? '' : WIKI_DOMAIN, page: '' })}
          >
            Wikipedia only
          </button>
          <span className="syntax-hint">Tips: "exact phrase" &ensp; -exclude &ensp; word OR word</span>
        </div>
      </header>

      <main>
        {loading && (
          <div className="loading">
            <span className="loading-dots">{classic ? 'Searching' : 'SEARCHING INDEXED DOCUMENTS'}</span>
          </div>
        )}

        {!loading && data && (
          <>
            <div className="results-meta">
              {data.error ? (
                <span className="err">!! {data.error}</span>
              ) : (
                classic ? (
                  <span>About {data.resultCount} results ({data.searchTime.toFixed(2)} seconds)</span>
                ) : (
                <>
                  <span>RECORDS FOUND: {data.resultCount}</span>
                  &ensp;|&ensp;
                  <span>QUERY TIME: {data.searchTime.toFixed(3)}s</span>
                  &ensp;|&ensp;
                  <span>PAGE: {data.page}</span>
                </>
                )
              )}
            </div>

            {data.results && data.results.length > 0 ? (
              <>
                {data.results.map((r, i) => (
                  <Record key={r.url} result={r} index={(page - 1) * 10 + i + 1} />
                ))}

                <div className="pagination">
                  {data.hasPrev && (
                    <button className="crt-btn" onClick={() => go({ page: page - 1 > 1 ? String(page - 1) : '' })}>
                      ◄ PREV
                    </button>
                  )}
                  <span className="page-info">PAGE {data.page}</span>
                  {data.hasNext && (
                    <button className="crt-btn" onClick={() => go({ page: String(page + 1) })}>
                      NEXT ►
                    </button>
                  )}
                </div>
              </>
            ) : (
              !data.error && (
                <div className="no-results">
                  {data.didYouMean && (
                    <div className="did-you-mean">
                      Did you mean:{' '}
                      <button type="button" className="dym-link" onClick={() => { setInput(data.didYouMean!); search(data.didYouMean!) }}>
                        {data.didYouMean}
                      </button>
                      ?
                    </div>
                  )}
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

      <footer style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)', textAlign: 'center', fontSize: '0.72em', color: 'var(--p-dim)' }}>
        <a href="https://www.alexcollie.com" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', borderBottom: '1px solid var(--border)', paddingBottom: '2px' }}>by Alex Collie</a>
      </footer>
    </>
  )
}

function Record({ result, index }: { result: SearchResult; index: number }) {
  const [classic] = useClassicTheme()
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
        <div className="record-snippet"><Snippet result={result} /></div>
      )}
      {result.lastCrawled && (
        <div className="record-footer">{classic ? 'Crawled' : 'INDEXED:'} {result.lastCrawled}</div>
      )}
    </div>
  )
}
