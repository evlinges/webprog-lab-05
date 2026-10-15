import { NavLink } from 'react-router'
import { cn } from '@/utils/cn'

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Панель', icon: '📊' },
  { to: '/clients', label: 'Клієнти', icon: '👥' },
  { to: '/orders', label: 'Замовлення', icon: '📦' },
  { to: '/about', label: 'Про проєкт', icon: 'ℹ️' },
]

interface SidebarProps {
  open: boolean
  onClose: () => void
}

// Бічна панель навігації. На десктопі статична, на мобільному — висувна
// (drawer) з напівпрозорим оверлеєм.
export function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={cn(
          'fixed top-16 bottom-0 left-0 z-40 w-60 border-r border-neutral-200 bg-white transition-transform lg:sticky lg:top-16 lg:z-0 lg:h-[calc(100vh-4rem)] lg:translate-x-0 dark:border-neutral-800 dark:bg-neutral-950',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <nav className="flex flex-col gap-1 p-3">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary-100 text-primary-800 dark:bg-primary-900/40 dark:text-primary-300'
                    : 'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800',
                )
              }
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  )
}
