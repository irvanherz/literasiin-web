import { useInfiniteQuery, UseQueryOptions } from 'react-query'
import ArticlesService from 'services/Articles'

export default function useArticlesInfinite (filter: any, options?: UseQueryOptions) {
  return useInfiniteQuery(
    ['articles.[].infinite', filter],
    ({ pageParam }) => ArticlesService.findMany({ ...filter, page: pageParam }),
    {
      getNextPageParam: ({ meta }) => (meta.page < meta.numPages) ? meta.page + 1 : undefined,
      getPreviousPageParam: ({ meta }) => (meta.page > 1) ? meta.page - 1 : undefined
    }
  )
}
