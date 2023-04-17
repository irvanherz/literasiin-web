import { useQuery, UseQueryOptions } from 'react-query'
import FinancesService from 'services/Finances'

export default function useOrders (filter: any, options?: UseQueryOptions) {
  return useQuery<any, any, any>(['finances.orders[]', filter], () => FinancesService.Orders.findMany(filter), options)
}
