import ApiData from 'models/ApiData'
import ApiError from 'models/ApiError'
import { useMutation, UseMutationOptions } from 'react-query'
import MediaService from 'services/Media'

export default function useMediaDelete (options?: UseMutationOptions) {
  return useMutation<ApiData, ApiError, any>(id => MediaService.deleteById(id), options)
}
