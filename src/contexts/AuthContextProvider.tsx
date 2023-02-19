import { ReactNode, useEffect, useState } from 'react'
import AuthService from 'services/Auth'
import AuthContext from './AuthContext'

type AuthContextProviderProps = {
  children: ReactNode
}
export default function AuthContextProvider ({ children }: AuthContextProviderProps) {
  const [value, setValue] = useState<any>({
    status: 'idle',
    token: undefined,
    refreshToken: undefined
  })

  useEffect(() => {
    const token = localStorage.getItem('token')
    const refreshToken = localStorage.getItem('refreshToken')
    setValue({
      status: token ? 'authenticated' : 'unauthenticated',
      token: token || undefined,
      refreshToken: refreshToken || undefined
    })
  }, [])

  const setToken = (token: string, refreshToken: string) => {
    AuthService.persistToken(token, refreshToken)
    setValue({
      status: token ? 'authenticated' : 'unauthenticated',
      token: token || undefined,
      refreshToken: refreshToken || undefined
    })
  }

  return (
    <AuthContext.Provider value={{ setToken, ...value }}>
      {value.status !== 'idle' && children}
    </AuthContext.Provider>
  )
}
