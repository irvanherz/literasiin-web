import { Segmented, Space } from 'antd'
import useLangContext from 'hooks/useLangContext'
import useThemeContext from 'hooks/useThemeContext'
import styled from 'styled-components'
import PageWidthAdapter from '../PageWidthAdapter'

function LangSelector () {
  const ctx = useLangContext()
  return (
    <Segmented
      value={ctx.lang}
      options={[{ value: 'id', label: 'Bahasa Indonesia' }, { value: 'en', label: 'English' }]}
      onChange={v => ctx.setLang(v.toString() as any)}
    />
  )
}

function ThemeSelector () {
  const ctx = useThemeContext()
  return (
    <Segmented
      value={ctx.theme}
      options={[{ value: 'light', label: 'Light' }, { value: 'dark', label: 'Dark' }]}
      onChange={v => ctx.setTheme(v.toString() as any)}
    />
  )
}

const StyledPageWidthAdapter = styled(PageWidthAdapter)`
.footer-wrapper {
  padding: 32px 0;
  text-align: center;
}
`
export default function Footer () {
  return (
    <StyledPageWidthAdapter className="adapter">
      <div className="footer-wrapper">
        <Space direction='vertical' style={{ width: '100%' }}>
          <div><LangSelector /></div>
          <div><ThemeSelector /></div>
          <div>Copyright &copy; 2023. Literasiin.com</div>
        </Space>
      </div>
    </StyledPageWidthAdapter>
  )
}
