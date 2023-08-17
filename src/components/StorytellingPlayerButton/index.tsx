import { PauseOutlined, PlayCircleFilled } from '@ant-design/icons'
import { Button } from 'antd'
import useStorytellingPlayerContext from 'hooks/useStorytellingPlayerContext'

type StorytellingPlayerButtonProps = {
  storytelling: any
  episode: any
}

export default function StorytellingPlayerButton ({ storytelling, episode }: StorytellingPlayerButtonProps) {
  const ctx = useStorytellingPlayerContext()
  const isLoaded = ctx.currentEpisodeId === episode.id

  const handleLoad = () => ctx.load?.(storytelling.id, episode.id)

  const renderLoadedButton = () => {
    console.log(ctx)

    const isLoading = ctx.status === 'loading' || ctx.playerState?.buffering || false
    if (ctx.playerState?.status === 'idle') {
      return <Button icon={<PlayCircleFilled />} loading={isLoading} shape='circle' />
    } else if (ctx.playerState?.status === 'paused') {
      return <Button icon={<PlayCircleFilled />} loading={isLoading} shape='circle' onClick={() => ctx.audio?.play()} />
    } else if (ctx.playerState?.status === 'playing') {
      return <Button icon={<PauseOutlined />} loading={isLoading} shape='circle' onClick={() => ctx.audio?.pause()} />
    } else {
      return null
    }
  }

  return isLoaded
    ? renderLoadedButton()
    : <Button onClick={handleLoad} icon={<PlayCircleFilled />} shape='circle' />
}
