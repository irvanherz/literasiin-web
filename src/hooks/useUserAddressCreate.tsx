import ApiData from 'models/ApiData'
import ApiError from 'models/ApiError'
import { useMutation, UseMutationOptions } from 'react-query'
import UsersService from 'services/Users'

export default function useUserAddressCreate (options?: UseMutationOptions) {
  return useMutation<ApiData, ApiError, any>(payload => UsersService.Addresses.create(payload), options)
}
