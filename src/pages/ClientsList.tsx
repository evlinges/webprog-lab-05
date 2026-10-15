import { useState } from 'react'
import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query'
import { Link } from 'react-router'
import toast from 'react-hot-toast'
import { getClients, deleteClient } from '@/services/clients.service'
import type { Client } from '@/types/api.types'
import { SOURCE_LABELS, CLIENT_SOURCES } from '@/schemas/client.schema'
import { getErrorMessage } from '@/services/api'
import { useDebounce } from '@/hooks/useDebounce'
import { useAuthStore } from '@/store/authStore'
import { Card } from '@/components/common/Card'
import { Button } from '@/components/common/Button'
import { Input } from '@/components/common/Input'
import { Badge } from '@/components/common/Badge'
import { Skeleton } from '@/components/common/Skeleton'
import { Table } from '@/components/common/Table'
import type { Column } from '@/components/common/Table'
import { ConfirmDialog } from '@/components/common/ConfirmDialog'
import { formatDate } from '@/utils/format'

const PAGE_SIZE = 8
const isKnownSource = (s: string | null): s is (typeof CLIENT_SOURCES)[number] =>
  !!s && (CLIENT_SOURCES as readonly string[]).includes(s)

// Сторінка списку клієнтів: пошук із debounce, сортування за заголовками,
// пагінація (keepPreviousData — без миготіння), видалення через мутацію з
// інвалідацією кешу та підтвердженням.
export function ClientsList() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [sortKey, setSortKey] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [toDelete, setToDelete] = useState<Client | null>(null)
  const debouncedSearch = useDebounce(search, 400)
  const isAdmin = useAuthStore((s) => s.user?.role === 'admin')
  const queryClient = useQueryClient()

  const params = {
    page,
    limit: PAGE_SIZE,
    search: debouncedSearch || undefined,
    sort: sortKey,
    order: sortOrder,
  }

  const { data, isPending, isError, error, isFetching } = useQuery({
    queryKey: ['clients', params],
    queryFn: () => getClients(params),
    placeholderData: keepPreviousData,
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteClient(id),
    onSuccess: () => {
      toast.success('Клієнта видалено')
      queryClient.invalidateQueries({ queryKey: ['clients'] })
      setToDelete(null)
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  })

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder((o) => (o === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortOrder('asc')
    }
  }

  const columns: Column<Client>[] = [
    {
      key: 'name',
      header: 'Клієнт',
      sortable: true,
      render: (c) => (
        <Link to={`/clients/${c.id}`} className="font-medium text-primary-600 hover:underline">
          {c.name}
        </Link>
      ),
    },
    {
      key: 'source',
      header: 'Джерело',
      render: (c) =>
        isKnownSource(c.source) ? (
          <Badge variant="primary">{SOURCE_LABELS[c.source]}</Badge>
        ) : (
          <span className="text-neutral-400">—</span>
        ),
    },
    {
      key: 'phone',
      header: 'Телефон',
      render: (c) => c.phone ?? <span className="text-neutral-400">—</span>,
    },
    {
      key: 'createdAt',
      header: 'Додано',
      sortable: true,
      render: (c) => <span className="text-neutral-500">{formatDate(c.createdAt)}</span>,
    },
    {
      key: 'actions',
      header: '',
      align: 'right',
      render: (c) => (
        <div className="flex justify-end gap-2">
          <Link to={`/clients/${c.id}/edit`}>
            <Button variant="secondary" size="sm">
              Редагувати
            </Button>
          </Link>
          {isAdmin && (
            <Button variant="danger" size="sm" onClick={() => setToDelete(c)}>
              Видалити
            </Button>
          )}
        </div>
      ),
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Клієнти</h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {data ? `Усього: ${data.meta.total}` : 'Завантаження…'}
          </p>
        </div>
        <Link to="/clients/new">
          <Button>+ Новий клієнт</Button>
        </Link>
      </div>

      <Input
        placeholder="Пошук за назвою…"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value)
          setPage(1)
        }}
        className="max-w-sm"
      />

      {isPending ? (
        <Card>
          <div className="flex flex-col gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        </Card>
      ) : isError ? (
        <Card>
          <p className="py-6 text-center text-sm text-red-500">{getErrorMessage(error)}</p>
        </Card>
      ) : (
        <Card className={isFetching ? 'opacity-70 transition-opacity' : undefined}>
          <Table
            columns={columns}
            data={data.data}
            rowKey={(c) => c.id}
            onSort={handleSort}
            sortKey={sortKey}
            sortOrder={sortOrder}
            empty="Клієнтів не знайдено"
          />
        </Card>
      )}

      {data && data.meta.totalPages > 1 && (
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
            Сторінка {data.meta.page} з {data.meta.totalPages}
          </span>
          <Button
            variant="secondary"
            size="sm"
            disabled={page >= data.meta.totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Далі →
          </Button>
        </div>
      )}

      <ConfirmDialog
        open={!!toDelete}
        title="Видалити клієнта?"
        message={`Клієнта «${toDelete?.name}» буде видалено без можливості відновлення.`}
        loading={deleteMutation.isPending}
        onConfirm={() => toDelete && deleteMutation.mutate(toDelete.id)}
        onCancel={() => setToDelete(null)}
      />
    </div>
  )
}
