import { useMutation, UseMutationOptions } from 'react-query'
import StoriesService from 'services/Stories'

export default function useRejectStoryWriterInvitation (invitationId: number, options?: UseMutationOptions) {
  return useMutation(() => StoriesService.Writers.Invitations.reject(invitationId), options)
}
