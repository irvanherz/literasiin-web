import { notification } from 'antd'
import dayjs from 'dayjs'
import useSocketContext from 'hooks/useSocketContext'
import { translateNotification } from 'libs/notifications'
import { ReactNode, useEffect, useReducer } from 'react'
import NotificationContext, { NotificationState } from './NotificationContext'

type NotificationAction = {
  type: string
  payload: any
}

function reducer (state: NotificationState, action: NotificationAction): NotificationState {
  const { type, payload } = action
  switch (type) {
    case 'notifications.created': {
      const notif = payload.data
      const id = notif.id

      const notifById = {
        ...state.notifById,
        [id]: payload
      }
      const notifIds = Object.keys(notifById).sort((a, b) => {
        const notifA = notifById[a]
        const notifB = notifById[b]
        return dayjs(notifA.createdAt).isAfter(dayjs(notifB.createdAt)) ? -1 : -1
      })

      return {
        ...state,
        notifById,
        notifIds
      }
    }
    case 'notifications.fetchNext.started': {
      const metaByKey = {
        ...state.metaByKey,
        'notifications[]': {
          status: 'loading'
        }
      }
      return {
        ...state,
        metaByKey
      }
    }
    case 'notifications.fetchNext.success': {
      const { data, meta } = payload

      const notifs: any[] = [
        ...Object.values(state.notifById),
        ...data
      ]

      const notifById = notifs.reduce((a, c) => {
        a[c.id] = c
        return a
      }, {})
      const notifIds = Object.keys(notifById).sort((a, b) => {
        const notifA = notifById[a]
        const notifB = notifById[b]
        return notifA.id > notifB.id ? -1 : 1
      })
      const metaByKey = {
        ...state.metaByKey,
        'notifications[]': {
          ...meta,
          status: 'success'
        }
      }
      return {
        ...state,
        metaByKey,
        notifIds,
        notifById
      }
    }
    default:
      return state
  }
}

type NotificationContextProviderProps = {
  children: ReactNode
}

export default function NotificationContextProvider ({ children }: NotificationContextProviderProps) {
  const { socket } = useSocketContext()
  const [state, dispatch] = useReducer(reducer, { notifIds: [], notifById: {}, metaByKey: {} })
  const isReady = !!socket

  useEffect(() => {
    if (socket) {
      socket.on('notifications.created', payload => {
        const translated = translateNotification(payload.data)
        notification.info({
          placement: 'topRight',
          message: translated.title,
          description: translated.description,
          duration: 5
        })
        dispatch({ type: 'notifications.created', payload })
      })
    }
  }, [socket])

  const fetchNext = async () => {
    if (socket) {
      try {
        const lastId = (state.metaByKey['notifications[]'] || {})?.lastId
        dispatch({ type: 'notifications.fetchNext.started', payload: null })
        const result = await socket.emitWithAck('notifications.findNext', { filter: { lastId } })
        dispatch({ type: 'notifications.fetchNext.success', payload: result })
      } catch (err) {
        dispatch({ type: 'notifications.fetchNext.error', payload: err })
      }
    }
  }

  const translate = (payload: any) => {
    return null
  }

  return (
    <NotificationContext.Provider
      value={{ isReady, socket, state, fetchNext, translate }}
    >
      {children}
    </NotificationContext.Provider>
  )
}
