import { useQuery, UseQueryOptions } from 'react-query'
import KbsService from 'services/Kbs'

export default function useKbs (filter: any, options?: UseQueryOptions) {
  return useQuery<any, any, any>(['kbs[]', filter], () => KbsService.findMany(filter), options)
}
