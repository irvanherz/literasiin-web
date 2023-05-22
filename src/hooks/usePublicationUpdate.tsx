import ApiData from 'models/ApiData'
import ApiError from 'models/ApiError'
import { useMutation, UseMutationOptions } from 'react-query'
import PublicationsService from 'services/Publications'

export default function usePublicationUpdate (publicationId: number, options?: UseMutationOptions) {
  return useMutation<ApiData, ApiError, any>(payload => PublicationsService.updateById(publicationId, payload), options)
}
