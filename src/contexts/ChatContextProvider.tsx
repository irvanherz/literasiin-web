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
    case 'chats.rooms.updated':
    case 'chats.rooms.created': {
      const room = payload.data
      const id = room.id

      const roomById = {
        ...state.roomById,
        [id]: room
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
    case 'chats.rooms.findNext.started': {
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
    case 'chats.rooms.findNext.success': {
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
    case 'chats.rooms.findNext.error': {
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
      const { id } = payload
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
      const { id } = payload
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

    case 'chats.messages.findNext.started': {
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
    case 'chats.messages.findNext.success': {
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
    case 'chats.messages.findNext.error': {
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
      socket.on('chats.rooms.updated', payload => dispatch({ type: 'chats.rooms.updated', payload }))
    }
  }, [socket])

  const fetchNextRooms = async (afterUpdatedAt?: number) => {
    if (socket) {
      const filter = { afterUpdatedAt }
      try {
        dispatch({ type: 'chats.rooms.findNext.started', payload: null })
        const result = await socket.emitWithAck('chats.rooms.findNext', { filter })
        dispatch({ type: 'chats.rooms.findNext.success', payload: result })
      } catch (err) {
        dispatch({ type: 'chats.rooms.findNext.error', payload: err })
      }
    }
  }

  const fetchRoomById = async (id: number) => {
    if (socket) {
      try {
        dispatch({ type: 'chats.rooms.findById.started', payload: { id } })
        const result = await socket.emitWithAck('chats.rooms.findById', { id })
        if (!result.success) throw new Error('Error loading data')
        dispatch({ type: 'chats.rooms.findById.success', payload: result })
      } catch (error) {
        dispatch({ type: 'chats.rooms.findById.error', payload: { error, id } })
      }
    }
  }

  const fetchNextMessages = async (roomId: number, after?: any) => {
    if (socket) {
      try {
        dispatch({ type: 'chats.messages.findNext.started', payload: { params: { roomId } } })
        const result = await socket.emitWithAck('chats.messages.findNext', { filter: { roomId, after } })
        console.log(result, 'aaaa')

        dispatch({ type: 'chats.messages.findNext.success', payload: { ...result, params: { roomId } } })
      } catch (error) {
        dispatch({ type: 'chats.messages.findNext.error', payload: { error, params: { roomId } } })
      }
    }
  }

  const sendMessage = async (payload: any) => {
    if (socket) {
      const result = await socket.emitWithAck('chats.messages.create', payload)
      const { message, room } = result.data
      dispatch({ type: 'chats.messages.created', payload: { data: message } })
      dispatch({ type: 'chats.rooms.updated', payload: { data: room } })
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
