import { theme } from 'antd'
import Layout from 'components/Layout'
import RouteGuard from 'components/RouteGuard'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'
import ChatRoomDetails from './ChatRoomDetails'
import ChatRoomList from './ChatRoomList'

const Wrapper = styled.div`
width: 100%;
display: flex;
border-width: 0px 1px;
border-style: solid;
.chat-rooms {
  flex: 1;
  border-right: 1px solid;
}
.chat-details {
  flex: 2;
}
`

export default function Chats () {
  const { token } = theme.useToken()
  return (
    <RouteGuard require='authenticated'>
      <Layout.Chatbox>
        <Wrapper style={{ borderColor: token.colorSplit }}>
          <div className='chat-rooms' style={{ borderColor: token.colorSplit }}>
            <ChatRoomList />
          </div>
          <div className='chat-details'>
            <ChatRoomDetails />
          </div>
        </Wrapper>
        <Helmet>
          <title>Chats</title>
        </Helmet>
      </Layout.Chatbox>
    </RouteGuard>

  )
}
