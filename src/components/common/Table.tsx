import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'

export interface Column<T> {
  key: string
  header: ReactNode
  render: (row: T) => ReactNode
  align?: 'left' | 'right'
  // Робить заголовок клікабельним для сортування.
  sortable?: boolean
}

interface TableProps<T> {
  columns: Column<T>[]
  data: T[]
  rowKey: (row: T) => string | number
  onRowClick?: (row: T) => void
  onSort?: (key: string) => void
  sortKey?: string
  sortOrder?: 'asc' | 'desc'
  empty?: ReactNode
}

// Узагальнена таблиця: колонки описуються декларативно, підтримує клік по рядку
// та сортування за клікабельними заголовками.
export function Table<T>({
  columns,
  data,
  rowKey,
  onRowClick,
  onSort,
  sortKey,
  sortOrder,
  empty,
}: TableProps<T>) {
  if (data.length === 0 && empty) {
    return <div className="py-10 text-center text-sm text-neutral-500">{empty}</div>
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-neutral-100 text-left text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  'pb-3 pr-4 font-medium',
                  col.align === 'right' && 'text-right',
                  col.sortable && onSort && 'cursor-pointer select-none hover:text-primary-600',
                )}
                onClick={() => col.sortable && onSort?.(col.key)}
              >
                {col.header}
                {col.sortable && sortKey === col.key && (
                  <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={rowKey(row)}
              onClick={() => onRowClick?.(row)}
              className={cn(
                'border-b border-neutral-50 last:border-0 dark:border-neutral-800/50',
                onRowClick && 'cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800/40',
              )}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={cn('py-3 pr-4', col.align === 'right' && 'text-right')}
                >
                  {col.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
