import ChatContext from 'contexts/ChatContext'
import { useContext } from 'react'

export default function useChatContext () {
  return useContext(ChatContext)
}
