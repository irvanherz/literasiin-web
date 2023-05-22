import { getMessaging, getToken } from 'firebase/messaging'
import { ReactNode, useEffect, useState } from 'react'
import FcmContext, { FcmContextType } from './FcmContext'

type FcmContextProviderProps = {
  children: ReactNode
}
export default function FcmContextProvider ({ children }: FcmContextProviderProps) {
  const [state, setState] = useState<FcmContextType>({
    status: 'idle',
    token: undefined
  })
  useEffect(() => {
    getNotificationToken()
  }, [])

  const getNotificationToken = async () => {
    try {
      const messaging = getMessaging()
      const token = await getToken(messaging)
      setState({
        status: 'allowed',
        token
      })
    } catch (err) {
      setState({
        status: 'blocked',
        token: undefined
      })
    }
  }

  return (
    <FcmContext.Provider
      value={state}
    >
      {children}
    </FcmContext.Provider>
  )
}
