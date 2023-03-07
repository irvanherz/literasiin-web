import { Collapse, Space, Typography } from 'antd'
import PageWidthAdapter from 'components/PageWidthAdapter'

type FaqsProps = {
  config: any
}
export default function Faqs ({ config }: FaqsProps) {
  const faqs = config?.faqs || []

  return (
    <Space direction="vertical" style={{ width: '100%', background: '#FFF' }}>
      <div style={{ textAlign: 'center', padding: '30px 0' }}>
        <PageWidthAdapter>
          <Typography.Title style={{ margin: 0 }}>FAQ</Typography.Title>
          <Typography.Text>Frequently Asked Question</Typography.Text>
        </PageWidthAdapter>
      </div>
      <div style={{ background: '#EEEEEE', padding: '20px 0' }}>
        <PageWidthAdapter>
          <Space direction="vertical" style={{ width: '100%' }}>
            {faqs.map((faq: any) => (
              <Collapse collapsible="header" key={faq.id}>
                <Collapse.Panel key="x" header={faq.question}>
                  <p dangerouslySetInnerHTML={{ __html: faq.answer }} />
                </Collapse.Panel>
              </Collapse>
            ))}
          </Space>
        </PageWidthAdapter>
      </div>
    </Space>
  )
}
