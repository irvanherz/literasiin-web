import { ConfigProvider, theme as antdTheme, ThemeConfig } from 'antd'
import { ReactNode, useMemo, useState } from 'react'
import { ThemeContext } from 'styled-components'

type ThemeContextProviderProps = {
  children: ReactNode
}

export default function ThemeContextProvider ({ children }: ThemeContextProviderProps) {
  const [theme, setTheme] = useState('light')

  const themeConfig: ThemeConfig = useMemo(() => {
    return theme === 'light'
      ? { algorithm: antdTheme.defaultAlgorithm, token: { fontFamily: 'Roboto, sans-serif', colorPrimary: '#00b96b' } }
      : { algorithm: antdTheme.darkAlgorithm, token: { fontFamily: 'Roboto, sans-serif', colorPrimary: '#00b96b' } }
  }, [theme])

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme
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
