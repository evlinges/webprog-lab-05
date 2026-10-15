import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router'
import { getClients } from '@/services/clients.service'
import { getOrders } from '@/services/rezanok.service'
import { useAuthStore } from '@/store/authStore'
import { Card } from '@/components/common/Card'
import { Button } from '@/components/common/Button'
import { Skeleton } from '@/components/common/Skeleton'

interface StatCardProps {
  label: string
  value?: number
  icon: string
  loading: boolean
}

function StatCard({ label, value, icon, loading }: StatCardProps) {
  return (
    <Card>
      <div className="flex items-center gap-4">
        <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary-100 text-2xl dark:bg-primary-900/40">
          {icon}
        </span>
        <div>
          {loading ? (
            <Skeleton className="h-8 w-16" />
          ) : (
            <div className="text-2xl font-bold">{value ?? '—'}</div>
          )}
          <div className="text-sm text-neutral-500 dark:text-neutral-400">{label}</div>
        </div>
      </div>
    </Card>
  )
}

// Головна панель керування: вітання та зведена статистика з сервера
// (кількість клієнтів і замовлень) через TanStack Query.
export function Dashboard() {
  const user = useAuthStore((s) => s.user)

  const clientsQuery = useQuery({
    queryKey: ['clients', { page: 1, limit: 1 }],
    queryFn: () => getClients({ page: 1, limit: 1 }),
  })
  const ordersQuery = useQuery({
    queryKey: ['orders', { page: 1, limit: 1 }],
    queryFn: () => getOrders({ page: 1, limit: 1 }),
  })

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold">Панель керування</h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Вітаємо, {user?.fullName ?? 'користувачу'}! Ось коротка зведена інформація.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <StatCard
          label="Клієнтів у базі"
          icon="👥"
          loading={clientsQuery.isPending}
          value={clientsQuery.data?.meta.total}
        />
        <StatCard
          label="Усього замовлень"
          icon="📦"
          loading={ordersQuery.isPending}
          value={ordersQuery.data?.meta.total}
        />
      </div>

      <Card title="Швидкі дії">
        <div className="flex flex-wrap gap-3">
          <Link to="/clients">
            <Button>Список клієнтів</Button>
          </Link>
          <Link to="/clients/new">
            <Button variant="secondary">+ Новий клієнт</Button>
          </Link>
          <Link to="/orders">
            <Button variant="secondary">Замовлення</Button>
          </Link>
        </div>
      </Card>
    </div>
  )
}
