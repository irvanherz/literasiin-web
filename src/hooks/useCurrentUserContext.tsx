import CurrentUserContext from 'contexts/CurrentUserContext'
import { useContext } from 'react'

export default function useCurrentUserContext () {
  const data = useContext(CurrentUserContext)
  return data
}
