import { useMemo } from 'react'
import useNotificationContext from './useNotificationContext'

export default function useNotifications () {
  const { state } = useNotificationContext()

  const data = useMemo(() => (
    state.notifIds.map(id => state.notifById[id])
  ), [state])

  const meta = state.metaByKey['notifications[]'] || { status: 'idle' }

  return {
    data, meta
  }
}
