import { useQuery, UseQueryOptions } from 'react-query'
import StoriesService from 'services/Stories'

export default function useStories (filter: any, options?: UseQueryOptions) {
  return useQuery<any, any, any>(['stories[]', filter], () => StoriesService.findMany(filter), options)
}
