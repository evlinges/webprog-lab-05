import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router'
import toast from 'react-hot-toast'
import { getClient, updateClient } from '@/services/clients.service'
import { toClientPayload } from '@/schemas/client.schema'
import type { ClientFormValues } from '@/schemas/client.schema'
import { getErrorMessage } from '@/services/api'
import { Card } from '@/components/common/Card'
import { Skeleton } from '@/components/common/Skeleton'
import { ClientForm } from '@/components/ClientForm'

// Сторінка редагування клієнта. Спершу завантажує запис, потім показує форму
// з підставленими значеннями.
export function ClientEdit() {
  const { id } = useParams()
  const clientId = Number(id)
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['clients', clientId],
    queryFn: () => getClient(clientId),
    enabled: Number.isFinite(clientId),
  })

  const mutation = useMutation({
    mutationFn: (values: ClientFormValues) => updateClient(clientId, toClientPayload(values)),
    onSuccess: () => {
      toast.success('Зміни збережено')
      queryClient.invalidateQueries({ queryKey: ['clients'] })
      navigate(`/clients/${clientId}`)
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  })

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="mb-5 text-2xl font-bold">Редагування клієнта</h1>
      <Card>
        {isPending ? (
          <div className="flex flex-col gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        ) : isError ? (
          <p className="py-6 text-center text-sm text-red-500">{getErrorMessage(error)}</p>
        ) : (
          <ClientForm
            defaultValues={{
              name: data.name,
              phone: data.phone ?? '',
              source: data.source ?? '',
              note: data.note ?? '',
            }}
            onSubmit={(values) => mutation.mutate(values)}
            submitting={mutation.isPending}
            submitLabel="Зберегти"
          />
        )}
      </Card>
    </div>
  )
}
