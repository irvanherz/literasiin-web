import { useQuery } from 'react-query'
import StorytellingsService from 'services/Storytellings'

export default function useStorytellingAudienceContext (storytellingId: number) {
  return useQuery<any, any, any>(`storytellings[${storytellingId}].audiences.context`, () => StorytellingsService.Audiences.findContextById(storytellingId), { enabled: !!storytellingId })
}
