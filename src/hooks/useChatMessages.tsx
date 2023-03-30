import useChatContext from './useChatContext'

export default function useChatMessages (roomId: number) {
  const { state } = useChatContext()
  const data: any[] = (state.messageIdsByRoomId[roomId] || []).map((msgId: any) => state.messageById[msgId])
  const meta = state.metaByKey[`rooms[${roomId}].messages[]`] || { status: 'idle' }

  return {
    data, meta
  }
}
