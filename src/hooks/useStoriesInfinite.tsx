import { useInfiniteQuery, UseQueryOptions } from 'react-query'
import StoriesService from 'services/Stories'

export default function useStoriesInfinite (filter: any, options?: UseQueryOptions) {
  return useInfiniteQuery(
    ['stories.[].infinite', filter],
    ({ pageParam }) => StoriesService.findMany({ ...filter, page: pageParam }),
    {
      getNextPageParam: ({ meta }) => (meta.page < meta.numPages) ? meta.page + 1 : undefined,
      getPreviousPageParam: ({ meta }) => (meta.page > 1) ? meta.page - 1 : undefined
    }
  )
}
