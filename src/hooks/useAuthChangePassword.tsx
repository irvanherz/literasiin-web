import ApiData from 'models/ApiData'
import ApiError from 'models/ApiError'
import { useMutation, UseMutationOptions } from 'react-query'
import AuthService from 'services/Auth'

export default function useAuthChangePassword (options?: UseMutationOptions) {
  return useMutation<ApiData, ApiError, any>(payload => AuthService.changePassword(payload), options)
}
