import { useContext } from 'react'
import { ThemeContext } from 'styled-components'

export default function useThemeContext () {
  return useContext(ThemeContext)
}
