import { Button, Card, Col, Divider, Form, message, Row, Space } from 'antd'
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
import ContinueWithGoogleButton from './ContinueWithGoogleButton'
import SigninForm from './SigninForm'

export default function Signin () {
  const auth = useAuthContext()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [form] = Form.useForm()
  const signin = useMutation<any, any, any>(AuthService.signin)
  const fcm = useFcmContext()

  const handleSubmit = async (values: any) => {
    const payload = {
      ...values,
      deviceType: 'web',
      deviceId: window.navigator.userAgent,
      notificationToken: fcm.token || ''
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
      <Layout.Default contentContainerStyle={{ padding: '32px 0' }} showUserMenu={false}>
        <PageWidthAdapter>
          <Row gutter={[16, 16]}>
            <Col xs={0} sm={0} md={12} lg={14} xl={14} xxl={14}></Col>
            <Col xs={24} sm={24} md={12} lg={10} xl={10} xxl={10}>
              <Card
                onTabChange={handleTabChange}
                tabList={[{ key: 'signin', tab: <FormattedMessage defaultMessage='Sign in' /> }, { key: 'signup', tab: <FormattedMessage defaultMessage='Sign up' /> }]}
                activeTabKey='signin'
              >
                <Form
                  form={form}
                  wrapperCol={{ span: 24 }} labelCol={{ span: 24 }}
                  onFinish={handleSubmit}
                  style={{ textAlign: 'left' }}
                >
                  <SigninForm />
                  <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                    <Button htmlType='submit' type="primary" loading={signin.isLoading}><FormattedMessage defaultMessage="Sign In" /></Button>
                    <Link to='/auth/signup' replace={true}>
                      <Button loading={signin.isLoading} type="link"><FormattedMessage defaultMessage="Does not have an account?" /></Button>
                    </Link>
                  </Space>
                </Form>
                <Divider>or</Divider>
                <div style={{ textAlign: 'center' }}>
                  <ContinueWithGoogleButton />
                </div>
                <Helmet>
                  <title>Sign in - Literasiin</title>
                </Helmet>
              </Card>
            </Col>
          </Row>
        </PageWidthAdapter>

      </Layout.Default>
    </RouteGuard>
  )
}
