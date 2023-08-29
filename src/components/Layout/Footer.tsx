import { Col, Row, Segmented, Space, Typography, theme } from 'antd'
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
    <StyledPageWidthAdapter className="adapter" style={{ borderTop: `1px solid ${token.colorBorder}` }}>
      <Space size='large' direction='vertical' className="footer-wrapper" style={{ width: '100%' }}>
        <Row gutter={[16, 16]} style={{ width: '100%', textAlign: 'left' }}>
          <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={8}>
            <Space direction='vertical'>
              <div>
                <Typography.Title level={2} style={{ fontWeight: 900, margin: 0, fontSize: token.fontSizeHeading3, color: token.colorPrimaryActive }}>literasiin.com</Typography.Title>
                <Typography.Paragraph style={{ color: token.colorTextSecondary }}>Portal Menulis dan Menerbitkan Buku Jadi Lebih Menyenangkan!</Typography.Paragraph>
              </div>
              <div></div>
            </Space>

          </Col>
          <Col xs={24} sm={12} md={12} lg={4} xl={4} xxl={4}>
            <Typography.Title level={3} style={{ marginTop: 0, fontSize: token.fontSizeLG }}>Company</Typography.Title>
            <Space direction='vertical'>
              <Link to='/about-us' style={{ color: token.colorTextSecondary }}>About Us</Link>
              <Link to='/contact-us' style={{ color: token.colorTextSecondary }}>Contact Us </Link>
              <Link to='https://blog.literasiin.com' style={{ color: token.colorTextSecondary }}>Blog</Link>
              <Link to='/privacy-policy' style={{ color: token.colorTextSecondary }}>Privacy Policy</Link>
              <Link to='/terms-and-conditions' style={{ color: token.colorTextSecondary }}>Terms of Service</Link>
            </Space>
          </Col>
          <Col xs={24} sm={12} md={12} lg={4} xl={4} xxl={4}>
            <Typography.Title level={3} style={{ marginTop: 0, fontSize: token.fontSizeLG }}>Customer Service</Typography.Title>
            <Space direction='vertical'>
              <Link to='/faq' style={{ color: token.colorTextSecondary }}>FAQ</Link>
              <Link to='https://wa.me/6285156818651' style={{ color: token.colorTextSecondary }}>Customer Support</Link>
              <Link to='/hc' style={{ color: token.colorTextSecondary }}>Help Center</Link>
            </Space>
          </Col>
          <Col xs={24} sm={12} md={12} lg={4} xl={4} xxl={4}>
            <Typography.Title level={3} style={{ marginTop: 0, fontSize: token.fontSizeLG }}>Socials</Typography.Title>
            <Space direction='vertical'>
              <Link to='https://www.instagram.com/literasi.in_' style={{ color: token.colorTextSecondary }}>Instagram</Link>
              <Link to='https://www.facebook.com/profile.php?id=100067536241501' style={{ color: token.colorTextSecondary }}>Facebook </Link>
              <Link to='https://twitter.com/elonmusk' style={{ color: token.colorTextSecondary }}>Twitter</Link>
              <Link to='https://www.youtube.com/channel/UCPeG-JX2dB90P3RgZbVNheg' style={{ color: token.colorTextSecondary }}>YouTube</Link>
            </Space>
          </Col>
          <Col xs={24} sm={12} md={12} lg={4} xl={4} xxl={4}>
            <Typography.Title level={3} style={{ marginTop: 0, fontSize: token.fontSizeLG }}>Preferences</Typography.Title>
            <Space direction='vertical' size='middle'>
              <div>
                <div style={{ color: token.colorTextSecondary, paddingBottom: 4 }}>Language</div>
                <div><LangSelector /></div>
              </div>
              <div>
                <div style={{ color: token.colorTextSecondary, paddingBottom: 4 }}>Theme</div>
                <div><ThemeSelector /></div>
              </div>
            </Space>
          </Col>
        </Row>
        <div style={{ color: token.colorTextSecondary }}>Copyright &copy; 2023. Literasiin.com</div>
      </Space>
    </StyledPageWidthAdapter>
  )
}
