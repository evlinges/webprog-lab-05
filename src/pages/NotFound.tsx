import { Link } from 'react-router'
import { Button } from '@/components/common/Button'

// Сторінка 404 — показується для будь-якого невідомого маршруту.
export function NotFound() {
  return (
    <div className="grid place-items-center py-24 text-center">
      <div className="text-7xl font-black text-primary-500">404</div>
      <h1 className="mt-4 text-2xl font-bold">Сторінку не знайдено</h1>
      <p className="mt-2 max-w-sm text-neutral-500 dark:text-neutral-400">
        Можливо, адресу введено з помилкою або сторінку було переміщено.
      </p>
      <Link to="/" className="mt-6">
        <Button>На головну</Button>
      </Link>
    </div>
  )
}
