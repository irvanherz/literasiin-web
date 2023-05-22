import { useQuery, UseQueryOptions } from 'react-query'
import PublicationsService from 'services/Publications'

export default function usePublicationAvailableCouriers (publicationId: number, options?: UseQueryOptions) {
  return useQuery<any, any, any>(`publications[${publicationId}].availableCouriers`, () => PublicationsService.queryAvailableCouriers(publicationId), { enabled: !!publicationId, ...options })
}
