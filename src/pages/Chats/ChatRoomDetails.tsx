import { Button, Card, List, Result, Typography } from 'antd'
import useChatContext from 'hooks/useChatContext'
import useChatMessages from 'hooks/useChatMessages'
import useChatRoom from 'hooks/useChatRoom'
import useCurrentUser from 'hooks/useCurrentUser'
import { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import ChatInput from './ChatInput'

const ChatMessageWrapper = styled(List.Item)`
&.chat-message-mine .ant-card {
  background: #e6ffcf;
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

type ChatMessageListProps = { roomId: any}
function ChatMessageList ({ roomId }: ChatMessageListProps) {
  const ctx = useChatContext()
  const currentUser = useCurrentUser()
  const { data: room, meta: roomMeta } = useChatRoom(roomId)
  const { data: messages, meta } = useChatMessages(roomId)

  const handleLoadPrevious = () => {
    const beforeId = meta?.lastId
    ctx.fetchNextMessages(roomId, beforeId)
  }

  useEffect(() => {
    if (ctx.isReady && meta.status === 'idle') {
      ctx.fetchNextMessages(roomId)
    }
  }, [ctx.isReady, meta.status])

  useEffect(() => {
    if (ctx.isReady && roomMeta.status === 'idle') {
      ctx.fetchRoomById(roomId)
    }
  }, [ctx.isReady, roomMeta.status])

  const senderName = useMemo(() => {
    const sender = room?.members?.find((member: any) => member.id !== currentUser?.id)
    return sender?.fullName || 'Unknown'
  }, [room])

  return (
    <>
      <div className='chatroom-details-header'>
        <Typography.Text strong>{senderName}</Typography.Text>
      </div>
      <div className='chatroom-details-body'>
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
  const roomId = +(params?.roomId || 0)

  return (
    <ChatRoomDetailsWrapper>
      {roomId
        ? <ChatMessageList roomId={roomId} />
        : <Result
            status='info'
            title="Chat"
            subTitle='Chaaat'
          />
      }
    </ChatRoomDetailsWrapper>

  )
}
