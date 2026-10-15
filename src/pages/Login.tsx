import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useLocation, Link } from 'react-router'
import toast from 'react-hot-toast'
import { loginSchema } from '@/schemas/auth.schema'
import type { LoginInput } from '@/schemas/auth.schema'
import { login as loginRequest } from '@/services/auth.service'
import { useAuthStore } from '@/store/authStore'
import { getErrorMessage } from '@/services/api'
import { Card } from '@/components/common/Card'
import { Input } from '@/components/common/Input'
import { Button } from '@/components/common/Button'

interface LocationState {
  from?: { pathname: string }
}

// Сторінка входу. Форма керується React Hook Form із валідацією Zod, успішний
// результат кладеться у Zustand-стан, а користувач повертається туди, звідки
// його перенаправили (або на /dashboard).
export function Login() {
  const setAuth = useAuthStore((s) => s.setAuth)
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as LocationState)?.from?.pathname ?? '/dashboard'

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: 'admin@rezanok.ua', password: 'admin12345' },
  })

  const onSubmit = async (values: LoginInput) => {
    try {
      const result = await loginRequest(values.email, values.password)
      setAuth(result.user, result.accessToken)
      toast.success(`Вітаємо, ${result.user.fullName}!`)
      navigate(from, { replace: true })
    } catch (err) {
      toast.error(getErrorMessage(err))
    }
  }

  return (
    <div className="mx-auto max-w-md py-8">
      <Card title="Вхід до системи">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
          <Input
            label="Електронна пошта"
            type="email"
            error={errors.email?.message}
            {...register('email')}
          />
          <Input
            label="Пароль"
            type="password"
            error={errors.password?.message}
            {...register('password')}
          />
          <Button type="submit" isLoading={isSubmitting} className="w-full">
            Увійти
          </Button>
        </form>
        <div className="mt-4 rounded-lg bg-neutral-50 p-3 text-xs text-neutral-500 dark:bg-neutral-800/50 dark:text-neutral-400">
          Демо-доступ уже підставлено: <b>admin@rezanok.ua</b> / <b>admin12345</b>.
        </div>
      </Card>
      <p className="mt-4 text-center text-sm text-neutral-500 dark:text-neutral-400">
        Немає акаунта?{' '}
        <Link to="/register" className="font-medium text-primary-600 hover:underline">
          Зареєструватися
        </Link>
      </p>
    </div>
  )
}
