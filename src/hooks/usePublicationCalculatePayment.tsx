import { useQuery, UseQueryOptions } from 'react-query'
import PublicationsService from 'services/Publications'

export default function usePublicationCalculatePayment (publicationId: number, options?: UseQueryOptions) {
  return useQuery<any, any, any>(`publications[${publicationId}].calculatePayment`, () => PublicationsService.calculatePayment(publicationId), { enabled: !!publicationId, ...options })
}
