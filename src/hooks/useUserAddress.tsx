import { useQuery } from 'react-query'
import UsersService from 'services/Users'

export default function useUserAddress (addressId: number, params?: any) {
  return useQuery<any, any, any>(`articles[${addressId}]`, () => UsersService.Addresses.findById(addressId, params), { enabled: !!addressId })
}
