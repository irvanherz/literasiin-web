import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import { message } from 'antd'
import classNames from 'classnames'
import RenderTimeFromNow from 'components/shared/RenderTimeFromNow'
import useCurrentUser from 'hooks/useCurrentUser'
import useInfiniteStoryComments from 'hooks/useInfiniteStoryComments'
import { DEFAULT_PHOTO } from 'libs/variables'
import Media from 'models/Media'
import { KeyboardEventHandler, useMemo, useState } from 'react'
import { useMutation } from 'react-query'
import { Link } from 'react-router-dom'
import StoriesService from 'services/Stories'

type CommentInputProps = { chapter: any, afterCreated?: () => void }

function CommentInput ({ chapter, afterCreated }: CommentInputProps) {
  const currentUser = useCurrentUser()
  const storyId = chapter?.storyId
  const chapterId = chapter?.id
  const [comment, setComment] = useState('')
  const creator = useMutation<any, any, any>(payload => StoriesService.Comments.create(payload))

  const avatar = new Media(currentUser?.photo)

  const handleSend = () => {
    if (!comment) return
    const payload = { storyId, chapterId, comment }
    creator.mutate(payload, {
      onSuccess: () => {
        setComment('')
        if (afterCreated) afterCreated()
      },
      onError: (err) => {
        message.error(err?.message)
      }
    })
  }

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSend()
    }
  }

  if (currentUser) {
    return (
      <div className='flex gap-4 p-4 bg-white rounded shadow'>
        <div className='flex-none'>
          <div className='aspect-1 shadow w-8'>
            <img src={avatar.sm?.url || DEFAULT_PHOTO} className='object-cover' />
          </div>
        </div>
        <div className='flex-1 flex gap-2'>
          <div className='flex-1'>
            <input
              className='input input-sm input-bordered w-full'
                // disabled={chapter?.commentStatus === 'disabled'}
              placeholder='Tulis komentar kamu...'
              onKeyDown={handleKeyDown}
              value={comment}
              onChange={e => setComment(e.target.value)}
            />
          </div>
          <div className='flex-none'>
            <button className='btn btn-sm btn-primary' onClick={handleSend}><PaperAirplaneIcon className='w-4'/> Kirim</button>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className='text-center p-4 space-y-2 bg-white rounded shadow'>
        <div>
          <div className='font-bold'>Masuk dulu</div>
          <div className='text-slate-500'>Kamu harus memiliki akun untuk menulis komentar</div>
        </div>
        <div>
          <Link to='/auth/signin' className='btn btn-sm btn-primary'>Masuk</Link>
        </div>
      </div>
    )
  }
}

type CommentProps = { comment: any }

function Comment ({ comment }: CommentProps) {
  const currentUser = useCurrentUser()
  const avatar = new Media(comment.user?.photo)
  const isMine = currentUser && currentUser?.id === comment?.userId

  return (
    <div className={classNames('flex gap-4 p-4 rounded shadow bg-white border', isMine ? 'border-emerald-400' : 'border-white')}>
      <div className='flex-none'>
        <div className='aspect-1 shadow w-8'>
          <img src={avatar.sm?.url || DEFAULT_PHOTO} className='object-cover' />
        </div>
      </div>
      <div className='flex-1'>
        <div className=''>
          <span className='font-bold'>{comment.user?.fullName}</span>
          &nbsp;&middot;&nbsp;
          <span className='text-slate-600'><RenderTimeFromNow timestamp={comment?.createdAt} /></span>
        </div>
        <div className='text-slate-600'>{comment.comment}</div>
      </div>
    </div>
  )
}

type ChapterCommentsProps = { chapter: any }

export default function ChapterComments ({ chapter }: ChapterCommentsProps) {
  const chapterId = chapter?.id
  const { data, refetch, hasNextPage, fetchNextPage } = useInfiniteStoryComments({ chapterId })

  const comments: any[] = useMemo(() => {
    const pages = data?.pages || []
    return pages.reduce((a, c) => {
      a = [...a, ...c.data]
      return a
    }, [])
  }, [data?.pages])

  return (
    <div className='space-y-2'>
      <div>
        <div className='font-black text-slate-700'>Komentar</div>
        <div className='text-slate-500 text-sm'>Berikan tanggapan kamu untuk bab ini</div>
      </div>
      <div>
        <CommentInput chapter={chapter} afterCreated={refetch} />
      </div>
      <div className='space-y-2'>
        {comments.map(comment => <Comment key={comment.id} comment={comment} />)}
      </div>
      <div>
        {hasNextPage && (
          <div className='text-center'>
            <button className='btn btn-sm' onClick={() => fetchNextPage()}>Muat lainnya</button>
          </div>
        )}
      </div>
    </div>
  )
}
