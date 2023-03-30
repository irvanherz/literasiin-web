import dayjs from 'dayjs'
import useSocketContext from 'hooks/useSocketContext'
import { ReactNode, useEffect, useReducer } from 'react'
import ChatContext, { ChatState } from './ChatContext'

type ChatAction = {
  type: string
  payload: any
}

function reducer (state: ChatState, action: ChatAction): ChatState {
  const { type, payload } = action
  switch (type) {
    case 'chats.rooms.created': {
      const room = payload.data
      const id = room.id

      const roomById = {
        ...state.roomById,
        [id]: payload
      }
      const roomIds = Object.keys(roomById).sort((a, b) => {
        const roomA = roomById[a]
        const roomB = roomById[b]
        return dayjs(roomA.updatedAt).isAfter(dayjs(roomB.updatedAt)) ? -1 : -1
      })

      return {
        ...state,
        roomById,
        roomIds
      }
    }
    case 'chats.messages.created': {
      const message = payload.data
      const roomId = message.roomId

      const oldMessages: any[] = (state.messageIdsByRoomId[roomId] || []).map((msgId: any) => state.messageById[msgId])
      const combinedMessages = [...oldMessages, message]
      const combinedMessagesMap = combinedMessages.reduce((a, c) => {
        a[c.id] = c
        return a
      }, {})

      const combinedMessageIds = Object.keys(combinedMessagesMap)

      const messageById = { ...state.messageById, ...combinedMessagesMap }
      const messageIdsByRoomId = {
        ...state.messageIdsByRoomId,
        [roomId]: combinedMessageIds
      }

      return {
        ...state,
        messageById,
        messageIdsByRoomId
      }
    }
    case 'chats.rooms.fetchNext.started': {
      const metaByKey = {
        ...state.metaByKey,
        'rooms[]': {
          status: 'loading'
        }
      }
      return {
        ...state,
        metaByKey
      }
    }
    case 'chats.rooms.fetchNext.success': {
      const { data } = payload

      let rooms: any[] = Object.values(state.roomById)
      rooms = [...rooms, ...data]
      const roomById = rooms.reduce((a, c) => {
        a[c.id] = c
        return a
      }, {})
      const roomIds = Object.keys(roomById).sort((a, b) => {
        const roomA = roomById[a as any]
        const roomB = roomById[b as any]
        return dayjs(roomA.updatedAt).isAfter(dayjs(roomB.updatedAt)) ? -1 : 1
      })
      const metaByKey = {
        ...state.metaByKey,
        'rooms[]': {
          status: 'success'
        }
      }
      return {
        ...state,
        roomIds,
        roomById,
        metaByKey
      }
    }
    case 'chats.rooms.fetchNext.error': {
      const metaByKey = {
        ...state.metaByKey,
        'rooms[]': {
          status: 'error'
        }
      }
      return {
        ...state,
        metaByKey
      }
    }

    case 'chats.rooms.findById.started': {
      const { params } = payload
      const { id } = params
      const metaByKey = {
        ...state.metaByKey,
        [`rooms[${id}]`]: {
          status: 'loading'
        }
      }
      return {
        ...state,
        metaByKey
      }
    }
    case 'chats.rooms.findById.success': {
      const { data } = payload
      const { id } = data

      const roomById = { ...state.roomById, [id]: data }
      const metaByKey = {
        ...state.metaByKey,
        [`rooms[${id}]`]: {
          status: 'loading'
        }
      }

      return {
        ...state,
        roomById,
        metaByKey
      }
    }
    case 'chats.rooms.findById.error': {
      const { params } = payload
      const { id } = params
      const metaByKey = {
        ...state.metaByKey,
        [`rooms[${id}]`]: {
          status: 'error'
        }
      }
      return {
        ...state,
        metaByKey
      }
    }

    case 'chats.messages.fetchNext.started': {
      const { payload } = action
      const { roomId } = payload.params

      const metaByKey = {
        ...state.metaByKey,
        [`rooms[${roomId}]`]: {
          status: 'loading'
        }
      }
      return {
        ...state,
        metaByKey
      }
    }
    case 'chats.messages.fetchNext.success': {
      const { params, data, meta } = payload
      const { roomId } = params

      const oldMessages: any[] = (state.messageIdsByRoomId[roomId] || []).map((msgId: any) => state.messageById[msgId])
      const newMessages: any[] = data || []
      const combinedMessages = [...oldMessages, ...newMessages]
      const combinedMessagesMap = combinedMessages.reduce((a, c) => {
        a[c.id] = c
        return a
      }, {})

      const combinedMessageIds = Object.keys(combinedMessagesMap)

      const messageById = { ...state.messageById, ...combinedMessagesMap }
      const messageIdsByRoomId = {
        ...state.messageIdsByRoomId,
        [roomId]: combinedMessageIds
      }

      const metaByKey = {
        ...state.metaByKey,
        [`rooms[${roomId}].messages[]`]: {
          ...meta,
          status: 'success'
        }
      }
      return {
        ...state,
        metaByKey,
        messageById,
        messageIdsByRoomId
      }
    }
    case 'chats.messages.fetchNext.error': {
      const { params } = payload
      const { roomId } = params

      const metaByKey = {
        ...state.metaByKey,
        [`rooms[${roomId}].messages[]`]: {
          status: 'error'
        }
      }
      return {
        ...state,
        metaByKey
      }
    }

    default:
      return state
  }
}

