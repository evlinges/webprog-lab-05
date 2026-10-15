import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import toast from 'react-hot-toast'
import { createClient } from '@/services/clients.service'
import { toClientPayload } from '@/schemas/client.schema'
import type { ClientFormValues } from '@/schemas/client.schema'
import { getErrorMessage } from '@/services/api'
import { Card } from '@/components/common/Card'
import { ClientForm } from '@/components/ClientForm'

// Сторінка створення нового клієнта.
export function ClientCreate() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (values: ClientFormValues) => createClient(toClientPayload(values)),
    onSuccess: (client) => {
      toast.success('Клієнта створено')
      queryClient.invalidateQueries({ queryKey: ['clients'] })
      navigate(`/clients/${client.id}`)
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  })

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="mb-5 text-2xl font-bold">Новий клієнт</h1>
      <Card>
        <ClientForm
          onSubmit={(values) => mutation.mutate(values)}
          submitting={mutation.isPending}
          submitLabel="Створити"
        />
      </Card>
    </div>
  )
}
