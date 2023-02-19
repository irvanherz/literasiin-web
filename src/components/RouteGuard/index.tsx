import useAuthContext from 'hooks/useAuthContext'
import { ReactElement, ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

type RouteGuardProps = {
  children: ReactElement
  require: 'authenticated' | 'unauthenticated' | undefined
  onRejected?: () => ReactNode | null | undefined
}

export default function RouteGuard ({ children, require, onRejected }: RouteGuardProps) {
  const auth = useAuthContext()

  const REDIR = {
    authenticated: '/auth/signin',
    unauthenticated: '/'
  }

  if (require && require !== auth.status) {
    if (onRejected) {
      const red = onRejected()
      return (<>{red}</>)
    } else {
      return <Navigate to={REDIR[require]} />
    }
  } else {
    return children
  }
}
