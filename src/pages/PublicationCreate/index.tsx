import { Form } from 'antd'
import Layout from 'components/Layout'
import PublicationForm from 'components/shared/PublicationForm'
import { Helmet } from 'react-helmet'

export default function PublicationCreate () {
  const [form] = Form.useForm()

  const handleFinish = () => {}

  const handleFinishFailed = () => {}

  return (
    <Layout.Default>
      <Layout.Scaffold
        bodyStyle={{ padding: '16px 0' }}
        title="Publish"
        description="Publish your story"
      >
        <Form
          form={form}
          wrapperCol={{ span: 24 }}
          labelCol={{ span: 24 }}
          onFinish={handleFinish}
          onFinishFailed={handleFinishFailed}
          >
          <PublicationForm />
        </Form>
      </Layout.Scaffold>
      <Helmet>
        <title>Publish a Book - Literasiin</title>
      </Helmet>
    </Layout.Default>
  )
}
