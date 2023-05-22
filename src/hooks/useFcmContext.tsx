import FcmContext from 'contexts/FcmContext'
import { useContext } from 'react'

export default function useFcmContext () {
  return useContext(FcmContext)
}
