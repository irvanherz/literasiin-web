import { Button, Form, message, Space, Typography } from 'antd'
import ChangePasswordForm from 'components/shared/ChangePasswordForm'
import useAuthChangePassword from 'hooks/useAuthChangePassword'

export default function EditSecurity () {
  const [form] = Form.useForm()
  const changer = useAuthChangePassword()
  const handleFinish = (values: any) => {
    delete values.newPasswordConfirmation
    changer.mutate(values, {
      onSuccess: () => {
        message.success('Password already updated')
        form.resetFields()
      },
      onError: (err: any) => {
        message.error(err?.message)
      }
    })
  }

  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      <div>
        <Typography.Title level={3}>Change Password</Typography.Title>
        <Typography.Paragraph>Update your old password to the new password.</Typography.Paragraph>
      </div>
      <Form
        form={form}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        onFinish={handleFinish}
      >
        <ChangePasswordForm />
        <Button type='primary' htmlType='submit' loading={changer.isLoading}>Change Password</Button>
      </Form>
    </Space>

  )
}
