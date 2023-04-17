import { StarFilled, StarOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
import useCurrentUser from 'hooks/useCurrentUser'
import qs from 'qs'
import { FormattedMessage } from 'react-intl'
import { useMutation } from 'react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import StoriesService from 'services/Stories'

type VoteButtonProps = {
  chapter: any
  context: any
  afterUpdated?: () => void
}
export default function VoteButton ({ chapter, context, afterUpdated }: VoteButtonProps) {
  const currentUser = useCurrentUser()
  const navigate = useNavigate()
  const location = useLocation()
  const chapterId = chapter?.id
  const voter = useMutation(() => StoriesService.Chapters.Readers.vote(chapterId))
  const devoter = useMutation(() => StoriesService.Chapters.Readers.devote(chapterId))

  const handleVote = () => {
    if (!currentUser) navigate('/auth/signin' + qs.stringify({ redirect: location.pathname }, { addQueryPrefix: true }))
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
    return (
      <Tooltip title={<FormattedMessage defaultMessage='Unvote' />}>
        <Button key='vote' shape='circle' onClick={handleDevote} icon={<StarFilled color='yellow' />} />
      </Tooltip>
    )
  } else {
    return (
      <Tooltip title={<FormattedMessage defaultMessage='Vote' />}>
        <Button key='vote' shape='circle' onClick={handleVote} icon={<StarOutlined />} />
      </Tooltip>
    )
  }
}
