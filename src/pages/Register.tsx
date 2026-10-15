import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, Link } from 'react-router'
import toast from 'react-hot-toast'
import { registerSchema } from '@/schemas/auth.schema'
import type { RegisterInput } from '@/schemas/auth.schema'
import { register as registerRequest } from '@/services/auth.service'
import { useAuthStore } from '@/store/authStore'
import { getErrorMessage } from '@/services/api'
import { Card } from '@/components/common/Card'
import { Input } from '@/components/common/Input'
import { Button } from '@/components/common/Button'

// Сторінка реєстрації. Після успішного створення акаунта користувач одразу
// авторизується (бекенд повертає токени) і потрапляє на панель.
export function Register() {
  const setAuth = useAuthStore((s) => s.setAuth)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (values: RegisterInput) => {
    try {
      const result = await registerRequest(values.fullName, values.email, values.password)
      setAuth(result.user, result.accessToken)
      toast.success('Акаунт створено!')
      navigate('/dashboard', { replace: true })
    } catch (err) {
      toast.error(getErrorMessage(err))
    }
  }

  return (
    <div className="mx-auto max-w-md py-8">
      <Card title="Реєстрація">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
          <Input label="Повне імʼя" error={errors.fullName?.message} {...register('fullName')} />
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
          <Input
            label="Повторіть пароль"
            type="password"
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />
          <Button type="submit" isLoading={isSubmitting} className="w-full">
            Створити акаунт
          </Button>
        </form>
      </Card>
      <p className="mt-4 text-center text-sm text-neutral-500 dark:text-neutral-400">
        Вже є акаунт?{' '}
        <Link to="/login" className="font-medium text-primary-600 hover:underline">
          Увійти
        </Link>
      </p>
    </div>
  )
}
