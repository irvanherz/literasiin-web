import { useInfiniteQuery, UseInfiniteQueryOptions } from 'react-query'
import StoriesService from 'services/Stories'

export default function useInfiniteStoryComments (filter?: any, options?: UseInfiniteQueryOptions) {
  return useInfiniteQuery<any, any, any>(['stories.comments[].infinite', filter], (ctx) => StoriesService.Comments.findMany({ ...filter, ...ctx.pageParam }), {
    getNextPageParam: ({ meta }) => (meta.page < meta.numPages) ? { page: meta.page + 1 } : undefined,
    getPreviousPageParam: ({ meta }) => (meta.page > 1) ? { page: meta.page - 1 } : undefined
  })
}
