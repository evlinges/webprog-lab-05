// Сервіс CRUD-операцій над клієнтами майстерні.
import { api } from './api'
import type { Client, PaginatedResponse, ApiResponse } from '@/types/api.types'
import type { ClientPayload } from '@/schemas/client.schema'

export interface ClientListParams {
  page?: number
  limit?: number
  search?: string
  source?: string
  sort?: string
  order?: 'asc' | 'desc'
}

// Деталі клієнта з бекенду містять також його замовлення.
export interface ClientWithOrders extends Client {
  orders?: { id: number; status: string; createdAt: string }[]
}

export async function getClients(
  params: ClientListParams = {},
): Promise<PaginatedResponse<Client>> {
  const { data } = await api.get<PaginatedResponse<Client>>('/clients', { params })
  return data
}

export async function getClient(id: number): Promise<ClientWithOrders> {
  const { data } = await api.get<ApiResponse<ClientWithOrders>>(`/clients/${id}`)
  return data.data
}

export async function createClient(input: ClientPayload): Promise<Client> {
  const { data } = await api.post<ApiResponse<Client>>('/clients', input)
  return data.data
}

export async function updateClient(id: number, input: ClientPayload): Promise<Client> {
  const { data } = await api.patch<ApiResponse<Client>>(`/clients/${id}`, input)
  return data.data
}

export async function deleteClient(id: number): Promise<void> {
  await api.delete(`/clients/${id}`)
}
