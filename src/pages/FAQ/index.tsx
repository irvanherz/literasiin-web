import { Card, List, theme } from 'antd'
import Layout from 'components/Layout'
import useConfigurationByName from 'hooks/useConfigurationByName'

export default function FAQ () {
  const { data } = useConfigurationByName('home-data')
  const config = data?.data?.value || {}
  const faqs: any[] = config?.faqs || []
  const { token } = theme.useToken()
  return (
    <Layout.Default style={{ background: token.colorBgBase }}>
      <Layout.Scaffold
        title="Frequently Asked Questions"
        description="Pertanyaan yang sering diajukan terkait website Literasiin.com"
        headerStyle={{ background: token.colorPrimaryBg, textAlign: 'center' }}
        bodyStyle={{ padding: '24px 0' }}
      >
        <Card style={{ width: '100%', maxWidth: 768, margin: 'auto' }}>
          <List
            dataSource={faqs}
            renderItem={faq => (
              <List.Item>
                <List.Item.Meta
                  title={faq.question}
                  description={faq.answer}
                />
              </List.Item>
            )}
          />
        </Card>
      </Layout.Scaffold>
    </Layout.Default>
  )
}
