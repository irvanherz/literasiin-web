import { useQuery } from 'react-query'
import StoriesService from 'services/Stories'

export default function useStory (storyId: number, params?: any) {
  return useQuery<any, any, any>(`stories[${storyId}]`, () => StoriesService.findById(storyId, params), { enabled: !!storyId })
}
