import { useQuery } from 'react-query'
import StoriesService from 'services/Stories'

export default function useStoryChapter (chapterId: number, params?: any) {
  return useQuery<any, any, any>(`stories.chapters[${chapterId}]`, () => StoriesService.Chapters.findById(chapterId, params), { enabled: !!chapterId })
}