type ChatContextProviderProps = {
  children: ReactNode
}

export default function ChatContextProvider ({ children }: ChatContextProviderProps) {
  const { socket } = useSocketContext()
  const [state, dispatch] = useReducer(reducer, { messageById: {}, messageIdsByRoomId: {}, roomById: {}, roomIds: [], metaByKey: {} })
  const isReady = !!socket

  useEffect(() => {
    if (socket) {
      socket.on('chats.messages.created', payload => dispatch({ type: 'chats.messages.created', payload }))
      socket.on('chats.rooms.created', payload => dispatch({ type: 'chats.rooms.created', payload }))
    }
  }, [socket])

  const fetchNextRooms = async (afterId?: number) => {
    if (socket) {
      try {
        dispatch({ type: 'chats.rooms.fetchNext.started', payload: null })
        const result = await socket.emitWithAck('chats.rooms.findMany', { afterId })
        dispatch({ type: 'chats.rooms.fetchNext.success', payload: result })
      } catch (err) {
        dispatch({ type: 'chats.rooms.fetchNext.error', payload: err })
      }
    }
  }

  const fetchRoomById = async (id: number) => {
    if (socket) {
      try {
        dispatch({ type: 'chats.rooms.fetchById.started', payload: { params: { id } } })
        const result = await socket.emitWithAck('chats.rooms.findMany', { id })
        dispatch({ type: 'chats.rooms.fetchById.success', payload: result })
      } catch (error) {
        dispatch({ type: 'chats.rooms.fetchById.error', payload: { error, params: { id } } })
      }
    }
  }

  const fetchNextMessages = async (roomId: number, afterId?: number) => {
    if (socket) {
      try {
        dispatch({ type: 'chats.messages.fetchNext.started', payload: { params: { roomId } } })
        const result = await socket.emitWithAck('chats.messages.findMany', { roomId, afterId })
        dispatch({ type: 'chats.messages.fetchNext.success', payload: { ...result, params: { roomId } } })
      } catch (error) {
        dispatch({ type: 'chats.messages.fetchNext.error', payload: { error, params: { roomId } } })
      }
    }
  }

  const sendMessage = async (payload: any) => {
    if (socket) {
      const result = await socket.emitWithAck('chats.messages.create', payload)
      dispatch({ type: 'chats.messages.created', payload: result })
      return result
    }
  }

  return (
    <ChatContext.Provider
      value={{ isReady, socket, state, fetchNextRooms, fetchNextMessages, fetchRoomById, sendMessage }}
    >
      {children}
    </ChatContext.Provider>
  )
}
