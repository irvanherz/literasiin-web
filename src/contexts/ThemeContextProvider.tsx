import { ConfigProvider, theme as antdTheme, ThemeConfig } from 'antd'
import { ReactNode, useMemo, useState } from 'react'
import ThemeContext from './ThemeContext'

type ThemeContextProviderProps = {
  children: ReactNode
}

export default function ThemeContextProvider ({ children }: ThemeContextProviderProps) {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')

  const themeConfig: ThemeConfig = useMemo(() => {
    return theme === 'light'
      ? { algorithm: antdTheme.defaultAlgorithm, token: { fontFamily: 'Roboto, sans-serif', colorPrimary: '#00b96b' } }
      : { algorithm: antdTheme.darkAlgorithm, token: { fontFamily: 'Roboto, sans-serif', colorPrimary: '#00b96b' } }
  }, [theme])

  const handleChangeTheme = (t: string) => {
    localStorage.setItem('theme', t)
    setTheme(t)
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme: handleChangeTheme
      }}
    >
      <ConfigProvider
        theme={themeConfig}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  )
}
