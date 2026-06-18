import { useState, useCallback } from 'react'
import SearchPage from './components/SearchPage'
import ResultsPage from './components/ResultsPage'
import AboutPage from './components/AboutPage'
import GraphPage from './components/GraphPage'

type View = 'home' | 'results' | 'about' | 'graph'

export default function App() {
  const [view, setView] = useState<View>('about')
  const [query, setQuery] = useState('')

  const handleSearch = useCallback((q: string) => {
    setQuery(q)
    setView('results')
  }, [])

  const handleHome  = useCallback(() => { setView('home');  setQuery('') }, [])
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
          : <ResultsPage query={query} onSearch={handleSearch} onHome={handleHome} onAbout={handleAbout} onGraph={handleGraph} />
        }
      </div>
    </>
  )
}
