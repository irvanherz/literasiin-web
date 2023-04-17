import { useQuery, UseQueryOptions } from 'react-query'
import WalletsService from 'services/Wallets'

export default function useWalletTransactions (filter: any, options?: UseQueryOptions) {
  return useQuery<any, any, any>(['wallets.transactions[]', filter], () => WalletsService.Transactions.findMany(filter), options)
}
