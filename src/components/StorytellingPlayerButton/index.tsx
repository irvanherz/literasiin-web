import { CaretRightFilled, PauseOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import useCurrentUser from 'hooks/useCurrentUser'
import useStorytellingPlayerContext from 'hooks/useStorytellingPlayerContext'
import { useNavigate } from 'react-router-dom'

type StorytellingPlayerButtonProps = {
  storytelling: any
  episode: any
  options: any
}

export default function StorytellingPlayerButton ({ storytelling, episode, options }: StorytellingPlayerButtonProps) {
  const navigate = useNavigate()
  const currentUser = useCurrentUser()
  const ctx = useStorytellingPlayerContext()

  const handlePlay = () => {
    if (!currentUser) {
      navigate('/auth/signin')
    } else ctx?.audio?.play()
  }

  const handleLoad = () => {
    if (!currentUser) {
      navigate('/auth/signin')
    } else ctx.load?.(episode.id, options)
  }

  const isSelected = ctx?.currentEpisodeId === episode?.id
  const isLoading = ctx.status === 'loading' || ctx.playerState?.buffering || false
  if (isSelected) {
    if (ctx.playerState?.status === 'paused') {
      return <Button type='text' icon={<CaretRightFilled />} shape='round' loading={isLoading} onClick={handlePlay}>Play</Button>
    } else if (ctx.playerState?.status === 'playing') {
      return <Button type='text' icon={<PauseOutlined />} shape='round' loading={isLoading} onClick={() => ctx?.audio?.pause()}>Play</Button>
    } else {
      return <Button type='text' icon={<CaretRightFilled />} shape='round' loading={isLoading}>Play</Button>
    }
  } else {
    return <Button type='text' icon={<CaretRightFilled />} shape='round' loading={isLoading} onClick={handleLoad}>Play</Button>
  }
}
