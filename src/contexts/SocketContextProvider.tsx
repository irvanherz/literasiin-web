import { SocketOptions } from 'dgram'
import useAuthContext from 'hooks/useAuthContext'
import { SOCKET_URL } from 'libs/variables'
import { ReactNode, useEffect, useState } from 'react'
import { io, ManagerOptions, Socket } from 'socket.io-client'
import SocketContext from './SocketContext'

type SocketContextProviderProps = {
  children: ReactNode,
  options?: Partial<ManagerOptions & SocketOptions>
}

export default function SocketContextProvider ({ children }: SocketContextProviderProps) {
  const auth = useAuthContext()
  const [socket, setSocket] = useState<Socket>()

  useEffect(() => {
    if (auth.token) {
      console.log('Creating socket', auth.token)

      const sock = io(SOCKET_URL, {
        extraHeaders: {
          Authorization: auth.status === 'authenticated' ? `Bearer ${auth.token}` : ''
        }
      })
      setSocket(sock)
    }
  }, [auth.token])

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  )
}
