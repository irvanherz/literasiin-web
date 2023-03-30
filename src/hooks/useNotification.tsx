import useNotificationContext from './useNotificationContext'

export default function useNotification (notifId: number) {
  const { state } = useNotificationContext()

  const data: any = state.notifById[notifId]

  const meta = state.metaByKey[`notifications[${notifId}]`] || { status: 'idle' }

  return {
    data, meta
  }
}
