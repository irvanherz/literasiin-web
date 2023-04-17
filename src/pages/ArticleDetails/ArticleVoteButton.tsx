import { CaretDownFilled, CaretUpFilled } from '@ant-design/icons'
import { Button, Space, Tooltip } from 'antd'
import useCurrentUser from 'hooks/useCurrentUser'
import qs from 'qs'
import { useMemo } from 'react'
import { FormattedMessage } from 'react-intl'
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
    if (context?.vote === 1) return <div><FormattedMessage defaultMessage='You have upvoted this post'/></div>
    else if (context?.vote === -1) return <div><FormattedMessage defaultMessage='You have downvoted this post'/></div>
    else return null
  }, [context])

  return (
    <Space>
      <Tooltip title={<FormattedMessage defaultMessage='Upvote this article' />} >
        <Button type={context?.vote === 1 ? 'primary' : 'default'} onClick={handleToggleUpvote} icon={<CaretUpFilled />}></Button>
      </Tooltip>
      <Tooltip title={<FormattedMessage defaultMessage='Downvote this article'/>} >
        <Button type={context?.vote === -1 ? 'primary' : 'default'} danger={context?.vote === -1} onClick={handleToggleDownvote} icon={<CaretDownFilled />}></Button>
      </Tooltip>
      {label}
    </Space>
  )
}
