import { Avatar, List } from 'antd'
import dayjs from 'dayjs'
import useChatContext from 'hooks/useChatContext'
import useChatRooms from 'hooks/useChatRooms'
import useCurrentUser from 'hooks/useCurrentUser'
import { useEffect, useMemo } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'

const ChatRoomListItemWrapper = styled(List.Item)`
padding: 16px !important;
cursor: pointer;
:hover {
  background rgba(0,0,0,0.05);
}
.ant-list-item-meta-title {
  margin: 0;
}
&.chatroom-list-item-active {
  background rgba(0,0,0,0.05);
}
`

type ChatRoomListItemProps = {
  room: any
  active?: boolean
}

function ChatRoomListItem ({ room, active }:ChatRoomListItemProps) {
  const currentUser = useCurrentUser()
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/chats/${room.id}`, { replace: true })
  }

  const senderName = useMemo(() => {
    const sender = room.members.find((member: any) => member.id !== currentUser?.id)
    return sender?.fullName || 'Unknown'
  }, [room])

  return (
    <ChatRoomListItemWrapper
      onClick={handleClick}
      className={active ? 'chatroom-list-item-active' : ''}
      extra={dayjs(room.updatedAt).fromNow()}
    >
      <List.Item.Meta
        avatar={<Avatar size='large' />}
        title={senderName}
        description={'Last message'}
      />
    </ChatRoomListItemWrapper>

  )
}

const ChatRoomListWrapper = styled.div`

`
export default function ChatRoomList () {
  const params = useParams()
  const roomId = +(params?.roomId || 0)
  const ctx = useChatContext()
  const { data, meta } = useChatRooms()

  useEffect(() => {
    if (ctx.isReady && meta.status === 'idle') {
      ctx.fetchNextRooms()
    }
  }, [ctx.isReady, meta.status])

  return (
    <ChatRoomListWrapper id='chatroom-list-wrapper'>
      <InfiniteScroll
        dataLength={1}
        next={() => {}}
        hasMore={false}
        loader={<div style={{ textAlign: 'center' }}>Loading...</div>}
        scrollableTarget="chatroom-list-wrapper"
      >
        <List
          dataSource={data}
          renderItem={room => <ChatRoomListItem room={room} active={room.id === roomId} />}
        />
      </InfiniteScroll>
    </ChatRoomListWrapper>

  )
}
