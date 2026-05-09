import { useState, useCallback } from 'react'
import SearchPage from './components/SearchPage'
import ResultsPage from './components/ResultsPage'
import AboutPage from './components/AboutPage'

type View = 'home' | 'results' | 'about'

export default function App() {
  const [view, setView] = useState<View>('about')
  const [query, setQuery] = useState('')

  const handleSearch = useCallback((q: string) => {
    setQuery(q)
    setView('results')
  }, [])

  const handleHome = useCallback(() => {
    setView('home')
    setQuery('')
  }, [])

  const handleAbout = useCallback(() => setView('about'), [])

  if (view === 'about') {
    return <AboutPage onSearch={handleSearch} />
  }

  return (
    <>
      <div className="crt-beam" />
      <div className="screen">
        {view === 'home'
          ? <SearchPage onSearch={handleSearch} onAbout={handleAbout} />
          : <ResultsPage query={query} onSearch={handleSearch} onHome={handleHome} onAbout={handleAbout} />
        }
      </div>
    </>
  )
}
