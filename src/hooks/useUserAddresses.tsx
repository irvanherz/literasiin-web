import { useQuery, UseQueryOptions } from 'react-query'
import UsersService from 'services/Users'

export default function useUserAddresses (filter: any, options?: UseQueryOptions) {
  return useQuery<any, any, any>(['users.addresses[]', filter], () => UsersService.Addresses.findMany(filter), options)
}
