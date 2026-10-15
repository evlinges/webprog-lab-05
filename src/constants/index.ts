// Глобальні константи застосунку. Значення, залежні від середовища, беруться
// зі змінних Vite (import.meta.env), решта — статичні.

export const APP_NAME: string = import.meta.env.VITE_APP_NAME ?? 'Rezanok'

// Базова адреса REST API (бекенд ЛР1–ЛР3). За замовчуванням — локальний сервер.
export const API_URL: string = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api'

// Ключі для localStorage.
export const TOKEN_KEY = 'rezanok_access_token'
export const THEME_KEY = 'rezanok_theme'

// Навігаційні посилання у шапці.
export const NAV_LINKS = [
  { to: '/', label: 'Головна' },
  { to: '/orders', label: 'Замовлення' },
  { to: '/about', label: 'Про проєкт' },
] as const
