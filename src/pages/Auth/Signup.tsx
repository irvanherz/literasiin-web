import { Button, Card, Form, message, Space } from 'antd'
import Layout from 'components/Layout'
import RouteGuard from 'components/RouteGuard'
import { getMessaging, getToken } from 'firebase/messaging'
import useAuthContext from 'hooks/useAuthContext'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { FormattedMessage } from 'react-intl'
import { useMutation } from 'react-query'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import AuthService from 'services/Auth'
import SignupForm from './SignupForm'

export default function Signup () {
  const auth = useAuthContext()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const signup = useMutation<any, any, any>(AuthService.signup)
  const [form] = Form.useForm()

  const getNotificationToken = async () => {
    try {
      const messaging = getMessaging()
      const token = await getToken(messaging).catch(() => undefined)
      return token
    } catch (err) {
      return null
    }
  }

  const handleSubmit = async (values: any) => {
    delete values.passwordConfirmation
    const notificationToken = await getNotificationToken()
    const payload = {
      ...values,
      deviceType: 'web',
      deviceId: window.navigator.userAgent,
      notificationToken
    }
    signup.mutate(payload, {
      onError: (err) => {
        message.error(err?.message)
      },
      onSuccess: (result) => {
        const { token, refreshToken } = result.meta
        auth.setToken(token, refreshToken)
      }
    })
  }

  const handleValidationFailed = () => {
    message.error('Check all fields and then try again')
  }

  useEffect(() => {
    if (auth.status === 'authenticated') {
      const redirect = searchParams.get('redirect') || '/'
      navigate(redirect, { replace: true })
    }
  }, [auth.status])

  const handleTabChange = (tab: string) => {
    navigate(`/auth/${tab}`, { replace: true })
  }

  return (
    <RouteGuard require='unauthenticated'>
      <Layout.Blank contentStyle={{ display: 'flex' }}>
        <Card
          onTabChange={handleTabChange}
          tabList={[{ key: 'signin', tab: <FormattedMessage defaultMessage='Sign in' /> }, { key: 'signup', tab: <FormattedMessage defaultMessage='Sign Up' /> }]}
          activeTabKey='signup'
          style={{ width: '100%', maxWidth: 500, margin: 'auto' }}
      >
          <Form
            form={form}
            wrapperCol={{ span: 24 }}
            labelCol={{ span: 24 }}
            onFinish={handleSubmit} onFinishFailed={handleValidationFailed}
            style={{ textAlign: 'left' }}
          >
            <SignupForm />
          </Form>
          <Space style={{ width: '100%', justifyContent: 'space-between' }}>
            <Button type="primary" onClick={form.submit}><FormattedMessage defaultMessage="Sign up" /></Button>
            <Link to='/auth/signin' replace={true}>
              <Button type="link"><FormattedMessage defaultMessage="Already have an account?" /></Button>
            </Link>
          </Space>
          <Helmet>
            <title>Sign up - Literasiin</title>
          </Helmet>
        </Card>
      </Layout.Blank>
    </RouteGuard>
  )
}
