/* eslint-disable no-unused-vars */
import { Segmented, theme } from 'antd'
import useLangContext from 'hooks/useLangContext'
import useThemeContext from 'hooks/useThemeContext'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import PageWidthAdapter from '../PageWidthAdapter'

function LangSelector () {
  const ctx = useLangContext()
  return (
    <Segmented
      size='small'
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
      size='small'
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
  const { token } = theme.useToken()

  return (
    <footer className="footer p-10 bg-base-200 text-base-content border-t">
      <div>
        <div className='text-4xl text-emerald-700 font-black'>literasiin.com</div>
        <div>Portal Menulis dan Menerbitkan Buku Jadi Lebih Menyenangkan!</div>
      </div>
      <div>
        <span className="footer-title">Perusahaan</span>
        <Link className="link link-hover" to='/about-us'>Tentang Kami</Link>
        <Link className="link link-hover" to='/contact-us'>Kontak </Link>
        <Link className="link link-hover" to='https://blog.literasiin.com'>Blog</Link>
      </div>
      <div>
        <span className="footer-title">Socials</span>
        <Link className="link link-hover" to='https://www.instagram.com/literasi.in_' >Instagram</Link>
        <Link className="link link-hover" to='https://www.facebook.com/profile.php?id=100067536241501' >Facebook </Link>
        <Link className="link link-hover" to='https://twitter.com/elonmusk' >Twitter</Link>
        <Link className="link link-hover" to='https://www.youtube.com/channel/UCeQzr9Z8zIifhctGn7Fg_Jg' >YouTube</Link>
      </div>
      <div>
        <span className="footer-title">Legal</span>
        <Link className="link link-hover" to='/privacy-policy'>Kebijakan Privasi</Link>
        <Link className="link link-hover" to='/terms-and-conditions'>Syarat dan Ketentuan</Link>
      </div>
    </footer>
  )
}
