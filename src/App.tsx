import type { ReactNode } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import { Layout } from '@/components/layout/Layout'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { Home } from '@/pages/Home'
import { About } from '@/pages/About'
import { Login } from '@/pages/Login'
import { Register } from '@/pages/Register'
import { Dashboard } from '@/pages/Dashboard'
import { ClientsList } from '@/pages/ClientsList'
import { ClientCreate } from '@/pages/ClientCreate'
import { ClientDetail } from '@/pages/ClientDetail'
import { ClientEdit } from '@/pages/ClientEdit'
import { Orders } from '@/pages/Orders'
import { NotFound } from '@/pages/NotFound'

// Невелика обгортка, щоб не повторювати ProtectedRoute у кожному рядку.
function Protected({ children }: { children: ReactNode }) {
  return <ProtectedRoute>{children}</ProtectedRoute>
}

// Кореневий компонент: маршрутизація SPA. Публічні сторінки — головна, вхід,
// реєстрація, про проєкт; решта (панель, клієнти, замовлення) — захищені.
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="about" element={<About />} />
          <Route
            path="dashboard"
            element={
              <Protected>
                <Dashboard />
              </Protected>
            }
          />
          <Route
            path="clients"
            element={
              <Protected>
                <ClientsList />
              </Protected>
            }
          />
          <Route
            path="clients/new"
            element={
              <Protected>
                <ClientCreate />
              </Protected>
            }
          />
          <Route
            path="clients/:id"
            element={
              <Protected>
                <ClientDetail />
              </Protected>
            }
          />
          <Route
            path="clients/:id/edit"
            element={
              <Protected>
                <ClientEdit />
              </Protected>
            }
          />
          <Route
            path="orders"
            element={
              <Protected>
                <Orders />
              </Protected>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
