import { useQuery } from 'react-query'
import StoriesService from 'services/Stories'

export default function useStories (filter: any) {
  return useQuery<any, any, any>(['stories[]', filter], () => StoriesService.findMany(filter))
}
