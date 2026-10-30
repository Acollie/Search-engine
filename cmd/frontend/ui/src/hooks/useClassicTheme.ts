import { useSyncExternalStore } from 'react'

const KEY = 'search-theme'
const listeners = new Set<() => void>()

function read(): boolean {
  try { return localStorage.getItem(KEY) === 'classic' } catch { return false }
}

let classic = read()

export function setClassic(v: boolean) {
  classic = v
  try { localStorage.setItem(KEY, v ? 'classic' : 'terminal') } catch { /* storage unavailable */ }
  listeners.forEach(l => l())
}

function subscribe(cb: () => void) {
  listeners.add(cb)
  return () => { listeners.delete(cb) }
}

/** Shared (cross-component, persisted) classic-theme flag. */
export function useClassicTheme(): [boolean, (v: boolean) => void] {
  const v = useSyncExternalStore(subscribe, () => classic)
  return [v, setClassic]
}
