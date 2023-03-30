import { StarFilled, StarOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useMutation } from 'react-query'
import StoriesService from 'services/Stories'

type VoteButtonProps = {
  chapter: any
  context: any
  afterUpdated?: () => void
}
export default function VoteButton ({ chapter, context, afterUpdated }: VoteButtonProps) {
  const chapterId = chapter?.id
  const voter = useMutation(() => StoriesService.Chapters.Readers.vote(chapterId))
  const devoter = useMutation(() => StoriesService.Chapters.Readers.devote(chapterId))

  const handleVote = () => {
    voter.mutate(undefined, {
      onSuccess: () => {
        afterUpdated && afterUpdated()
      }
    })
  }

  const handleDevote = () => {
    devoter.mutate(undefined, {
      onSuccess: () => {
        afterUpdated && afterUpdated()
      }
    })
  }

  if (context?.vote) {
    return <Button key='vote' shape='circle' onClick={handleDevote} icon={<StarFilled color='yellow' />} />
  } else {
    return <Button key='vote' shape='circle' onClick={handleVote} icon={<StarOutlined />} />
  }
}
