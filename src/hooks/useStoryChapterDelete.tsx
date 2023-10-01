import ApiData from 'models/ApiData'
import ApiError from 'models/ApiError'
import { useMutation, UseMutationOptions } from 'react-query'
import StoriesService from 'services/Stories'

export default function useStoryChapterDelete (options?: UseMutationOptions) {
  return useMutation<ApiData, ApiError, any>(id => StoriesService.Chapters.deleteById(id), options)
}
