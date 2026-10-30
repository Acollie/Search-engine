export interface SearchResult {
  url: string
  title: string
  snippet: string
  lastCrawled: string
  segments?: Segment[]
}

export interface SearchResponse {
  results: SearchResult[]
  resultCount: number
  page: number
  nextPage: number
  prevPage: number
  hasNext: boolean
  hasPrev: boolean
  searchTime: number
  error?: string
  query: string
  didYouMean?: string
}

export interface Segment {
  text: string
  match: boolean
}
