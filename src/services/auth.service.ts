// Сервіс аутентифікації: звернення до ендпоінтів /auth бекенду.
import { api } from './api'
import type { ApiResponse, AuthResult, User } from '@/types/api.types'

export async function login(email: string, password: string): Promise<AuthResult> {
  const { data } = await api.post<ApiResponse<AuthResult>>('/auth/login', { email, password })
  return data.data
}

export async function register(
  fullName: string,
  email: string,
  password: string,
): Promise<AuthResult> {
  const { data } = await api.post<ApiResponse<AuthResult>>('/auth/register', {
    fullName,
    email,
    password,
  })
  return data.data
}

export async function getMe(): Promise<User> {
  const { data } = await api.get<ApiResponse<User>>('/auth/me')
  return data.data
}
