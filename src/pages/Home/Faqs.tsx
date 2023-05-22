import { Collapse, Space, theme, Typography } from 'antd'
import PageWidthAdapter from 'components/PageWidthAdapter'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'

const StyledCollapse = styled(Collapse)`
.ant-collapse-header-text {
  width: 100%;
}
`

type FaqsProps = {
  config: any
}
export default function Faqs ({ config }: FaqsProps) {
  const { token } = theme.useToken()
  const faqs = config?.faqs || []

  return (
    <Space direction="vertical" style={{ width: '100%', background: token.colorBgBase }}>
      <div style={{ textAlign: 'center', padding: '30px 0' }}>
        <PageWidthAdapter>
          <Typography.Title style={{ margin: 0 }}><FormattedMessage defaultMessage='FAQ' /></Typography.Title>
          <Typography.Text><FormattedMessage defaultMessage='Frequently Asked Question' /></Typography.Text>
        </PageWidthAdapter>
      </div>
      <div style={{ background: token.colorBgLayout, padding: '20px 0' }}>
        <PageWidthAdapter>
          <Space direction="vertical" style={{ width: '100%' }}>
            {faqs.map((faq: any) => (
              <StyledCollapse collapsible="header" key={faq.id}>
                <Collapse.Panel key="x" header={faq.question}>
                  <p dangerouslySetInnerHTML={{ __html: faq.answer }} />
                </Collapse.Panel>
              </StyledCollapse>
            ))}
          </Space>
        </PageWidthAdapter>
      </div>
    </Space>
  )
}
