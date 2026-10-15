import { Link, useLocation } from 'react-router'

// Людські підписи для сегментів шляху.
const LABELS: Record<string, string> = {
  dashboard: 'Панель',
  clients: 'Клієнти',
  orders: 'Замовлення',
  about: 'Про проєкт',
  new: 'Новий клієнт',
  edit: 'Редагування',
  login: 'Вхід',
  register: 'Реєстрація',
}

// «Хлібні крихти» — ланцюжок навігації, побудований зі шляху.
export function Breadcrumbs() {
  const { pathname } = useLocation()
  const parts = pathname.split('/').filter(Boolean)
  if (parts.length === 0) return null

  const crumbs = parts.map((part, index) => {
    const to = '/' + parts.slice(0, index + 1).join('/')
    const label = LABELS[part] ?? (/^\d+$/.test(part) ? `#${part}` : part)
    return { to, label, last: index === parts.length - 1 }
  })

  return (
    <nav className="mb-5 flex flex-wrap items-center gap-1.5 text-sm text-neutral-500 dark:text-neutral-400">
      <Link to="/" className="hover:text-primary-600">
        Головна
      </Link>
      {crumbs.map((crumb) => (
        <span key={crumb.to} className="flex items-center gap-1.5">
          <span className="text-neutral-300 dark:text-neutral-600">/</span>
          {crumb.last ? (
            <span className="font-medium text-neutral-700 dark:text-neutral-200">
              {crumb.label}
            </span>
          ) : (
            <Link to={crumb.to} className="hover:text-primary-600">
              {crumb.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  )
}
