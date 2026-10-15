import { Card } from '@/components/common/Card'
import { Badge } from '@/components/common/Badge'
import { APP_NAME, API_URL } from '@/constants'

const STACK = [
  'React 19',
  'TypeScript',
  'Vite',
  'Tailwind CSS 4',
  'React Router',
  'Axios',
  'ESLint',
  'Prettier',
]

// Сторінка з описом проєкту та використаних технологій.
export function About() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold">Про проєкт</h1>
        <p className="mt-2 max-w-2xl text-neutral-500 dark:text-neutral-400">
          {APP_NAME} — клієнтська частина системи обліку замовлень майстерні нагород. Це лабораторна
          робота №4 з дисципліни «Вебпрограмування», у якій побудовано сучасний фронтенд на React і
          підключено до REST API, створеного в попередніх роботах.
        </p>
      </div>

      <Card title="Технології">
        <div className="flex flex-wrap gap-2">
          {STACK.map((tech) => (
            <Badge key={tech} variant="primary">
              {tech}
            </Badge>
          ))}
        </div>
      </Card>

      <div className="grid gap-5 sm:grid-cols-2">
        <Card title="Що реалізовано">
          <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-300">
            <li>• Архітектура SPA з маршрутизацією та захищеними сторінками</li>
            <li>• Набір перевикористовних UI-компонентів на Tailwind</li>
            <li>• Аутентифікація за JWT з Axios-interceptors та обробкою 401</li>
            <li>• Типізація відповідей API через TypeScript</li>
            <li>• Світла й темна теми, адаптивний дизайн</li>
            <li>• Межа помилок (Error Boundary) та індикатори завантаження</li>
          </ul>
        </Card>
        <Card title="Підключення до API">
          <p className="text-sm text-neutral-600 dark:text-neutral-300">
            Застосунок отримує дані з розгорнутого бекенду (ЛР1–ЛР3). Базова адреса API
            налаштовується змінною середовища <code className="text-primary-600">VITE_API_URL</code>
            :
          </p>
          <code className="mt-3 block break-all rounded-lg bg-neutral-50 p-3 text-xs text-neutral-700 dark:bg-neutral-800/50 dark:text-neutral-300">
            {API_URL}
          </code>
        </Card>
      </div>
    </div>
  )
}
