import { CustomerServiceOutlined } from '@ant-design/icons'
import { FloatButton } from 'antd'
import useStorytellingEpisodeTrack from 'hooks/useStorytellingEpisodeTrack'
import { ReactNode, useEffect, useRef, useState } from 'react'
import { useMutation } from 'react-query'
import StorytellingsService from 'services/Storytellings'
import StorytellingPlayerContext, { PlayerState } from './StorytellingPlayerContext'

type StorytellingPlayerContextProviderProps = {
  children: ReactNode
}

export default function StorytellingPlayerContextProvider ({ children }: StorytellingPlayerContextProviderProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [options, setOptions] = useState({})
  const [currentEpisodeId, setCurrentEpisodeId] = useState(0)
  const [playerState, setPlayerState] = useState<PlayerState | undefined>({ status: 'idle', buffering: false, duration: 0, time: 0 })
  const { status, data } = useStorytellingEpisodeTrack(currentEpisodeId || 0, options)
  const track = data?.data
  const mediaUrl = track?.current?.media?.meta?.objects?.[0]?.url

  const tracker = useMutation<any, any, any>(episodeId => StorytellingsService.Episodes.Audiences.track(episodeId))

  const handleLoad = (episodeId: number, options: any = {}) => {
    if (audioRef.current) {
      audioRef.current?.pause() // Pause the current audio
      audioRef.current.currentTime = 0
    }
    setOptions(options)
    setCurrentEpisodeId(episodeId)
  }

  useEffect(() => {
    const episodeId = track?.current?.id
    if (!episodeId) return
    tracker.mutate(episodeId)
  }, [track?.current?.id])

  const handleChangePlayerState = (st: any) => setPlayerState({ ...playerState, ...st })

  const handleEnded = () => {
    if (track?.next) {
      setCurrentEpisodeId(track.next.id)
    } else {
      setCurrentEpisodeId(0)
    }
  }

  return (
    <StorytellingPlayerContext.Provider
      value={{
        audio: audioRef.current!,
        status,
        data: track,
        playerState,
        load: handleLoad,
        currentEpisodeId
      }}
    >
      {children}
      <audio
        autoPlay
        ref={audioRef}
        src={mediaUrl}
        onPlay={() => handleChangePlayerState({ status: 'playing' })}
        onPause={() => handleChangePlayerState({ status: 'paused' })}
        onEnded={handleEnded}
        onWaiting={() => handleChangePlayerState({ buffering: true })}
        onCanPlayThrough={() => handleChangePlayerState({ buffering: false })}
      />
      {track && (
        <FloatButton
          shape='square'
          icon={<CustomerServiceOutlined />}
          tooltip={
            <div>
              <div style={{ fontWeight: 'bold' }}>{track?.current?.storytelling?.title} - {track?.current?.title}</div>
            </div>
            }
        />

      )}

    </StorytellingPlayerContext.Provider>
  )
}
