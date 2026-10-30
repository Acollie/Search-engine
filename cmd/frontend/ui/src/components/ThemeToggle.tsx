import { useClassicTheme } from '../hooks/useClassicTheme'

export default function ThemeToggle({ variant = 'crt' }: { variant?: 'crt' | 'about' }) {
  const [classic, setClassic] = useClassicTheme()
  const base = variant === 'about' ? 'about-nav-link theme-toggle' : 'crt-btn theme-toggle'
  return (
    <button
      type="button"
      className={base + (classic ? ' on' : '')}
      aria-pressed={classic}
      onClick={() => setClassic(!classic)}
      style={variant === 'about' ? undefined : { fontSize: '0.78em' }}
    >
      <span aria-hidden="true">{classic ? '[x] ' : '[ ] '}</span>Classic view
    </button>
  )
}
