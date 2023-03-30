import { useQuery } from 'react-query'
import StoriesService from 'services/Stories'
import useCurrentUser from './useCurrentUser'

export default function useStoryChapterContext (chapterId: number) {
  const user = useCurrentUser()
  const userId = user?.id
  return useQuery<any, any, any>(`stories.chapters[${chapterId}].context[${userId}]`, () => StoriesService.Chapters.findContextById(chapterId), { enabled: !!chapterId })
}
