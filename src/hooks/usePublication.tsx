import { useQuery } from 'react-query'
import PublicationsService from 'services/Publications'

export default function usePublication (publicationId: number, params?: any) {
  return useQuery<any, any, any>(`articles[${publicationId}]`, () => PublicationsService.findById(publicationId, params), { enabled: !!publicationId })
}
