import { Layout, theme } from 'antd'
import ScrollToTop from 'components/utils/ScrollToTop'
import { ReactNode } from 'react'
import styled from 'styled-components'
import Footer from './Footer'
import Header from './Header'

const StyledLayout = styled(Layout)`
  .top {
    min-height: 100vh;
  }
  .ant-layout-header {
    padding: 0;
    background: rgba(255,255,255,0.5);
    position: sticky;
    top: 0;
    z-index: 9;
    box-shadow: 0 0 20px rgb(0 0 0 / 10%);
    backdrop-filter: blur(5px);
  }
  .ant-layout-content {
    padding: 0;
  }
  .ant-layout-footer {
    padding: 0;
  }
  `

type LayoutDefaultProps = {
  children: ReactNode,
  searchComponent?: ReactNode,
}

export default function LayoutDefault ({ children, searchComponent }: LayoutDefaultProps) {
  const { token } = theme.useToken()

  return (
    <StyledLayout>
      <div className='top'>
        <Layout.Header className='layout-default-header'>
          <Header searchComponent={searchComponent} />
        </Layout.Header>
        <Layout.Content className='layout-default-content'>
          {children}
        </Layout.Content>
      </div>
      <Layout.Footer className='layoout-default-footer' style={{ background: token.colorBgContainer }}>
        <Footer />
      </Layout.Footer>
      <ScrollToTop />
    </StyledLayout>
  )
}
