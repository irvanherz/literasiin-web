import { useQuery } from 'react-query'
import StorytellingsService from 'services/Storytellings'

export default function useStorytelling (storytellingId: number, params?: any) {
  return useQuery<any, any, any>(`storytellings[${storytellingId}]`, () => StorytellingsService.findById(storytellingId, params), { enabled: !!storytellingId })
}
