import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router'
import { getClient } from '@/services/clients.service'
import { SOURCE_LABELS, CLIENT_SOURCES } from '@/schemas/client.schema'
import { getErrorMessage } from '@/services/api'
import { Card } from '@/components/common/Card'
import { Badge } from '@/components/common/Badge'
import { Button } from '@/components/common/Button'
import { Skeleton } from '@/components/common/Skeleton'
import { formatDate } from '@/utils/format'

const isKnownSource = (s: string | null): s is (typeof CLIENT_SOURCES)[number] =>
  !!s && (CLIENT_SOURCES as readonly string[]).includes(s)

// Детальна сторінка клієнта: основні дані та його замовлення.
export function ClientDetail() {
  const { id } = useParams()
  const clientId = Number(id)

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['clients', clientId],
    queryFn: () => getClient(clientId),
    enabled: Number.isFinite(clientId),
  })

  if (isPending) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-40 w-full" />
      </div>
    )
  }

  if (isError) {
    return (
      <Card>
        <p className="py-6 text-center text-sm text-red-500">{getErrorMessage(error)}</p>
      </Card>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">{data.name}</h1>
        <Link to={`/clients/${data.id}/edit`}>
          <Button>Редагувати</Button>
        </Link>
      </div>

      <Card title="Дані клієнта">
        <dl className="grid gap-3 sm:grid-cols-2">
          <div>
            <dt className="text-sm text-neutral-500 dark:text-neutral-400">Телефон</dt>
            <dd>{data.phone ?? '—'}</dd>
          </div>
          <div>
            <dt className="text-sm text-neutral-500 dark:text-neutral-400">Джерело</dt>
            <dd>
              {isKnownSource(data.source) ? (
                <Badge variant="primary">{SOURCE_LABELS[data.source]}</Badge>
              ) : (
                '—'
              )}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-neutral-500 dark:text-neutral-400">Додано</dt>
            <dd>{formatDate(data.createdAt)}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-sm text-neutral-500 dark:text-neutral-400">Примітка</dt>
            <dd>{data.note ?? '—'}</dd>
          </div>
        </dl>
      </Card>

      <Card title={`Замовлення (${data.orders?.length ?? 0})`}>
        {data.orders && data.orders.length > 0 ? (
          <ul className="divide-y divide-neutral-100 text-sm dark:divide-neutral-800">
            {data.orders.map((o) => (
              <li key={o.id} className="flex items-center justify-between py-2">
                <span className="font-medium">Замовлення #{o.id}</span>
                <span className="text-neutral-500 dark:text-neutral-400">
                  {o.status} · {formatDate(o.createdAt)}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            У цього клієнта ще немає замовлень.
          </p>
        )}
      </Card>
    </div>
  )
}
