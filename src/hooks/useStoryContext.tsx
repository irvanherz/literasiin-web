import { useQuery } from 'react-query'
import StoriesService from 'services/Stories'
import useCurrentUser from './useCurrentUser'

export default function useStoryContext (storyId: number) {
  const user = useCurrentUser()
  const userId = user?.id
  return useQuery<any, any, any>(`stories[${storyId}].context[${userId}]`, () => StoriesService.findContextById(storyId))
}
