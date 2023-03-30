import { BookFilled, BookOutlined } from '@ant-design/icons'
import { Button, message, Tooltip } from 'antd'
import useCurrentUser from 'hooks/useCurrentUser'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import StoriesService from 'services/Stories'

type BookmarkButtonProps = {
  story: any
  context: any
  afterUpdated?: () => void
}
export default function BookmarkButton ({ story, context, afterUpdated }: BookmarkButtonProps) {
  const navigate = useNavigate()
  const currentUser = useCurrentUser()
  const storyId = story?.id
  const bookmarker = useMutation(() => StoriesService.Readers.bookmark(storyId))
  const unbookmarker = useMutation(() => StoriesService.Readers.unbookmark(storyId))

  const handleBookmark = () => {
    if (!currentUser) {
      navigate('/auth/signin')
      return
    }
    bookmarker.mutate(undefined, {
      onSuccess: () => {
        afterUpdated && afterUpdated()
      },
      onError: (err: any) => {
        message.error(err?.message)
      }
    })
  }

  const handleUnbookmark = () => {
    if (!currentUser) {
      navigate('/auth/signup')
      return
    }
    unbookmarker.mutate(undefined, {
      onSuccess: () => {
        afterUpdated && afterUpdated()
      },
      onError: (err: any) => {
        message.error(err?.message)
      }
    })
  }
  if (context?.hasBookmarked) {
    return (
      <Tooltip key='bookmark' title='Remove from reading list'>
        <Button loading={unbookmarker.isLoading} onClick={handleUnbookmark} key='bookmark' shape='circle' icon={<BookFilled />} />
      </Tooltip>
    )
  } else {
    return (
      <Tooltip key='bookmark' title='Save to reading list'>
        <Button loading={bookmarker.isLoading} onClick={handleBookmark} key='bookmark' shape='circle' icon={<BookOutlined />} />
      </Tooltip>
    )
  }
}
