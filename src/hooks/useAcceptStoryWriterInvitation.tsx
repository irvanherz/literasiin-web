import { useMutation, UseMutationOptions } from 'react-query'
import StoriesService from 'services/Stories'

export default function useAcceptStoryWriterInvitation (invitationId: number, options?: UseMutationOptions) {
  return useMutation(() => StoriesService.Writers.Invitations.accept(invitationId), options)
}
