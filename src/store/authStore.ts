// Глобальний стан аутентифікації на Zustand. Токен і профіль зберігаються у
// localStorage через middleware persist (ключ 'auth-storage'), тож сесія
// переживає перезавантаження сторінки. Сам стан «чистий» — мережеві запити
// роблять сторінки через сервіси, а сюди лише кладуть результат (setAuth).
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/types/api.types'

interface AuthState {
  user: User | null
  token: string | null
  setAuth: (user: User, token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setAuth: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
    }),
    { name: 'auth-storage' },
  ),
)

// Селектор-зручність: чи користувач автентифікований.
export const selectIsAuthenticated = (s: AuthState) => !!s.token
