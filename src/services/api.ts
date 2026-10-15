// Налаштований екземпляр Axios для всіх запитів до REST API.
// Interceptor запиту бере JWT-токен із Zustand-стану; interceptor відповіді
// централізовано обробляє 401 (недійсний токен → logout і перехід на /login).
import axios from 'axios'
import { API_URL } from '@/constants'
import { useAuthStore } from '@/store/authStore'

export const api = axios.create({
  baseURL: API_URL,
  // Бекенд на безкоштовному хостингу може «прокидатися» до хвилини.
  timeout: 45000,
})

// Interceptor запиту: підставляє заголовок Authorization, якщо є токен.
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Interceptor відповіді: 401 → виходимо зі стану і відправляємо на /login.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout()
      if (window.location.pathname !== '/login') {
        window.location.assign('/login')
      }
    }
    return Promise.reject(error)
  },
)

// Витягує зрозуміле повідомлення про помилку з відповіді Axios.
export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.error?.message ?? error.message
  }
  return error instanceof Error ? error.message : 'Невідома помилка'
}
