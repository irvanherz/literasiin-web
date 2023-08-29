import { createContext } from 'react'

export type PlayerState = {
  status: string
  buffering: boolean
  time: number
  duration: number
}

export type StorytellingPlayerContextType = {
  audio?: HTMLAudioElement,
  status?: string
  data?: any
  currentEpisodeId?: number,
  playerState?: PlayerState,
  load?: (episodeId: number, options:any) => void
}

const StorytellingPlayerContext = createContext<StorytellingPlayerContextType>({
  currentEpisodeId: undefined,
  playerState: {
    status: 'idle',
    buffering: false,
    duration: 0,
    time: 0
  },
  load: () => {}
})

export default StorytellingPlayerContext
