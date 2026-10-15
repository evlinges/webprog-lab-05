import type { InputHTMLAttributes, Ref } from 'react'
import { cn } from '@/utils/cn'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  // React 19 дозволяє приймати ref як звичайний проп — без forwardRef.
  ref?: Ref<HTMLInputElement>
}

// Текстове поле з підписом та повідомленням про помилку.
export function Input({ label, error, className, id, ref, ...props }: InputProps) {
  const inputId = id ?? props.name

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        ref={ref}
        className={cn(
          'rounded-lg border bg-white px-3 py-2 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:ring-2 focus:ring-primary-500/40 dark:bg-neutral-900 dark:text-neutral-100',
          error ? 'border-red-500' : 'border-neutral-300 dark:border-neutral-700',
          className,
        )}
        aria-invalid={!!error}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  )
}
