import { CustomerServiceOutlined } from '@ant-design/icons'
import { FloatButton } from 'antd'
import useStorytellingTracks from 'hooks/useStorytellingTracks'
import { ReactNode, useMemo, useRef, useState } from 'react'
import StorytellingPlayerContext, { PlayerState } from './StorytellingPlayerContext'

type StorytellingPlayerContextProviderProps = {
  children: ReactNode
}

export default function StorytellingPlayerContextProvider ({ children }: StorytellingPlayerContextProviderProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [currentStorytellingId, setCurrentStorytellingId] = useState(0)
  const [currentEpisodeId, setCurrentEpisodeId] = useState(0)
  const [playerState, setPlayerState] = useState<PlayerState | undefined>({ status: 'idle', buffering: false, duration: 0, time: 0 })
  const { status, data: dataTrack } = useStorytellingTracks(currentStorytellingId || 0)

  const handleLoad = (storytellingId: number, episodeId: number) => {
    console.log(storytellingId, episodeId)

    if (audioRef.current) {
      audioRef.current?.pause() // Pause the current audio
      audioRef.current.currentTime = 0
    }
    setCurrentStorytellingId(storytellingId)
    setCurrentEpisodeId(episodeId)
  }

  const data = dataTrack?.data

  const currentlyPlaying = useMemo(() => {
    const selectedEpisode = (data?.episodes || []).find((ep: any) => ep.id === currentEpisodeId)
    if (!selectedEpisode) return null
    const nextEpisode = data.episodes.find((ep: any) => ep.id > selectedEpisode.id)

    const mediaUrl = selectedEpisode.media?.meta?.objects?.[0]?.url
    return {
      storytelling: data.storytelling,
      episode: selectedEpisode,
      nextEpisode,
      mediaUrl
    }
  }, [data, currentEpisodeId])

  console.log(currentlyPlaying)

  const handleChangePlayerState = (st: any) => setPlayerState({ ...playerState, ...st })

  const handleEnded = () => {
    if (currentlyPlaying?.nextEpisode) {
      setCurrentEpisodeId(currentlyPlaying.nextEpisode.id)
    } else {
      setCurrentStorytellingId(0)
      setCurrentEpisodeId(0)
    }
  }

  return (
    <StorytellingPlayerContext.Provider
      value={{
        audio: audioRef.current!,
        status,
        data,
        playerState,
        load: handleLoad,
        currentStorytellingId,
        currentEpisodeId,
        currentlyPlaying
      }}
    >
      {children}
      <audio
        autoPlay
        ref={audioRef}
        src={currentlyPlaying?.mediaUrl}
        onPlay={() => handleChangePlayerState({ status: 'playing' })}
        onPause={() => handleChangePlayerState({ status: 'paused' })}
        onEnded={handleEnded}
        onWaiting={() => handleChangePlayerState({ buffering: true })}
        onCanPlayThrough={() => handleChangePlayerState({ buffering: false })}
      />
      {currentlyPlaying && (
        <FloatButton
          shape='square'
          icon={<CustomerServiceOutlined />}
          tooltip={
            <div>
              <div style={{ fontWeight: 'bold' }}>{currentlyPlaying.storytelling.title} - {currentlyPlaying.episode.title}</div>
            </div>
            }
        />

      )}

    </StorytellingPlayerContext.Provider>
  )
}
