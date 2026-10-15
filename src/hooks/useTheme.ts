// Хук керування темою. Зберігає вибір у localStorage і перемикає клас .dark
// на кореневому <html>, від якого залежать усі dark:-стилі Tailwind.
import { useCallback, useEffect, useState } from 'react'
import { THEME_KEY } from '@/constants'

export type Theme = 'light' | 'dark'

function readInitialTheme(): Theme {
  const saved = localStorage.getItem(THEME_KEY)
  if (saved === 'light' || saved === 'dark') return saved
  // За замовчуванням враховуємо системну тему.
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readInitialTheme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }, [])

  return { theme, toggleTheme }
}
