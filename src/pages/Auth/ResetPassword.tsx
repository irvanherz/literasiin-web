import { Button, Card, Form, message, Modal, Space } from 'antd'
import Layout from 'components/Layout'
import RouteGuard from 'components/RouteGuard'
import { useMutation } from 'react-query'
import { useNavigate, useSearchParams } from 'react-router-dom'
import AuthService from 'services/Auth'
import ResetPasswordForm from './ResetPasswordForm'

export default function ResetPassword () {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [form] = Form.useForm()
  const requestor = useMutation<any, any, any>(AuthService.resetPassword)

  const handleSubmit = (values: any) => {
    const payload = {
      password: values.password,
      email: searchParams.get('email'),
      token: searchParams.get('token')
    }
    requestor.mutate(payload, {
      onSuccess: (data) => {
        Modal.success({
          title: 'Reset Password Success',
          content: 'Now you can login using new password',
          centered: true,
          okText: 'Login',
          onOk: () => {
            navigate('/auth/signin', { replace: true })
          }
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
          <Space direction='vertical' size='large' style={{ width: '100%' }}>
            <Form
              form={form}
              wrapperCol={{ span: 24 }} labelCol={{ span: 24 }}
              onFinish={handleSubmit}
              style={{ textAlign: 'left' }}
            >
              <ResetPasswordForm />
            </Form>
            <div style={{ textAlign: 'center' }}>
              <Button onClick={form.submit} loading={requestor.isLoading} type='primary'>Reset Password</Button>
            </div>
          </Space>
        </Card>
      </Layout.Blank>
    </RouteGuard>
  )
}
