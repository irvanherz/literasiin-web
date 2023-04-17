import { useQuery, UseQueryOptions } from 'react-query'
import PublicationsService from 'services/Publications'

export default function usePublications (filter: any, options?: UseQueryOptions) {
  return useQuery<any, any, any>(['publications[]', filter], () => PublicationsService.findMany(filter), options)
}
