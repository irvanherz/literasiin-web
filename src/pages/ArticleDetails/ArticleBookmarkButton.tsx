import { BookFilled, BookOutlined } from '@ant-design/icons'
import { Button, message, Tooltip } from 'antd'
import useCurrentUser from 'hooks/useCurrentUser'
import qs from 'qs'
import { FormattedMessage } from 'react-intl'
import { useMutation } from 'react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import ArticlesService from 'services/Articles'

type ArticleBookmarkButtonProps = {
  article: any
  context: any
  afterUpdated?: () => void
}
export default function ArticleBookmarkButton ({ article, context, afterUpdated }: ArticleBookmarkButtonProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const currentUser = useCurrentUser()
  const articleId = article?.id
  const bookmarker = useMutation(() => ArticlesService.Readers.bookmark(articleId))
  const unbookmarker = useMutation(() => ArticlesService.Readers.unbookmark(articleId))

  const handleBookmark = () => {
    if (!currentUser) navigate('/auth/signin' + qs.stringify({ redirect: location.pathname }, { addQueryPrefix: true }))
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
    if (!currentUser) navigate('/auth/signin' + qs.stringify({ redirect: location.pathname }, { addQueryPrefix: true }))
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
      <Tooltip title={<FormattedMessage defaultMessage='Remove from reading list'/>}>
        <Button type='ghost' icon={<BookFilled />} onClick={handleUnbookmark}><span>{article?.meta?.numBookmarks || 0}</span></Button>
      </Tooltip>
    )
  } else {
    return (
      <Tooltip title={<FormattedMessage defaultMessage='Add to reading list'/>}>
        <Button type='ghost' icon={<BookOutlined />} onClick={handleBookmark}><span>{article?.meta?.numBookmarks || 0}</span></Button>
      </Tooltip>
    )
  }
}
