import { useQuery, UseQueryOptions } from 'react-query'
import MediaService from 'services/Media'

export default function useMediaList (filter: any, options?: UseQueryOptions) {
  return useQuery<any, any, any>(['media[]', filter], () => MediaService.findMany(filter), options)
}
