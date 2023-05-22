import { useQuery, UseQueryOptions } from 'react-query'
import PublicationsService from 'services/Publications'

export default function usePublicationFiles (filter: any, options?: UseQueryOptions) {
  return useQuery<any, any, any>(['publications.files[]', filter], () => PublicationsService.Files.findMany(filter), options)
}
