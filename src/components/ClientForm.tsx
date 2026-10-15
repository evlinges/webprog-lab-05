import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { clientFormSchema, CLIENT_SOURCES, SOURCE_LABELS } from '@/schemas/client.schema'
import type { ClientFormValues } from '@/schemas/client.schema'
import { Input } from '@/components/common/Input'
import { FormField } from '@/components/common/FormField'
import { Button } from '@/components/common/Button'

interface ClientFormProps {
  defaultValues?: Partial<ClientFormValues>
  onSubmit: (values: ClientFormValues) => void
  submitting: boolean
  submitLabel: string
}

const controlClass =
  'rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 outline-none transition-colors focus:ring-2 focus:ring-primary-500/40 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100'

// Спільна форма клієнта для сторінок створення та редагування. Валідація —
// React Hook Form + Zod; трансформація значень у payload робиться поза формою.
export function ClientForm({ defaultValues, onSubmit, submitting, submitLabel }: ClientFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClientFormValues>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: { name: '', phone: '', source: '', note: '', ...defaultValues },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
      <Input label="Назва клієнта" error={errors.name?.message} {...register('name')} />
      <Input
        label="Телефон"
        placeholder="+380…"
        error={errors.phone?.message}
        {...register('phone')}
      />
      <FormField label="Джерело звернення" htmlFor="source" error={errors.source?.message}>
        <select id="source" className={controlClass} {...register('source')}>
          <option value="">— не вказано —</option>
          {CLIENT_SOURCES.map((s) => (
            <option key={s} value={s}>
              {SOURCE_LABELS[s]}
            </option>
          ))}
        </select>
      </FormField>
      <FormField label="Примітка" htmlFor="note" error={errors.note?.message}>
        <textarea id="note" rows={3} className={controlClass} {...register('note')} />
      </FormField>
      <div className="flex gap-3 pt-2">
        <Button type="submit" isLoading={submitting}>
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}
