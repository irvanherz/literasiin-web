import { BookmarkIcon as BookmarkIconOutline } from '@heroicons/react/24/outline'
import { BookmarkIcon as BookmarkIconSolid } from '@heroicons/react/24/solid'
import { Tooltip, message } from 'antd'
import useCurrentUser from 'hooks/useCurrentUser'
import qs from 'qs'
import { useMutation } from 'react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import StoriesService from 'services/Stories'

type BookmarkButtonProps = {
  story: any
  context: any
  afterUpdated?: () => void
}
export default function BookmarkButton ({ story, context, afterUpdated }: BookmarkButtonProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const currentUser = useCurrentUser()
  const storyId = story?.id
  const bookmarker = useMutation(() => StoriesService.Readers.bookmark(storyId))
  const unbookmarker = useMutation(() => StoriesService.Readers.unbookmark(storyId))
  const executor = context?.hasBookmarked ? unbookmarker : bookmarker

  const handleToggleBookmark = () => {
    if (!currentUser) {
      if (!currentUser) navigate('/auth/signin' + qs.stringify({ redirect: location.pathname }, { addQueryPrefix: true }))
      return
    }
    executor.mutate(undefined, {
      onSuccess: () => {
        afterUpdated && afterUpdated()
      },
      onError: (err: any) => {
        message.error(err?.message)
      }
    })
  }
  return (
    <Tooltip
      title={context?.hasBookmarked ? 'Hapus dari daftar bacaan' : 'Masukkan ke daftar bacaan'}
    >
      {context?.hasBookmarked
        ? <button className='btn btn-sm btn-ghost' onClick={handleToggleBookmark}><BookmarkIconSolid className='w-4' /></button>
        : <button className='btn btn-sm btn-ghost' onClick={handleToggleBookmark}><BookmarkIconOutline className='w-4' /></button>
      }
    </Tooltip>
  )
}
