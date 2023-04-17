import { Avatar, Button, Card, Input, List, message, Space, Typography } from 'antd'
import RenderTimeFromNow from 'components/shared/RenderTimeFromNow'
import useCurrentUser from 'hooks/useCurrentUser'
import useInfiniteStoryComments from 'hooks/useInfiniteStoryComments'
import { DEFAULT_PHOTO } from 'libs/variables'
import Media from 'models/Media'
import qs from 'qs'
import { useMemo, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useMutation } from 'react-query'
import { Link, useLocation } from 'react-router-dom'
import StoriesService from 'services/Stories'
import styled from 'styled-components'

type CommentInputProps = { story: any, chapter: any, afterCreated?: () => void }

function CommentInput ({ story, chapter, afterCreated }: CommentInputProps) {
  const location = useLocation()
  const currentUser = useCurrentUser()
  const storyId = story?.id
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

  return currentUser
    ? (
      <Card size='small'>
        <Card.Meta
          avatar={<Avatar src={avatar.sm?.url || DEFAULT_PHOTO} />}
          title="Write your comment"
          description={
            <div style={{ display: 'flex', gap: 4 }}>
              <div style={{ flex: 1 }}>
                <Input placeholder='Comment...' onPressEnter={handleSend} value={comment} onChange={e => setComment(e.target.value)}/>
              </div>
              <div style={{ flex: 0 }}>
                <Button onClick={handleSend} loading={creator.isLoading} disabled={!comment}><FormattedMessage defaultMessage='Send' /></Button>
              </div>
            </div>
          }
        />
      </Card>
      )
    : (
      <Card size='small'>
        <Space direction='vertical' style={{ width: '100%', textAlign: 'center' }}>
          <Typography.Text strong><FormattedMessage defaultMessage='Please signin to post comment' /></Typography.Text>
          <div>
            <Link to={`/auth/signin${qs.stringify({ redirect: location.pathname }, { addQueryPrefix: true })}`}>
              <Button type='primary'><FormattedMessage defaultMessage='Sign in' /></Button>
            </Link>
          </div>
        </Space>
      </Card>
      )
}

const StyledCommentCard = styled(Card)`
&.comment-mine {
  background: #e6ffcf;
}
`
type CommentProps = { comment: any }

function Comment ({ comment }: CommentProps) {
  const currentUser = useCurrentUser()
  const avatar = new Media(comment.user?.photo)
  const isMine = currentUser && currentUser?.id === comment?.userId

  return (
    <StyledCommentCard size='small' className={isMine ? 'comment-mine' : ''}>
      <Space style={{ width: '100%', justifyContent: 'space-between' }}>
        <Card.Meta
          avatar={<Avatar src={avatar.sm?.url || DEFAULT_PHOTO} />}
          title={comment.user?.fullName}
          description={comment.comment}
        />
        <Typography.Text type='secondary'><RenderTimeFromNow timestamp={comment?.createdAt} /></Typography.Text>
      </Space>
    </StyledCommentCard>
  )
}

const StyledList = styled(List)`
.ant-list-header {
  border: none;
}
.ant-list-footer {
  text-align: center;
}
`

type CommentsProps = { story: any, chapter: any, parent: any}

function Comments ({ story, chapter, parent }: CommentsProps) {
  const storyId = story?.id
  const chapterId = chapter?.id
  const { data, refetch, hasNextPage, fetchNextPage } = useInfiniteStoryComments({ storyId, chapterId })

  const comments: any[] = useMemo(() => {
    const pages = data?.pages || []
    return pages.reduce((a, c) => {
      a = [...a, ...c.data]
      return a
    }, [])
  }, [data?.pages])

  return (
    <StyledList
      bordered={!!parent}
      header={<CommentInput story={story} chapter={chapter} afterCreated={refetch} />}
      grid={{ gutter: 16, column: 1 }}
      dataSource={comments}
      renderItem={comment => (
        <List.Item>
          <Comment comment={comment} />
        </List.Item>
      )}
      footer={hasNextPage && (
        <Button onClick={() => fetchNextPage()}><FormattedMessage defaultMessage='Load more' /></Button>
      )}
    />
  )
}

type StoryChapterCommentsProps = { story: any, chapter: any }
export default function StoryChapterComments ({ story, chapter }: StoryChapterCommentsProps) {
  return (
    <Card
      title={<FormattedMessage defaultMessage='Comments' />}
    >
      <Comments story={story} chapter={chapter} parent={null}/>
    </Card>
  )
}
