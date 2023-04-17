import { ReactNode, useState } from 'react'
import { IntlProvider } from 'react-intl'
import en from '../langs/en.json'
import id from '../langs/id.json'
import LangContext from './LangContext'

const LANGS = {
  id,
  en
}

type LangContextProviderProps = {
  children: ReactNode
}

export default function LangContextProvider ({ children }: LangContextProviderProps) {
  const [lang, setLang] = useState<'id' | 'en'>('id')

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <IntlProvider locale={lang} defaultLocale='id' messages={LANGS[lang]}>
        {children}
      </IntlProvider>
    </LangContext.Provider>
  )
}
