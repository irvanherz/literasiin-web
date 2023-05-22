import { Layout, theme } from 'antd'
import { CSSProperties, ReactNode } from 'react'
import styled from 'styled-components'

const StyledLayout = styled(Layout)`
min-height: 100vh;
padding: 24px;
margin: 0 auto;
}
`

type LayoutBlankProps = {
  children: ReactNode
  style?: CSSProperties
  className?: string
  contentStyle?: CSSProperties
  contentClassName?: string
}

export default function LayoutBlank ({ children, style, className, contentStyle, contentClassName }: LayoutBlankProps) {
  const { token } = theme.useToken()
  return (
    <StyledLayout style={{ background: token.colorBgContainer, ...style }} className={className}>
      <Layout.Content style={contentStyle} className={contentClassName}>
        {children}
      </Layout.Content>
    </StyledLayout>
  )
}
