// Єдиний QueryClient для TanStack Query — відповідає за кешування даних сервера,
// фонове оновлення та інвалідацію. Дані сервера тримаємо тут, а не у Zustand
// (Zustand — лише для клієнтського стану на кшталт сесії).
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Дані вважаються свіжими 30 секунд — менше зайвих запитів.
      staleTime: 30_000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})
