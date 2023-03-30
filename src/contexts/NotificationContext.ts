import { createContext } from 'react'
import { Socket } from 'socket.io-client'

export type NotificationState = {
  notifById: any
  notifIds: any[]
  metaByKey: any
}

export type NotificationContextType = {
  isReady: boolean
  socket?: Socket
  state: NotificationState
  fetchNext: () => void
  translate: (payload: any) => any
}

const NotificationContext = createContext<NotificationContextType>({
  isReady: false,
  socket: undefined,
  state: {
    notifById: {},
    notifIds: [],
    metaByKey: {}
  },
  fetchNext: () => {},
  translate: () => {}
})

export default NotificationContext
