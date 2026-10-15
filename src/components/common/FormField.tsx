import type { ReactNode } from 'react'

interface FormFieldProps {
  label: string
  error?: string
  htmlFor?: string
  children: ReactNode
}

// Обгортка поля форми: підпис + контрол (select/textarea тощо) + помилка.
// Для звичайних текстових полів є окремий компонент Input; FormField зручний
// для нестандартних контролів.
export function FormField({ label, error, htmlFor, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={htmlFor}
        className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
      >
        {label}
      </label>
      {children}
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  )
}
