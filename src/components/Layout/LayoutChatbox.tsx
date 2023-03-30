import { Layout } from 'antd'
import PageWidthAdapter from 'components/PageWidthAdapter'
import ScrollToTop from 'components/utils/ScrollToTop'
import { CSSProperties, ReactNode } from 'react'
import styled from 'styled-components'
import Header from './Header'

const StyledLayout = styled(Layout)`
height: 100vh;
display: flex;
flex-direction: column;
.layout-chatbox-header {
  flex: 0;
  padding: 0;
  background: rgba(255,255,255,0.5);
  position: sticky;
  top: 0;
  z-index: 9;
  box-shadow: 0 0 20px rgb(0 0 0 / 10%);
  backdrop-filter: blur(5px);
}
.layout-chatbox-content-outer {
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
}
.layout-chatbox-content {
  flex: 1;
  padding: 0;
  display: flex;
}
`

type LayoutChatboxProps = {
  children: ReactNode,
  searchComponent?: ReactNode,
  contentContainerStyle?: CSSProperties
}

export default function LayoutChatbox ({ children, searchComponent, contentContainerStyle }: LayoutChatboxProps) {
  return (
    <StyledLayout>
      <Layout.Header className='layout-chatbox-header'>
        <Header searchComponent={searchComponent} />
      </Layout.Header>
      <PageWidthAdapter className='layout-chatbox-content-outer'>
        <Layout.Content className='layout-chatbox-content' style={contentContainerStyle}>
          {children}
        </Layout.Content>
      </PageWidthAdapter>
      <ScrollToTop />
    </StyledLayout>
  )
}
