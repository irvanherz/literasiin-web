import { Alert, Button, Card, Form, message, Modal, Space } from 'antd'
import Layout from 'components/Layout'
import RouteGuard from 'components/RouteGuard'
import { FormattedMessage } from 'react-intl'
import { useMutation } from 'react-query'
import AuthService from 'services/Auth'
import ForgotPasswordForm from './ForgotPasswordForm'

export default function ForgotPassword () {
  const [form] = Form.useForm()
  const requestor = useMutation<any, any, any>(AuthService.resetPasswordRequest)

  const handleSubmit = (values: any) => {
    const username = values.username
    requestor.mutate({ username }, {
      onSuccess: (data) => {
        const email = data.data.user.email
        Modal.success({
          title: 'Reset Password Sent',
          content: `Please check your email (${email}) for further instruction`,
          centered: true
        })
      },
      onError: (err) => {
        message.error(err?.message)
      }
    })
  }

  return (
    <RouteGuard require='unauthenticated'>
      <Layout.Blank contentStyle={{ display: 'flex' }}>
        <Card
          style={{ width: '100%', maxWidth: 500, margin: 'auto' }}
        >
          <Space direction='vertical' size='large'>
            <Alert
              type='info'
              message={<FormattedMessage defaultMessage="Please enter your email or username below to process. We will send you email for resetting your password." />}
            />
            <Form
              form={form}
              wrapperCol={{ span: 24 }} labelCol={{ span: 24 }}
              onFinish={handleSubmit}
              style={{ textAlign: 'left' }}
            >
              <ForgotPasswordForm />
            </Form>
            <div style={{ textAlign: 'center' }}>
              <Button loading={requestor.isLoading} onClick={form.submit} type='primary'><FormattedMessage defaultMessage="Submit" /></Button>
            </div>
          </Space>
        </Card>
      </Layout.Blank>
    </RouteGuard>
  )
}
