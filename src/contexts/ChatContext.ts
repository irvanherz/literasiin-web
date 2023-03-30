import { createContext } from 'react'
import { Socket } from 'socket.io-client'

export type ChatState = {
  roomById: any
  roomIds: any[]
  messageById: any
  messageIdsByRoomId: any
  metaByKey: any
}

export type ChatContextType = {
  isReady: boolean
  socket?: Socket
  state: ChatState
  sendMessage: (payload: any) => void
  fetchNextRooms: (afterId?: number) => void
  fetchRoomById: (id: number) => void,
  fetchNextMessages: (roomId: number, afterId?: number) => void
}

const ChatContext = createContext<ChatContextType>({
  isReady: false,
  socket: undefined,
  state: {
    roomById: {},
    messageById: {},
    messageIdsByRoomId: {},
    roomIds: [],
    metaByKey: {}

  },
  sendMessage: () => {},
  fetchNextRooms: () => {},
  fetchRoomById: () => {},
  fetchNextMessages: () => {}
})

export default ChatContext
