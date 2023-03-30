import { useQuery, UseQueryOptions } from 'react-query'
import ArticlesService from 'services/Articles'

export default function useArticles (filter: any, options?: UseQueryOptions) {
  return useQuery<any, any, any>(['articles[]', filter], () => ArticlesService.findMany(filter), options)
}
