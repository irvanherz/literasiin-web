import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/24/solid'
import classNames from 'classnames'
import useCurrentUser from 'hooks/useCurrentUser'
import qs from 'qs'
import { useMemo } from 'react'
import { useMutation } from 'react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import ArticlesService from 'services/Articles'

type ArticleVoteButtonProps = {
  article: any
  context: any
  afterUpdated?: () => void
}
export default function ArticleVoteButton ({ article, context, afterUpdated }: ArticleVoteButtonProps) {
  const currentUser = useCurrentUser()
  const navigate = useNavigate()
  const location = useLocation()
  const articleId = article?.id
  const voter = useMutation<any, any, any>((vote) => ArticlesService.Readers.vote(articleId, vote))

  const handleVote = (vote: number) => {
    if (!currentUser) navigate('/auth/signin' + qs.stringify({ redirect: location.pathname }, { addQueryPrefix: true }))
    voter.mutate(vote, {
      onSuccess: () => {
        afterUpdated && afterUpdated()
      }
    })
  }

  const handleToggleUpvote = () => {
    const vote = context?.vote === 1 ? 0 : 1
    handleVote(vote)
  }

  const handleToggleDownvote = () => {
    const vote = context?.vote === -1 ? 0 : -1
    handleVote(vote)
  }

  const label = useMemo(() => {
    if (context?.vote === 1) return <div className='font-bold'>Kamu memberi reaksi positif artikel ini</div>
    else if (context?.vote === -1) return <div className='font-bold'>Kamu memberi reaksi negatif artikel ini</div>
    else return <div className='text-slate-400'>Kamu belum memberikan nilai</div>
  }, [context])

  return (
    <div className='inline-flex items-center gap-2'>
      <button className={classNames('btn btn-sm btn-circle', context?.vote === 1 ? 'btn-primary' : '')} onClick={handleToggleUpvote}><ArrowUpIcon className='w-4' /></button>
      <button className={classNames('btn btn-sm btn-circle', context?.vote === -1 ? 'btn-error' : '')} onClick={handleToggleDownvote}><ArrowDownIcon className='w-4' /></button>
      <span>{label}</span>
    </div>
  )
}
