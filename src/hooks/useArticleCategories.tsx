import { useQuery, UseQueryOptions } from 'react-query'
import ArticlesService from 'services/Articles'

export default function useArticleCategories (filter: any, options?: UseQueryOptions) {
  return useQuery<any, any, any>(['articles.categories[]', filter], () => ArticlesService.Categories.findMany(filter), options)
}
