import ThemeContext from 'contexts/ThemeContext'
import { useContext } from 'react'

export default function useThemeContext () {
  return useContext(ThemeContext)
}
