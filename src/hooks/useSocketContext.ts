import SocketContext from 'contexts/SocketContext'
import { useContext } from 'react'

export default function useSocketContext () {
  return useContext(SocketContext)
}
