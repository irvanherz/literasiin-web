import useAuthContext from 'hooks/useAuthContext'
import { ReactNode, useEffect } from 'react'
import { useQuery } from 'react-query'
import UsersService from 'services/Users'
import CurrentUserContext from './CurrentUserContext'

type CurrentUserContextProviderProps = {
  children: ReactNode
}
export default function CurrentUserContextProvider ({ children }: CurrentUserContextProviderProps) {
  const auth = useAuthContext()
  const { data, status, refetch, remove } = useQuery(
    'users[me]',
    () => UsersService.findByUsername('me'),
    { enabled: false }
  )

  useEffect(() => {
    if (auth.status === 'authenticated') refetch()
    else if (auth.status === 'unauthenticated') remove()
  }, [auth.status])

  return (
    <CurrentUserContext.Provider value={{ status, data: data?.data }}>
      {status !== 'idle' && children}
    </CurrentUserContext.Provider>
  )
}
