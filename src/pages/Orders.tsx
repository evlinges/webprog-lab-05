import { useEffect, useState } from 'react'
import { getOrders } from '@/services/rezanok.service'
import { getErrorMessage } from '@/services/api'
import type { Order, OrderStatus, Pagination } from '@/types/api.types'
import { Card } from '@/components/common/Card'
import { Badge } from '@/components/common/Badge'
import { Button } from '@/components/common/Button'
import { Loading } from '@/components/common/Loading'
import { formatCurrency, formatDate } from '@/utils/format'

type StatusVariant = 'info' | 'warning' | 'success' | 'danger'

const STATUS_META: Record<OrderStatus, { label: string; variant: StatusVariant }> = {
  new: { label: 'Нове', variant: 'info' },
  work: { label: 'У роботі', variant: 'warning' },
  done: { label: 'Виконано', variant: 'success' },
  problem: { label: 'Проблемне', variant: 'danger' },
}

const PAGE_SIZE = 8

// Сторінка списку замовлень — тягне дані з розгорнутого REST API (ЛР3).
export function Orders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [meta, setMeta] = useState<Pagination | null>(null)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await getOrders({ page, limit: PAGE_SIZE })
        if (!active) return
        setOrders(res.data)
        setMeta(res.meta)
      } catch (err) {
        if (active) setError(getErrorMessage(err))
      } finally {
        if (active) setLoading(false)
      }
    }
    void load()
    return () => {
      active = false
    }
  }, [page])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold">Замовлення</h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {meta ? `Усього: ${meta.total}` : 'Завантаження списку…'}
          </p>
        </div>
      </div>

      {loading && (
        <div className="grid place-items-center py-20">
          <Loading size="lg" label="Завантаження замовлень…" />
        </div>
      )}

      {error && !loading && (
        <Card>
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <span className="text-3xl">😕</span>
            <p className="text-sm text-neutral-600 dark:text-neutral-300">{error}</p>
            <Button variant="secondary" size="sm" onClick={() => setPage((p) => p)}>
              Спробувати ще раз
            </Button>
          </div>
        </Card>
      )}

      {!loading && !error && (
        <>
          {/* Таблиця на великих екранах */}
          <Card className="hidden overflow-x-auto md:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-100 text-left text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
                  <th className="pb-3 pr-4 font-medium">№</th>
                  <th className="pb-3 pr-4 font-medium">Клієнт</th>
                  <th className="pb-3 pr-4 font-medium">Статус</th>
                  <th className="pb-3 pr-4 font-medium">Дедлайн</th>
                  <th className="pb-3 pr-4 text-right font-medium">Сума</th>
                  <th className="pb-3 text-right font-medium">Борг</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-neutral-50 last:border-0 dark:border-neutral-800/50"
                  >
                    <td className="py-3 pr-4 font-medium">
                      #{order.id}
                      {order.urgent && (
                        <Badge variant="primary" className="ml-2">
                          терміново
                        </Badge>
                      )}
                    </td>
                    <td className="py-3 pr-4">{order.client?.name ?? '—'}</td>
                    <td className="py-3 pr-4">
                      <Badge variant={STATUS_META[order.status].variant}>
                        {STATUS_META[order.status].label}
                      </Badge>
                    </td>
                    <td className="py-3 pr-4 text-neutral-500 dark:text-neutral-400">
                      {formatDate(order.deadline)}
                    </td>
                    <td className="py-3 pr-4 text-right font-medium">
                      {formatCurrency(order.totals.total)}
                    </td>
                    <td className="py-3 text-right">
                      <span
                        className={order.totals.balance > 0 ? 'text-red-500' : 'text-green-600'}
                      >
                        {formatCurrency(order.totals.balance)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          {/* Картки на телефонах */}
          <div className="grid gap-4 md:hidden">
            {orders.map((order) => (
              <Card key={order.id}>
                <div className="flex items-start justify-between">
                  <div className="font-semibold">
                    #{order.id} · {order.client?.name ?? '—'}
                  </div>
                  <Badge variant={STATUS_META[order.status].variant}>
                    {STATUS_META[order.status].label}
                  </Badge>
                </div>
                <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
                  <dt className="text-neutral-500 dark:text-neutral-400">Дедлайн</dt>
                  <dd className="text-right">{formatDate(order.deadline)}</dd>
                  <dt className="text-neutral-500 dark:text-neutral-400">Сума</dt>
                  <dd className="text-right font-medium">{formatCurrency(order.totals.total)}</dd>
                  <dt className="text-neutral-500 dark:text-neutral-400">Борг</dt>
                  <dd
                    className={
                      'text-right ' + (order.totals.balance > 0 ? 'text-red-500' : 'text-green-600')
                    }
                  >
                    {formatCurrency(order.totals.balance)}
                  </dd>
                </dl>
              </Card>
            ))}
          </div>

          {/* Пагінація */}
          {meta && meta.totalPages > 1 && (
            <div className="flex items-center justify-center gap-4">
              <Button
                variant="secondary"
                size="sm"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                ← Назад
              </Button>
              <span className="text-sm text-neutral-500 dark:text-neutral-400">
                Сторінка {meta.page} з {meta.totalPages}
              </span>
              <Button
                variant="secondary"
                size="sm"
                disabled={page >= meta.totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Далі →
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
