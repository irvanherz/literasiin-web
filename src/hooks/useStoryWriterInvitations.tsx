import { useQuery } from 'react-query'
import StoriesService from 'services/Stories'

export default function useStoryWriterInvitations (filter: any) {
  return useQuery<any, any, any>(['stories.writers.invitations', filter], () => StoriesService.Writers.Invitations.findMany(filter))
}
