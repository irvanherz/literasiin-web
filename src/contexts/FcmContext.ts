import { createContext } from 'react'

export type FcmContextType = {
  status: 'idle' | 'allowed' | 'blocked',
  token?: string
}

const FcmContext = createContext<FcmContextType>({
  status: 'idle',
  token: undefined
})

export default FcmContext
