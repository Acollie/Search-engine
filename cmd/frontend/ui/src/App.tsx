import { useState, useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import SearchPage from './components/SearchPage'
import ResultsPage from './components/ResultsPage'
import AboutPage from './components/AboutPage'
import GraphPage from './components/GraphPage'
import { useClassicTheme } from './hooks/useClassicTheme'

type View = 'home' | 'results' | 'about' | 'graph'

function currentParams(): URLSearchParams {
  return new URLSearchParams(window.location.search)
}

export default function App() {
  // Search state lives in the URL (?q=&language=&domain=&since=&page=) so
  // results are shareable and back/forward work.
  const [params, setParams] = useState<URLSearchParams>(currentParams)
  const [classic] = useClassicTheme()
  // Landing: results if q, else the classic home when classic is saved, else About.
  const [view, setView] = useState<View>(() =>
    currentParams().get('q') ? 'results' : classic ? 'home' : 'about')

  // Turning Classic on while on About swaps to the classic landing page.
  const firstRun = useRef(true)
  useEffect(() => {
    if (firstRun.current) { firstRun.current = false; return }
    if (classic) setView(v => (v === 'about' ? 'home' : v))
  }, [classic])

  // The classic theme only styles the search/results pages; about and graph
  // stay terminal-styled regardless of the toggle.
  useLayoutEffect(() => {
    const on = classic && (view === 'home' || view === 'results')
    if (on) document.documentElement.setAttribute('data-theme', 'classic')
    else document.documentElement.removeAttribute('data-theme')
  }, [classic, view])

  useEffect(() => {
    const onPop = () => {
      const p = currentParams()
      setParams(p)
      setView(v => (p.get('q') ? 'results' : v === 'results' ? 'home' : v))
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const navigate = useCallback((next: URLSearchParams) => {
    const qs = next.toString()
    window.history.pushState(null, '', qs ? `?${qs}` : window.location.pathname)
    setParams(new URLSearchParams(qs))
    setView(next.get('q') ? 'results' : 'home')
  }, [])

  const handleSearch = useCallback((q: string) => navigate(new URLSearchParams({ q })), [navigate])
  const handleHome = useCallback(() => {
    window.history.pushState(null, '', window.location.pathname)
    setParams(new URLSearchParams())
    setView('home')
  }, [])
  const handleAbout = useCallback(() => setView('about'), [])
  const handleGraph = useCallback(() => setView('graph'), [])

  if (view === 'about') return <AboutPage onSearch={handleSearch} onGraph={handleGraph} />
  if (view === 'graph') return <GraphPage onHome={handleHome} />

  return (
    <>
      <div className="crt-beam" />
      <div className="screen">
        {view === 'home'
          ? <SearchPage onSearch={handleSearch} onAbout={handleAbout} onGraph={handleGraph} />
          : <ResultsPage params={params} onNavigate={navigate} onHome={handleHome} onAbout={handleAbout} onGraph={handleGraph} />
        }
      </div>
    </>
  )
}
