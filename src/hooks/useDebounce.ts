// Хук «відкладеного» значення. Повертає value лише після того, як воно
// перестало змінюватися протягом delay мс. Використовується для пошуку, щоб
// не слати запит на кожне натискання клавіші.
import { useEffect, useState } from 'react'

export function useDebounce<T>(value: T, delay = 400): T {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(id)
  }, [value, delay])

  return debounced
}
