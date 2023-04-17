import { useQuery, UseQueryOptions } from 'react-query'
import StoriesService from 'services/Stories'

export default function useStoryCategories (filter?: any, options?: UseQueryOptions) {
  return useQuery<any, any, any>(['stories.categories[]', filter], () => StoriesService.Categories.findMany(filter), options)
}
