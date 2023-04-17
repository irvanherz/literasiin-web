import ApiData from 'models/ApiData'
import ApiError from 'models/ApiError'
import { useMutation, UseMutationOptions } from 'react-query'
import ArticlesService from 'services/Articles'

export default function useArticleUpdate (id: number, options?: UseMutationOptions) {
  return useMutation<ApiData, ApiError, any>((payload) => ArticlesService.updateById(id, payload), options)
}
