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
        <div className="text-center py-8">
          <div className="inline-flex rounded-full bg-yellow-100 p-2">
            <div className="rounded-full stroke-yellow-600 bg-yellow-200 p-2">
              <svg className="w-8 h-8" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.0002 9.33337V14M14.0002 18.6667H14.0118M25.6668 14C25.6668 20.4434 20.4435 25.6667 14.0002 25.6667C7.55684 25.6667 2.3335 20.4434 2.3335 14C2.3335 7.55672 7.55684 2.33337 14.0002 2.33337C20.4435 2.33337 25.6668 7.55672 25.6668 14Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            </div>
          </div>
          <h1 className="mt-4 font-bold text-slate-800 text-2xl">Oops,</h1>
          <p className="text-slate-600 mt-2 text-base">Sepertinya ada yang salah. Coba muat ulang halaman ini.</p>
        </div>
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
