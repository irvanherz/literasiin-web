import { useMemo } from 'react'
import useChatContext from './useChatContext'

export default function useChatRooms () {
  const { state } = useChatContext()

  const data = useMemo(() => (
    state.roomIds.map(roomId => state.roomById[roomId])
  ), [state])

  const meta = state.metaByKey['rooms[]'] || { status: 'idle' }

  return {
    data, meta
  }
}
