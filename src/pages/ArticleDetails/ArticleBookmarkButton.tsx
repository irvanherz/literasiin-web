import { BookmarkIcon as BookmarkIconOutline } from '@heroicons/react/24/outline'
import { BookmarkIcon as BookmarkIconSolid } from '@heroicons/react/24/solid'
import { Tooltip, message } from 'antd'
import useCurrentUser from 'hooks/useCurrentUser'
import qs from 'qs'
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
  const executor = context?.hasBookmarked ? unbookmarker : bookmarker

  const handleToggleBookmark = () => {
    if (!currentUser) navigate('/auth/signin' + qs.stringify({ redirect: location.pathname }, { addQueryPrefix: true }))
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
    <Tooltip title={context?.hasBookmarked ? 'Hapus dari daftar bacaan' : 'Simpan ke daftar bacaan'}>
      <button className='btn btn-sm' onClick={handleToggleBookmark}>
        {context?.hasBookmarked ? <BookmarkIconSolid className='w-4' /> : <BookmarkIconOutline className='w-4' />} {article?.meta?.numBookmarks || 0}
      </button>
    </Tooltip>
  )
}
