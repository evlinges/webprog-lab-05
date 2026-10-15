// Схема валідації форми клієнта (Zod 4) та перетворення значень форми у
// корисне навантаження для API. Значення форми — рядки (порожній рядок = «не
// задано»), а перед відправкою порожні необов'язкові поля стають undefined
// (демонстрація різниці між вхідними даними форми та вихідним payload).
import { z } from 'zod'

export const CLIENT_SOURCES = ['instagram', 'facebook', 'site', 'referral', 'repeat'] as const

export const SOURCE_LABELS: Record<(typeof CLIENT_SOURCES)[number], string> = {
  instagram: 'Instagram',
  facebook: 'Facebook',
  site: 'Сайт',
  referral: 'Рекомендація',
  repeat: 'Повторний',
}

export const clientFormSchema = z.object({
  name: z.string().min(1, 'Назва клієнта обовʼязкова').max(200, 'Максимум 200 символів'),
  phone: z.string().max(30, 'Максимум 30 символів'),
  source: z.string(),
  note: z.string().max(1000, 'Максимум 1000 символів'),
})

// Тип значень форми (усі поля — рядки).
export type ClientFormValues = z.infer<typeof clientFormSchema>

// Корисне навантаження для API: необов'язкові поля — опційні.
export interface ClientPayload {
  name: string
  phone?: string
  source?: (typeof CLIENT_SOURCES)[number]
  note?: string
}

// Перетворює значення форми у payload: порожні рядки → undefined.
export function toClientPayload(values: ClientFormValues): ClientPayload {
  return {
    name: values.name.trim(),
    phone: values.phone.trim() || undefined,
    source: (values.source || undefined) as ClientPayload['source'],
    note: values.note.trim() || undefined,
  }
}
