import ApiData from 'models/ApiData'
import ApiError from 'models/ApiError'
import { useMutation, UseMutationOptions } from 'react-query'
import StorytellingsService from 'services/Storytellings'

export default function useStorytellingEpisodeDelete (epsodeId: number, options?: UseMutationOptions) {
  return useMutation<ApiData, ApiError, any>(() => StorytellingsService.Episodes.deleteById(epsodeId), options)
}
