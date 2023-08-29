import ApiData from 'models/ApiData'
import ApiError from 'models/ApiError'
import { useMutation, UseMutationOptions } from 'react-query'
import GeneralService from 'services/General'

export default function useGeneralUserMessageCreate (options?: UseMutationOptions) {
  return useMutation<ApiData, ApiError, any>(payload => GeneralService.UserMessages.create(payload), options)
}
