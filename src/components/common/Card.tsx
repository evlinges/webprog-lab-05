import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface CardProps {
  children: ReactNode
  title?: ReactNode
  footer?: ReactNode
  className?: string
}

// Контейнер-картка з опційними заголовком і підвалом.
export function Card({ children, title, footer, className }: CardProps) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900',
        className,
      )}
    >
      {title && (
        <div className="border-b border-neutral-100 px-5 py-3 font-semibold dark:border-neutral-800">
          {title}
        </div>
      )}
      <div className="p-5">{children}</div>
      {footer && (
        <div className="border-t border-neutral-100 px-5 py-3 dark:border-neutral-800">
          {footer}
        </div>
      )}
    </div>
  )
}
