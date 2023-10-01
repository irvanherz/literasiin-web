import ApiData from 'models/ApiData'
import ApiError from 'models/ApiError'
import { useMutation, UseMutationOptions } from 'react-query'
import ArticlesService from 'services/Articles'

export default function useArticleDelete (options?: UseMutationOptions) {
  return useMutation<ApiData, ApiError, any>(id => ArticlesService.deleteById(id), options)
}
