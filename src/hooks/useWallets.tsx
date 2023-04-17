import { useQuery, UseQueryOptions } from 'react-query'
import WalletsService from 'services/Wallets'

export default function useWallets (filter: any, options?: UseQueryOptions) {
  return useQuery<any, any, any>(['wallets[]', filter], () => WalletsService.findMany(filter), options)
}
