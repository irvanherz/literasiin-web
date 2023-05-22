import ApiData from 'models/ApiData'
import ApiError from 'models/ApiError'
import { useMutation, UseMutationOptions } from 'react-query'
import PublicationsService from 'services/Publications'

export default function usePublicationCommit (publicationId: number, options?: UseMutationOptions) {
  return useMutation<ApiData, ApiError, any>(() => PublicationsService.commit(publicationId), options)
}
