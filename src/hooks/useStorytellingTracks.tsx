import { useQuery } from 'react-query'
import StorytellingsService from 'services/Storytellings'

export default function useStorytellingTracks (storytellingId: number, params?: any) {
  return useQuery<any, any, any>(`storytellings[${storytellingId}].tracks`, () => StorytellingsService.findTracksById(storytellingId, params), { enabled: !!storytellingId })
}
