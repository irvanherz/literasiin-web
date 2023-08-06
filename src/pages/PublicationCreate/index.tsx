import { Button, Divider, Form, Space } from 'antd'
import Layout from 'components/Layout'
import PublicationFilesManager from 'components/shared/PublicationFilesManager'
import PublicationForm from 'components/shared/PublicationForm'
import analytics from 'libs/analytics'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet'

export default function PublicationCreate () {
  const [form] = Form.useForm()

  const handleFinish = () => {}

  const handleFinishFailed = () => {}

  useEffect(() => {
    analytics.page({
      title: 'Publish a Book - Literasiin',
      url: window.location.href
    })
  }, [])

  return (
    <Layout.Default>
      <Layout.Scaffold
        bodyStyle={{ padding: '16px 0' }}
        title="Publish"
        description="Publish your book"
      >
        <Space direction='vertical' style={{ width: '100%' }}>
          <Form
            form={form}
            wrapperCol={{ span: 24 }}
            labelCol={{ span: 24 }}
            onFinish={handleFinish}
            onFinishFailed={handleFinishFailed}
            >
            <PublicationForm />
          </Form>
          <Divider>Upload File</Divider>
          <PublicationFilesManager />
          <Divider />
          <div style={{ textAlign: 'center' }}>
            <Button type='primary'>Process Publication</Button>
          </div>
        </Space>
      </Layout.Scaffold>
      <Helmet>
        <title>Publish a Book - Literasiin</title>
      </Helmet>
    </Layout.Default>
  )
}
