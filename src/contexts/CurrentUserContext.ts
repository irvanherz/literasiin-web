import { createContext } from 'react'
import { QueryStatus } from 'react-query'

export type CurrentUserContextType = {
  status: QueryStatus,
  data?: any
}

const CurrentUserContext = createContext<CurrentUserContextType>({
  status: 'idle',
  data: undefined
})

export default CurrentUserContext
