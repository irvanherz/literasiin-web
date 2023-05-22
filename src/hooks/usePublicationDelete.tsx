import ApiData from 'models/ApiData'
import ApiError from 'models/ApiError'
import { useMutation, UseMutationOptions } from 'react-query'
import PublicationsService from 'services/Publications'

export default function usePublicationDelete (options?: UseMutationOptions) {
  return useMutation<ApiData, ApiError, any>(id => PublicationsService.deleteById(id), options)
}
