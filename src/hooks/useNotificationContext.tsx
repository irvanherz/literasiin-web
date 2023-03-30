import NotificationContext from 'contexts/NotificationContext'
import { useContext } from 'react'

export default function useNotificationContext () {
  return useContext(NotificationContext)
}
