import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router'
import { useAuthStore, selectIsAuthenticated } from '@/store/authStore'

// Обгортка маршруту, що вимагає аутентифікації. Стан сесії беремо зі
// Zustand-стану (він синхронно відновлюється з localStorage через persist),
// тож індикатор очікування не потрібен. Неавторизованого — на /login.
export function ProtectedRoute({ children }: { children: ReactNode }) {
  const isAuthenticated = useAuthStore(selectIsAuthenticated)
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}
