import { MenuOutlined } from '@ant-design/icons'
import { Button, Card, Dropdown, List, Result, Typography } from 'antd'
import useChatContext from 'hooks/useChatContext'
import useChatMessages from 'hooks/useChatMessages'
import useChatRoom from 'hooks/useChatRoom'
import useCurrentUser from 'hooks/useCurrentUser'
import { useEffect, useMemo, useRef } from 'react'
import { FormattedMessage } from 'react-intl'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import ChatInput from './ChatInput'

const ChatMessageWrapper = styled(List.Item)`
text-align: left;
.ant-card {
  display: inline-block;
  max-width: 500px;
}
&.chat-message-mine {
  text-align: right;
  .ant-card {
    background: #e6ffcf;
  }
}
`

type ChatMessageProps = {
  message: any
}

function ChatMessage ({ message }: ChatMessageProps) {
  const currentUser = useCurrentUser()

  return (
    <ChatMessageWrapper className={currentUser?.id === message.userId ? 'chat-message-mine' : ''}>
      <Card size='small'>
        <Card.Meta
          title={message.user.fullName}
          description={message.message}
        />
      </Card>
    </ChatMessageWrapper>
  )
}

type ChatMessageListProps = { room: any}
function ChatMessageList ({ room }: ChatMessageListProps) {
  const ctx = useChatContext()
  const navigate = useNavigate()
  const currentUser = useCurrentUser()
  const containerRef = useRef<HTMLDivElement>(null)
  const roomId = room?.id
  const { data: messages, meta } = useChatMessages(roomId)

  const handleLoadPrevious = () => {
    const after = meta?.after
    ctx.fetchNextMessages(roomId, after)
  }

  const sender = useMemo(() => {
    return room?.members?.find((member: any) => member.id !== currentUser?.id)
  }, [room])

  useEffect(() => {
    if (ctx.isReady && meta.status === 'idle') {
      ctx.fetchNextMessages(roomId)
    }
  }, [ctx.isReady, meta.status])

  useEffect(() => {
    const { scrollHeight } = containerRef.current as HTMLDivElement
    containerRef.current?.scrollTo({ behavior: 'smooth', top: scrollHeight })
  }, [messages, containerRef.current])

  const handleViewProfile = () => {
    navigate(`/users/${sender?.username}`)
  }

  return (
    <>
      <div className='chatroom-details-header'>
        <div className='chatroom-details-header-1'>
          <Typography.Text strong>{sender?.fullName}</Typography.Text>
        </div>
        <div className='chatroom-details-header-2'>
          <Dropdown
            menu={{ items: [{ key: 'a', label: 'View profile', onClick: handleViewProfile }] }}
          >
            <Button type='ghost' icon={<MenuOutlined />}></Button>
          </Dropdown>
        </div>
      </div>
      <div className='chatroom-details-body' ref={containerRef}>
        <div className='chatroom-details-body-inner'>
          {meta?.numItems > messages.length && (
            <div style={{ textAlign: 'center', paddingBottom: 16 }}>
              <Button onClick={handleLoadPrevious}>Load more</Button>
            </div>
          )}
          <List
            style={{}}
            grid={{ column: 1, gutter: 16 }}
            dataSource={messages}
            renderItem={message => <ChatMessage message={message} />}
            />
        </div>
      </div>
      <div className='chatroom-details-input'>
        <ChatInput room={room} context={ctx} />
      </div>
    </>
  )
}

const ChatRoomDetailsWrapper = styled.div`
display: flex;
flex-direction: column;
height: 100%;
.chatroom-details-header {
  flex: 0;
  padding: 32px 16px;
  border-bottom: 1px solid rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  &-1 {
    flex: 1;
  }
  &-2{
    flex: 0;
  }
}
.chatroom-details-body {
  flex: 1;
  overflow-y: auto;
  position: relative;
  &-inner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 16px;
  }
}
.chatroom-details-input {
  flex: 0;
  padding: 32px 16px;
  border-top: 1px solid rgba(0,0,0,0.1);
}
`
export default function ChatRoomDetails () {
  const params = useParams()
  const ctx = useChatContext()
  const roomId = +(params?.roomId || 0)
  const { data: room, meta: roomMeta } = useChatRoom(roomId)

  useEffect(() => {
    if (ctx.isReady && roomMeta.status === 'idle') {
      ctx.fetchRoomById(roomId)
    }
  }, [ctx.isReady, roomMeta.status])

  return (
    <ChatRoomDetailsWrapper>
      {room
        ? <ChatMessageList room={room} />
        : <Result
            status='info'
            title={<FormattedMessage defaultMessage="Chat" />}
            subTitle={<FormattedMessage defaultMessage='Your chats will be shown here' />}
          />
      }
    </ChatRoomDetailsWrapper>

  )
}
