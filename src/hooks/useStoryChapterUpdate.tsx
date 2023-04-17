import ApiData from 'models/ApiData'
import ApiError from 'models/ApiError'
import { useMutation, UseMutationOptions } from 'react-query'
import StoriesService from 'services/Stories'

export default function useStoryChapterUpdate (chapterId: number, options?: UseMutationOptions) {
  return useMutation<ApiData, ApiError, any>(payload => StoriesService.Chapters.updateById(chapterId, payload), options)
}
