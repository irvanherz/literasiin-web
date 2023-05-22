import ApiData from 'models/ApiData'
import ApiError from 'models/ApiError'
import { useMutation, UseMutationOptions } from 'react-query'
import UsersService from 'services/Users'

export default function useUserAddressDelete (id: number, options?: UseMutationOptions) {
  return useMutation<ApiData, ApiError, void>(() => UsersService.Addresses.deleteById(id), options)
}
