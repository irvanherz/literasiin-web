import { useQuery } from 'react-query'
import ArticlesService from 'services/Articles'

export default function useArticle (articleId: number, params?: any) {
  return useQuery<any, any, any>(`articles[${articleId}]`, () => ArticlesService.findById(articleId, params), { enabled: !!articleId })
}
