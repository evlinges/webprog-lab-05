import { useState } from 'react'
import { Outlet } from 'react-router'
import { Header } from './Header'
import { Footer } from './Footer'
import { Sidebar } from './Sidebar'
import { Breadcrumbs } from './Breadcrumbs'
import { useTheme } from '@/hooks/useTheme'
import { useAuthStore, selectIsAuthenticated } from '@/store/authStore'

// Каркас застосунку: верхня панель, бічна навігація (для авторизованих),
// основна область із «хлібними крихтами» та підвал. Тема керується тут.
export function Layout() {
  const { theme, toggleTheme } = useTheme()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const isAuthenticated = useAuthStore(selectIsAuthenticated)

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        onToggleSidebar={() => setSidebarOpen((o) => !o)}
        showSidebarToggle={isAuthenticated}
      />
      <div className="mx-auto flex w-full max-w-7xl flex-1">
        {isAuthenticated && <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />}
        <main className="min-w-0 flex-1">
          <div className="mx-auto w-full max-w-5xl px-4 py-6">
            <Breadcrumbs />
            <Outlet />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}
