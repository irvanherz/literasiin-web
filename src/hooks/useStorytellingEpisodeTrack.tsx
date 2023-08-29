import { useQuery } from 'react-query'
import StorytellingsService from 'services/Storytellings'

export default function useStorytellingEpisodeTrack (episodeId: number, params?: any) {
  return useQuery<any, any, any>(`storytellings.episodes[${episodeId}].track`, () => StorytellingsService.Episodes.findTrackById(episodeId, params), { enabled: !!episodeId })
}
