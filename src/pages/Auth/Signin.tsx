import { Button, Card, Divider, Form, message, Space } from 'antd'
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
import ContinueWithGoogleButton from './ContinueWithGoogleButton'
import SigninForm from './SigninForm'

export default function Signin () {
  const auth = useAuthContext()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [form] = Form.useForm()
  const signin = useMutation<any, any, any>(AuthService.signin)

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
    const notificationToken = await getNotificationToken()
    const payload = {
      ...values,
      deviceType: 'web',
      deviceId: window.navigator.userAgent,
      notificationToken
    }

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

  const handleTabChange = (tab: string) => {
    navigate(`/auth/${tab}`, { replace: true })
  }

  return (
    <RouteGuard require='unauthenticated'>
      <Layout.Blank contentStyle={{ display: 'flex' }}>
        <Card
          onTabChange={handleTabChange}
          tabList={[{ key: 'signin', tab: <FormattedMessage defaultMessage='Sign in' /> }, { key: 'signup', tab: <FormattedMessage defaultMessage='Sign up' /> }]}
          activeTabKey='signin'
          style={{ width: '100%', maxWidth: 500, margin: 'auto' }}
      >
          <Form
            form={form}
            wrapperCol={{ span: 24 }} labelCol={{ span: 24 }}
            onFinish={handleSubmit}
            style={{ textAlign: 'left' }}
          >
            <SigninForm />
          </Form>
          <Space style={{ width: '100%', justifyContent: 'space-between' }}>
            <Button type="primary" onClick={form.submit} loading={signin.isLoading}><FormattedMessage defaultMessage="Sign In" /></Button>
            <Link to='/auth/signup' replace={true}>
              <Button type="link"><FormattedMessage defaultMessage="Does not have an account?" /></Button>
            </Link>
          </Space>
          <Divider>or</Divider>
          <div style={{ textAlign: 'center' }}>
            <ContinueWithGoogleButton />
          </div>
          <Helmet>
            <title>Sign in - Literasiin</title>
          </Helmet>
        </Card>
      </Layout.Blank>
    </RouteGuard>
  )
}
