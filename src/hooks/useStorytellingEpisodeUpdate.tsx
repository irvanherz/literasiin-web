import ApiData from 'models/ApiData'
import ApiError from 'models/ApiError'
import { useMutation, UseMutationOptions } from 'react-query'
import StorytellingsService from 'services/Storytellings'

export default function useStorytellingEpisodeUpdate (episodeId: number, options?: UseMutationOptions) {
  return useMutation<ApiData, ApiError, any>(payload => StorytellingsService.Episodes.updateById(episodeId, payload), options)
}
