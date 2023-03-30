import Layout from 'components/Layout'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'
import ChatRoomDetails from './ChatRoomDetails'
import ChatRoomList from './ChatRoomList'

const Wrapper = styled.div`
width: 100%;
display: flex;
border-left: 1px solid rgba(0,0,0,0.1);
border-right: 1px solid rgba(0,0,0,0.1);
background: #FFF;
.chat-rooms {
  flex: 1;
  border-right: 1px solid rgba(0,0,0,0.1);
}
.chat-details {
  flex: 2;
}
`

export default function Chats () {
  return (
    <Layout.Chatbox>
      <Wrapper>
        <div className='chat-rooms'>
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
  )
}
