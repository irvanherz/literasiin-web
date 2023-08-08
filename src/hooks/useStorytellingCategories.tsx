import { useQuery, UseQueryOptions } from 'react-query'
import StorytellingsService from 'services/Storytellings'

export default function useStorytellingCategories (filter?: any, options?: UseQueryOptions) {
  return useQuery<any, any, any>(['storytellings.categories[]', filter], () => StorytellingsService.Categories.findMany(filter), options)
}
