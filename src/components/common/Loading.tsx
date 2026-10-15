import { cn } from '@/utils/cn'

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg'
  label?: string
  className?: string
}

const sizeMap: Record<NonNullable<LoadingProps['size']>, string> = {
  sm: 'h-4 w-4 border-2',
  md: 'h-8 w-8 border-2',
  lg: 'h-12 w-12 border-[3px]',
}

// Індикатор завантаження — анімований спінер із опційним підписом.
export function Loading({ size = 'md', label, className }: LoadingProps) {
  return (
    <span
      className={cn('inline-flex items-center gap-2', className)}
      role="status"
      aria-label={label ?? 'Завантаження'}
    >
      <span
        className={cn(
          'animate-spin rounded-full border-current border-t-transparent text-primary-500',
          sizeMap[size],
        )}
      />
      {label && <span className="text-sm text-neutral-500 dark:text-neutral-400">{label}</span>}
    </span>
  )
}
