import useChatContext from './useChatContext'

export default function useChatRoom (roomId: number) {
  const { state } = useChatContext()

  const data: any = state.roomById[roomId]

  const meta = state.metaByKey[`rooms[${roomId}]`] || { status: 'idle' }

  return {
    data, meta
  }
}
