import { createContext } from 'react'

export type ThemeContextType = {
  theme: 'light' | 'dark',
  setTheme: (theme: string) => void
}

const SocketContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {}
})

export default SocketContext
