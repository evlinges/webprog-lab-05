// Типи даних, якими застосунок обмінюється з REST API майстерні «Rezanok».
// Структури відповідають формату бекенду: { success, data, meta }.

// Узагальнена успішна відповідь з одним об'єктом.
export interface ApiResponse<T> {
  success: boolean
  data: T
}

// Метадані посторінкового виведення.
export interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

// Відповідь зі списком та пагінацією.
export interface PaginatedResponse<T> {
  success: boolean
  data: T[]
  meta: Pagination
}

// Структура помилки від бекенду.
export interface ApiError {
  success: false
  error: {
    message: string
    details?: { field: string; message: string }[]
  }
}

// ── Доменні сутності ──

export type UserRole = 'user' | 'admin'

export interface User {
  id: number
  email: string
  fullName: string
  role: UserRole
  active: boolean
  createdAt: string
}

export interface AuthResult {
  user: User
  accessToken: string
  refreshToken: string
}

export type OrderStatus = 'new' | 'work' | 'done' | 'problem'

export interface Client {
  id: number
  name: string
  phone: string | null
  source: string | null
  note: string | null
  createdAt: string
}

export interface OrderItem {
  id: number
  type: string
  qty: number
  price: string | number
  discount: string | number
}

export interface OrderTotals {
  itemsTotal: number
  total: number
  paid: number
  balance: number
}

export interface Order {
  id: number
  status: OrderStatus
  urgent: boolean
  deadline: string | null
  createdAt: string
  client: { id: number; name: string }
  items: OrderItem[]
  totals: OrderTotals
}
