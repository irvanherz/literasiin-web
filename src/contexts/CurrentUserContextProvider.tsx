import useAuthContext from 'hooks/useAuthContext'
import { ReactNode, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import UsersService from 'services/Users'
import CurrentUserContext, { CurrentUserContextType } from './CurrentUserContext'

type CurrentUserContextProviderProps = {
  children: ReactNode
}
export default function CurrentUserContextProvider ({ children }: CurrentUserContextProviderProps) {
  const auth = useAuthContext()
  const [value, setValue] = useState<CurrentUserContextType>({
    status: 'idle',
    data: undefined
  })

  const userQuery = useQuery(
    'users[me]',
    () => UsersService.findByUsername('me'),
    { enabled: false }
  )

  useEffect(() => {
    const fun = async () => {
      try {
        setValue({ status: 'idle', data: undefined })
        if (auth.status === 'authenticated') {
          const result = await userQuery.refetch()
          const data = result.data?.data
          setValue({ status: 'success', data })
        } else if (auth.status === 'unauthenticated') {
          setValue({ status: 'success', data: undefined })
        }
      } catch (err) {
        console.log(err)
        setValue({ status: 'error', data: undefined })
      }
    }
    fun()
  }, [auth.status])

  return (
    <CurrentUserContext.Provider value={value}>
      {value.status === 'success' && children}
    </CurrentUserContext.Provider>
  )
}
