import { Avatar, List } from 'antd'
import RenderTimeFromNow from 'components/shared/RenderTimeFromNow'
import useChatContext from 'hooks/useChatContext'
import useChatRooms from 'hooks/useChatRooms'
import useCurrentUser from 'hooks/useCurrentUser'
import { DEFAULT_IMAGE } from 'libs/variables'
import { useEffect, useMemo } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { FormattedMessage } from 'react-intl'
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

  const sender = useMemo(() => {
    const sender = room?.members?.find?.((member: any) => member.id !== currentUser?.id)
    return sender
  }, [room])

  const senderPhotoUrl = useMemo(() => {
    const image = sender?.photo
    const objects: any[] = image?.meta?.objects || []
    const md = objects.find(object => object.id === 'md')
    return md?.url || DEFAULT_IMAGE
  }, [sender])

  return (
    <ChatRoomListItemWrapper
      onClick={handleClick}
      className={active ? 'chatroom-list-item-active' : ''}
      extra={<RenderTimeFromNow timestamp={room?.updatedAt} />}
    >
      <List.Item.Meta
        avatar={<Avatar size='large' src={senderPhotoUrl} />}
        title={sender?.fullName}
        description={<div style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}><span>{room?.lastMessage?.user?.username}</span>: <span>{room?.lastMessage?.message}</span></div>}
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
        loader={<div style={{ textAlign: 'center' }}><FormattedMessage defaultMessage="Loading" />...</div>}
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
