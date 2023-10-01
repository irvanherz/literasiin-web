import { useQuery, UseQueryOptions } from 'react-query'
import StoriesService from 'services/Stories'

export default function useStoryChapters (filter?: any, options?: UseQueryOptions) {
  return useQuery<any, any, any>(['stories.chapters[]', filter], () => StoriesService.Chapters.findMany(filter), options)
}
