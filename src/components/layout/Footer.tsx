import { APP_NAME } from '@/constants'

// Підвал із коротким описом, контактами та переліком технологій.
export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
        <div>
          <div className="mb-2 flex items-center gap-2 font-bold">
            <span className="grid h-7 w-7 place-items-center rounded-md bg-primary-500 text-sm text-white">
              🏅
            </span>
            {APP_NAME}
          </div>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Клієнтська частина системи обліку замовлень майстерні нагород.
          </p>
        </div>
        <div>
          <h3 className="mb-2 text-sm font-semibold">Контакти</h3>
          <ul className="space-y-1 text-sm text-neutral-500 dark:text-neutral-400">
            <li>м. Київ, вул. Нагородна, 1</li>
            <li>+380 (67) 123-45-67</li>
            <li>hello@rezanok.ua</li>
          </ul>
        </div>
        <div>
          <h3 className="mb-2 text-sm font-semibold">Технології</h3>
          <ul className="space-y-1 text-sm text-neutral-500 dark:text-neutral-400">
            <li>React 19 · TypeScript</li>
            <li>Vite · Tailwind CSS 4</li>
            <li>React Router · Axios</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-neutral-100 py-4 text-center text-xs text-neutral-400 dark:border-neutral-800">
        © {year} {APP_NAME}. Лабораторна робота №4, «Вебпрограмування».
      </div>
    </footer>
  )
}
