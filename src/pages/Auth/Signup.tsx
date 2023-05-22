import { Button, Card, Col, Form, message, Row, Space } from 'antd'
import Layout from 'components/Layout'
import PageWidthAdapter from 'components/PageWidthAdapter'
import RouteGuard from 'components/RouteGuard'
import useAuthContext from 'hooks/useAuthContext'
import useFcmContext from 'hooks/useFcmContext'
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
  const fcm = useFcmContext()

  const handleSubmit = async (values: any) => {
    delete values.passwordConfirmation
    const payload = {
      ...values,
      deviceType: 'web',
      deviceId: window.navigator.userAgent,
      notificationToken: fcm.token || ''
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
      <Layout.Default contentContainerStyle={{ padding: '32px 0' }} showUserMenu={false}>
        <PageWidthAdapter>
          <Row gutter={[16, 16]}>
            <Col xs={0} sm={0} md={12} lg={14} xl={14} xxl={14}></Col>
            <Col xs={24} sm={24} md={12} lg={10} xl={10} xxl={10}>
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
                  <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                    <Button loading={signup.isLoading} htmlType='submit' type="primary"><FormattedMessage defaultMessage="Sign up" /></Button>
                    <Link to='/auth/signin' replace={true}>
                      <Button type="link"><FormattedMessage defaultMessage="Already have an account?" /></Button>
                    </Link>
                  </Space>
                </Form>
                <Helmet>
                  <title>Sign up - Literasiin</title>
                </Helmet>
              </Card>
            </Col>
          </Row>
        </PageWidthAdapter>
      </Layout.Default>
    </RouteGuard>
  )
}
