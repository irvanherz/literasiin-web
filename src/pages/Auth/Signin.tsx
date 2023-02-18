import { Button, Form, message, Space } from 'antd'
import { getMessaging, getToken } from 'firebase/messaging'
import useAuthContext from 'hooks/useAuthContext'
import { useEffect } from 'react'
import { useMutation } from 'react-query'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import AuthService from 'services/Auth'
import SigninForm from './SigninForm'

export default function Signin () {
  const auth = useAuthContext()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [form] = Form.useForm()
  const signin = useMutation<any, any, any>(AuthService.signin)

  const handleSubmit = async (values: any) => {
    const messaging = getMessaging()
    const notificationToken = await getToken(messaging).catch(() => undefined)

    const payload = {
      ...values,
      deviceType: 'web',
      deviceId: window.navigator.userAgent,
      notificationToken
    }
    console.log(payload)

    signin.mutate(payload, {
      onError: (e) => {
        message.error(e.message)
      },
      onSuccess: (result) => {
        const { token, refreshToken } = result.meta
        auth.setToken(token, refreshToken)
      }
    })
  }

  useEffect(() => {
    if (auth.status === 'authenticated') {
      const redirect = searchParams.get('redirect') || '/'
      navigate(redirect, { replace: true })
    }
  }, [auth.status])

  return (
    <div>
      <Form
        form={form}
        wrapperCol={{ span: 24 }} labelCol={{ span: 24 }}
        onFinish={handleSubmit}
        style={{ textAlign: 'left' }}
      >
        <SigninForm />
      </Form>
      <Space style={{ width: '100%', justifyContent: 'space-between' }}>
        <Button type="primary" onClick={form.submit} loading={signin.isLoading}>Sign In</Button>
        <Link to='/auth/signup' replace={true}>
          <Button type="link">Does not have an account? Sign Up</Button>
        </Link>
      </Space>
    </div>
  )
}
