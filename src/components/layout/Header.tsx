import { Link, useNavigate } from 'react-router'
import { APP_NAME } from '@/constants'
import { useAuthStore } from '@/store/authStore'
import { Button } from '@/components/common/Button'
import type { Theme } from '@/hooks/useTheme'

interface HeaderProps {
  theme: Theme
  onToggleTheme: () => void
  onToggleSidebar: () => void
  showSidebarToggle: boolean
}

// Верхня панель: кнопка меню (моб.), логотип, перемикач теми та стан сесії.
export function Header({ theme, onToggleTheme, onToggleSidebar, showSidebarToggle }: HeaderProps) {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-40 h-16 border-b border-neutral-200 bg-white/80 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/80">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          {showSidebarToggle && (
            <button
              onClick={onToggleSidebar}
              aria-label="Меню"
              className="grid h-9 w-9 place-items-center rounded-lg text-xl hover:bg-neutral-100 lg:hidden dark:hover:bg-neutral-800"
            >
              ☰
            </button>
          )}
          <Link to="/" className="flex items-center gap-2 text-lg font-bold">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary-500 text-white">
              🏅
            </span>
            <span>{APP_NAME}</span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleTheme}
            aria-label="Перемкнути тему"
            className="grid h-9 w-9 place-items-center rounded-lg text-lg transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          {user ? (
            <div className="flex items-center gap-2">
              <span className="hidden text-sm text-neutral-500 sm:inline dark:text-neutral-400">
                {user.fullName}
              </span>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                Вийти
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <Button size="sm">Увійти</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
