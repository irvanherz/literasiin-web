import { useQuery } from 'react-query'
import ArticlesService from 'services/Articles'
import useCurrentUser from './useCurrentUser'

export default function useArticleContext (articleId: number) {
  const user = useCurrentUser()
  const userId = user?.id
  return useQuery<any, any, any>(`articles[${articleId}].context[${userId}]`, () => ArticlesService.findContextById(articleId), { enabled: !!articleId })
}
