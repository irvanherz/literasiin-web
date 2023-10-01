import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import { Tooltip } from 'antd'
import useCurrentUser from 'hooks/useCurrentUser'
import qs from 'qs'
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
  const executor = context?.vote ? devoter : voter

  const handleToggleVote = () => {
    if (!currentUser) navigate('/auth/signin' + qs.stringify({ redirect: location.pathname }, { addQueryPrefix: true }))
    executor.mutate(undefined, {
      onSuccess: () => {
        afterUpdated && afterUpdated()
      }
    })
  }

  return (
    <Tooltip title={context?.vote ? 'Batal suka' : 'Suka'}>
      {context?.vote
        ? <button className='btn btn-sm btn-ghost' onClick={handleToggleVote}><HeartIconSolid className='w-4' /></button>
        : <button className='btn btn-sm btn-ghost' onClick={handleToggleVote}><HeartIconOutline className='w-4' /></button>
      }
    </Tooltip>
  )
}
