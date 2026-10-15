import { cn } from '@/utils/cn'

// Скелетний заповнювач — показується на час першого завантаження замість
// вмісту, щоб користувач бачив структуру сторінки, а не порожнечу.
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-800', className)}
      aria-hidden="true"
    />
  )
}
