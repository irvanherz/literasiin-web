import { useQuery, UseQueryOptions } from 'react-query'
import StorytellingsService from 'services/Storytellings'

export default function useStorytellingEpisodes (filter: any, options?: UseQueryOptions) {
  return useQuery<any, any, any>(['storytellings[].episodes[]', filter], () => StorytellingsService.Episodes.findMany(filter), options)
}
