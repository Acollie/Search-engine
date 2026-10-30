import { SearchResult } from '../types'

/** Renders a snippet with matched terms highlighted; never uses innerHTML. */
export default function Snippet({ result }: { result: SearchResult }) {
  const segs = result.segments
  if (!segs || segs.length === 0) return <>{result.snippet}</>
  return (
    <>
      {segs.map((s, i) =>
        s.match ? <mark key={i} className="hl">{s.text}</mark> : <span key={i}>{s.text}</span>
      )}
    </>
  )
}
