import { useInfiniteQuery, UseInfiniteQueryOptions } from 'react-query'
import ArticlesService from 'services/Articles'

export default function useArticleCommentsInfinite (filter?: any, options?: UseInfiniteQueryOptions) {
  return useInfiniteQuery<any, any, any>(['stories.comments[].infinite', filter], (ctx) => ArticlesService.Comments.findMany({ ...filter, ...ctx.pageParam }), {
    getNextPageParam: ({ meta }) => (meta.page < meta.numPages) ? { page: meta.page + 1 } : undefined,
    getPreviousPageParam: ({ meta }) => (meta.page > 1) ? { page: meta.page - 1 } : undefined
  })
}
