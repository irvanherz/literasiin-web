import { Result } from 'antd'
import Loader from 'components/shared/Loader'
import useAuthContext from 'hooks/useAuthContext'
import { ReactNode, useCallback, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import UsersService from 'services/Users'
import CurrentUserContext, { CurrentUserContextType } from './CurrentUserContext'

function Loading () {
  return (
    <div style={{ position: 'fixed', top: '50%', width: '100%' }}>
      <div style={{ width: '100%', maxWidth: 300, margin: '0 auto' }}>
        <Loader />
      </div>
    </div>
  )
}

function Error () {
  return (
    <div style={{ position: 'fixed', top: '50%', width: '100%', transform: 'translateY(-50%)' }}>
      <div style={{ width: '100%', maxWidth: 500, margin: '0 auto', textAlign: 'center' }}>
        <Result status='error' title="Error" subTitle="Cannot load user data. Please reload this page" />
      </div>
    </div>
  )
}

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
    if (auth.status !== 'idle') {
      console.log('Load user', auth.status)

      const fun = async () => {
        try {
          setValue({ status: 'idle', data: undefined })
          if (auth.status === 'authenticated') {
            const result = await userQuery.refetch()
            const data = result.data?.data
            setValue(data ? { status: 'success', data } : { status: 'error', data: undefined })
          } else if (auth.status === 'unauthenticated') {
            setValue({ status: 'success', data: undefined })
          }
        } catch (err) {
          console.log(err)
          setValue({ status: 'error', data: undefined })
        }
      }
      fun()
    }
  }, [auth.status])

  const render = useCallback(() => {
    if (value.status === 'success') return children
    else if (value.status === 'error') return <Error />
    else return <Loading />
  }, [children, value.status])

  return (
    <CurrentUserContext.Provider value={value}>
      {render()}
    </CurrentUserContext.Provider>
  )
}
