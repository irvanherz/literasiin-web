import ApiData from 'models/ApiData'
import ApiError from 'models/ApiError'
import { useMutation, UseMutationOptions } from 'react-query'
import StoriesService from 'services/Stories'

export default function useStoryCreate (options?: UseMutationOptions) {
  return useMutation<ApiData, ApiError, any>(payload => StoriesService.create(payload), options)
}
