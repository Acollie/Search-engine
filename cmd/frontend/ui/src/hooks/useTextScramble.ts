import { useState, useEffect } from 'react'

const CHARS = '!<>-_\\/[]{}=+*^?#@%アイウエオカキクケコサシスセソ道草水火風0123456789ABCDEF'

// duration  — total ms to resolve all characters
// tickMs    — how often the scramble characters update (higher = slower cycling)
export function useTextScramble(text: string, duration = 900, tickMs = 80) {
  const [output, setOutput] = useState('')
  const [iteration, setIteration] = useState(0)

  const replay = () => setIteration(n => n + 1)

  useEffect(() => {
    const start = performance.now()
    const nonSpace = [...text].filter(c => c.trim()).length
    let lastTick = start
    let raf: number

    const frame = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const shouldTick = now - lastTick >= tickMs

      if (shouldTick) {
        lastTick = now
        let resolvedCount = 0
        const result = [...text]
          .map(ch => {
            if (!ch.trim()) return ch
            const threshold = ++resolvedCount / nonSpace
            return progress >= threshold
              ? ch
              : CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join('')
        setOutput(result)
      }

      if (progress < 1) {
        raf = requestAnimationFrame(frame)
      } else {
        setOutput(text)
      }
    }

    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [text, duration, tickMs, iteration])

  return { output, replay }
}
