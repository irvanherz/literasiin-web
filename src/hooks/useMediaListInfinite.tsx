import { useInfiniteQuery, UseInfiniteQueryOptions } from 'react-query'
import MediaService from 'services/Media'

export default function useMediaListInfinite (filter: any, options?: UseInfiniteQueryOptions) {
  return useInfiniteQuery(
    ['media.[].infinite', filter],
    ({ pageParam }) => MediaService.findMany({ ...filter, page: pageParam }),
    {
      getNextPageParam: ({ meta }: any) => (meta.page < meta.numPages) ? meta.page + 1 : undefined,
      getPreviousPageParam: ({ meta }: any) => (meta.page > 1) ? meta.page - 1 : undefined,
      ...options
    } as any
  )
}
