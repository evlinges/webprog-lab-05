import { Link } from 'react-router'
import { Card } from '@/components/common/Card'
import { Button } from '@/components/common/Button'
import { Badge } from '@/components/common/Badge'
import { Input } from '@/components/common/Input'
import { Loading } from '@/components/common/Loading'
import { APP_NAME } from '@/constants'

// Головна сторінка: короткий вступ + вітрина UI-компонентів застосунку.
export function Home() {
  return (
    <div className="flex flex-col gap-12">
      {/* Hero */}
      <section className="rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 px-8 py-14 text-white">
        <Badge className="bg-white/20 text-white">Клієнтська частина · ЛР4</Badge>
        <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight sm:text-5xl">
          {APP_NAME} — майстерня нагород онлайн
        </h1>
        <p className="mt-4 max-w-xl text-primary-50">
          Сучасний інтерфейс на React 19 і TypeScript, що працює з REST API майстерні: замовлення,
          клієнти, виробництво й оплати — в одному місці.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/orders">
            <Button size="lg" className="bg-white text-primary-700 hover:bg-primary-50">
              Переглянути замовлення
            </Button>
          </Link>
          <Link to="/about">
            <Button size="lg" variant="ghost" className="text-white hover:bg-white/10">
              Про проєкт
            </Button>
          </Link>
        </div>
      </section>

      {/* Можливості */}
      <section className="grid gap-5 sm:grid-cols-3">
        <Card title="⚡ Реальний час">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Бекенд надсилає оновлення замовлень і сповіщення через WebSocket без перезавантаження.
          </p>
        </Card>
        <Card title="🔐 Безпека">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Аутентифікація за JWT, ролі користувачів і захищені маршрути на клієнті та сервері.
          </p>
        </Card>
        <Card title="🎨 Адаптивність">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Інтерфейс на Tailwind CSS 4 зручний і на телефоні, і на моніторі, зі світлою й темною
            темою.
          </p>
        </Card>
      </section>

      {/* Вітрина UI-набору */}
      <section>
        <h2 className="mb-5 text-2xl font-bold">UI-набір компонентів</h2>
        <div className="grid gap-5 lg:grid-cols-2">
          <Card title="Кнопки">
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary">Основна</Button>
                <Button variant="secondary">Вторинна</Button>
                <Button variant="danger">Небезпечна</Button>
                <Button variant="ghost">Прозора</Button>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Маленька</Button>
                <Button size="md">Середня</Button>
                <Button size="lg">Велика</Button>
                <Button isLoading>Завантаження</Button>
              </div>
            </div>
          </Card>

          <Card title="Мітки статусів">
            <div className="flex flex-wrap gap-2">
              <Badge variant="info">Нове</Badge>
              <Badge variant="warning">У роботі</Badge>
              <Badge variant="success">Виконано</Badge>
              <Badge variant="danger">Проблемне</Badge>
              <Badge variant="primary">Терміново</Badge>
              <Badge variant="neutral">Чернетка</Badge>
            </div>
          </Card>

          <Card title="Поля вводу">
            <div className="flex flex-col gap-4">
              <Input label="Назва клієнта" placeholder="ФК «Динамо-Юніор»" />
              <Input label="Пошта" type="email" error="Некоректна адреса" defaultValue="bad@" />
            </div>
          </Card>

          <Card title="Індикатори завантаження">
            <div className="flex items-center gap-8">
              <Loading size="sm" />
              <Loading size="md" />
              <Loading size="lg" label="Завантаження…" />
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}
