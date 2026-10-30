import { useEffect, useId, useRef, useState, KeyboardEvent } from 'react'

interface Props {
  value: string
  onChange: (v: string) => void
  /** Called when a suggestion is chosen; the parent should run the search. */
  onPick: (v: string) => void
  placeholder?: string
  autoFocus?: boolean
  inputClassName?: string
}

const DEBOUNCE_MS = 150

/** Search text input with debounced, abortable autocomplete (ARIA combobox). */
export default function SearchInput({ value, onChange, onPick, placeholder, autoFocus, inputClassName }: Props) {
  const [items, setItems] = useState<string[]>([])
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(-1)
  const timer = useRef<number | undefined>(undefined)
  const ctrl = useRef<AbortController | null>(null)
  const listId = useId()

  const cancel = () => {
    window.clearTimeout(timer.current)
    ctrl.current?.abort()
    ctrl.current = null
  }
  const close = () => { cancel(); setOpen(false); setItems([]); setActive(-1) }

  useEffect(() => cancel, [])

  const handleChange = (v: string) => {
    onChange(v)
    cancel()
    setActive(-1)
    const q = v.trim()
    if (q.length < 2) { setOpen(false); setItems([]); return }
    timer.current = window.setTimeout(() => {
      const c = new AbortController()
      ctrl.current = c
      fetch(`/api/suggest?q=${encodeURIComponent(q.slice(0, 64))}`, { signal: c.signal })
        .then(r => (r.ok ? r.json() : { suggestions: [] }))
        .then((d: { suggestions?: string[] }) => {
          if (c.signal.aborted) return
          const list = Array.isArray(d.suggestions) ? d.suggestions.slice(0, 8) : []
          setItems(list)
          setOpen(list.length > 0)
        })
        .catch(() => { /* autocomplete never shows errors */ })
    }, DEBOUNCE_MS)
  }

  const pick = (s: string) => { close(); onPick(s) }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      if (items.length === 0) return
      e.preventDefault()
      setOpen(true)
      setActive(a => (a + 1) % items.length)
    } else if (e.key === 'ArrowUp') {
      if (items.length === 0) return
      e.preventDefault()
      setOpen(true)
      setActive(a => (a <= 0 ? items.length - 1 : a - 1))
    } else if (e.key === 'Enter') {
      if (open && active >= 0 && items[active]) {
        e.preventDefault()
        pick(items[active])
      } else {
        close() // plain submit of the raw text proceeds via the form
      }
    } else if (e.key === 'Escape') {
      if (open) { e.preventDefault(); setOpen(false); setActive(-1) }
    }
  }

  const expanded = open && items.length > 0

  return (
    <div className="ac-wrap">
      <input
        className={inputClassName ?? 'search-input'}
        type="text"
        role="combobox"
        aria-expanded={expanded}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={expanded && active >= 0 ? `${listId}-${active}` : undefined}
        aria-label="Search query"
        value={value}
        onChange={e => handleChange(e.target.value)}
        onKeyDown={onKeyDown}
        onBlur={() => { cancel(); setOpen(false); setActive(-1) }}
        placeholder={placeholder}
        autoFocus={autoFocus}
        spellCheck={false}
        autoComplete="off"
      />
      {expanded && (
        <ul className="ac-list" id={listId} role="listbox">
          {items.map((s, i) => (
            <li
              key={s}
              id={`${listId}-${i}`}
              role="option"
              aria-selected={i === active}
              className={'ac-item' + (i === active ? ' active' : '')}
              onMouseDown={e => e.preventDefault()}
              onMouseEnter={() => setActive(i)}
              onClick={() => pick(s)}
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
