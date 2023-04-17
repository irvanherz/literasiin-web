import { createContext } from 'react'

export type LangContextType = {
  lang: 'id' | 'en'
  setLang: (lang: 'id' | 'en') => void
}

const LangContext = createContext<LangContextType>({
  lang: 'id',
  setLang: () => {}
})

export default LangContext
