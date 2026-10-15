// Сервіс доступу до доменних даних майстерні (замовлення, клієнти).
import { api } from './api'
import type { Order, Client, PaginatedResponse } from '@/types/api.types'

export interface ListParams {
  page?: number
  limit?: number
  status?: string
  search?: string
}

export async function getOrders(params: ListParams = {}): Promise<PaginatedResponse<Order>> {
  const { data } = await api.get<PaginatedResponse<Order>>('/orders', { params })
  return data
}

export async function getClients(params: ListParams = {}): Promise<PaginatedResponse<Client>> {
  const { data } = await api.get<PaginatedResponse<Client>>('/clients', { params })
  return data
}
