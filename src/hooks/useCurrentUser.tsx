import CurrentUserContext from 'contexts/CurrentUserContext'
import { useContext } from 'react'

export default function useCurrentUser () {
  const { data } = useContext(CurrentUserContext)
  return data
}
