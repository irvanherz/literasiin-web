import ApiData from 'models/ApiData'
import ApiError from 'models/ApiError'
import { useMutation, UseMutationOptions } from 'react-query'
import StorytellingsService from 'services/Storytellings'

export default function useStorytellingDelete (options?: UseMutationOptions) {
  return useMutation<ApiData, ApiError, any>(id => StorytellingsService.deleteById(id), options)
}
