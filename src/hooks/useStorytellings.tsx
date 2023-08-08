import { useQuery, UseQueryOptions } from 'react-query'
import StorytellingsService from 'services/Storytellings'

export default function useStorytellings (filter: any, options?: UseQueryOptions) {
  return useQuery<any, any, any>(['storytellings[]', filter], () => StorytellingsService.findMany(filter), options)
}
