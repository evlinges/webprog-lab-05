// Схеми валідації форм аутентифікації (Zod 4). У Zod 4 email перевіряється
// функцією z.email() (замість z.string().email()).
import { z } from 'zod'

export const loginSchema = z.object({
  email: z.email('Некоректна адреса електронної пошти'),
  password: z.string().min(1, 'Введіть пароль'),
})

export type LoginInput = z.infer<typeof loginSchema>

export const registerSchema = z
  .object({
    fullName: z.string().min(1, 'Вкажіть імʼя').max(200),
    email: z.email('Некоректна адреса електронної пошти'),
    password: z.string().min(8, 'Пароль має містити щонайменше 8 символів'),
    confirmPassword: z.string().min(1, 'Повторіть пароль'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Паролі не збігаються',
    path: ['confirmPassword'],
  })

export type RegisterInput = z.infer<typeof registerSchema>
