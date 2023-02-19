import { createContext } from 'react'

export type AuthContextType = {
  status: 'idle' | 'authenticated' | 'unauthenticated',
  token?: string
  refreshToken?: string
  setToken: (token?: string | null, refreshToken?: string | null) => void
}

const AuthContext = createContext<AuthContextType>({
  status: 'idle',
  token: undefined,
  refreshToken: undefined,
  setToken: (_a, _b) => {}
})

export default AuthContext
