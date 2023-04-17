import LangContext from 'contexts/LangContext'
import { useContext } from 'react'

export default function useLangContext () {
  return useContext(LangContext)
}
