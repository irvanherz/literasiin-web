import { useQuery, UseQueryOptions } from 'react-query'
import StoriesService from 'services/Stories'

export default function useStoryComments (filter?: any, options?: UseQueryOptions) {
  return useQuery<any, any, any>(['stories.comments[]', filter], () => StoriesService.Comments.findMany(filter), options)
}
