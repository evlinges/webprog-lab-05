// Невеликий помічник для умовного складання класів Tailwind.
// cn('a', cond && 'b', undefined) → 'a b'
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}
