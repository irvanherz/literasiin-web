import { useQuery } from 'react-query'
import KbsService from 'services/Kbs'

export default function useKbCategory (categoryId: number) {
  return useQuery<any, any, any>(`kbs.categories[${categoryId}]`, () => KbsService.Categories.findById(categoryId), { enabled: !!categoryId })
}
