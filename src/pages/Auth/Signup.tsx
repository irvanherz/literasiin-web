import { UserIcon } from '@heroicons/react/24/solid'
import { message } from 'antd'
import Layout from 'components/Layout'
import RouteGuard from 'components/RouteGuard'
import useAuthContext from 'hooks/useAuthContext'
import useFcmContext from 'hooks/useFcmContext'
import analytics from 'libs/analytics'
import { useEffect } from 'react'
import { FormProvider, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import AuthService from 'services/Auth'
import ContinueWithFacebookButton from './ContinueWithFacebookButton'
import ContinueWithGoogleButton from './ContinueWithGoogleButton'
import SignupForm from './SignupForm'

export default function Signup () {
  const auth = useAuthContext()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const form = useForm()
  const signup = useMutation<any, any, any>(AuthService.signup)
  const fcm = useFcmContext()

  const handleSubmit: SubmitHandler<any> = async (values: any) => {
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
        analytics.track('login', { method: 'email' })

        const { token, refreshToken } = result.meta
        auth.setToken(token, refreshToken)
      }
    })
  }

  const handleSubmitError: SubmitErrorHandler<any> = async (values: any) => {}

  useEffect(() => {
    if (auth.status === 'authenticated') {
      const redirect = searchParams.get('redirect') || '/'
      navigate(redirect, { replace: true })
    }
  }, [auth.status])

  useEffect(() => {
    analytics.page({
      title: 'Sign up - Literasiin',
      url: window.location.href
    })
  }, [])

  return (
    <RouteGuard require='unauthenticated'>
      <Layout.Blank className='bg-slate-100' contentClassName='flex'>
        <div className='max-w-[500px] w-full p-4 m-auto'>
          <Link to='/' className='block text-center mb-8'>
            <img
              className="w-12 inline-block"
              src={`${process.env.PUBLIC_URL}/assets/images/logo.svg`}
            />
          </Link>
          <div className='rounded-lg shadow bg-white'>
            <div className='p-4 border-b space-y-4'>
              <div className='text-xl text-slate-400 font-black text-center'>Buat akun <span className='text-emerald-500'>Literasiin</span></div>
              <div>
                <FormProvider {...form}>
                  <SignupForm />
                </FormProvider>
              </div>
              <div className='flex justify-between items-center'>
                <div className='flex-0'>
                  <button className='btn btn-sm btn-primary' onClick={form.handleSubmit(handleSubmit, handleSubmitError)}><UserIcon className='w-4' /> Daftar</button>
                </div>
                <div className='flex-0'>
                  <Link replace to='/auth/signin' className='font-bold'>
                    <button className='btn btn-ghost btn-sm'>Sudah punya akun?</button>
                  </Link>
                </div>
              </div>
            </div>
            <div className='space-y-2 p-4'>
              <div><ContinueWithGoogleButton /></div>
              <div><ContinueWithFacebookButton /></div>
            </div>
          </div>
        </div>
      </Layout.Blank>
    </RouteGuard>
  )

  // return (
  //   <RouteGuard require='unauthenticated'>
  //     <Layout.Default contentContainerStyle={{ padding: '32px 0' }} showUserMenu={false}>
  //       <PageWidthAdapter>
  //         <Row gutter={[16, 16]}>
  //           <Col xs={0} sm={0} md={12} lg={14} xl={14} xxl={14}></Col>
  //           <Col xs={24} sm={24} md={12} lg={10} xl={10} xxl={10}>
  //             <Card
  //               onTabChange={handleTabChange}
  //               tabList={[{ key: 'signin', tab: <FormattedMessage defaultMessage='Sign in' /> }, { key: 'signup', tab: <FormattedMessage defaultMessage='Sign Up' /> }]}
  //               activeTabKey='signup'
  //               style={{ width: '100%', maxWidth: 500, margin: 'auto' }}
  //             >
  //               <Form
  //                 form={form}
  //                 wrapperCol={{ span: 24 }}
  //                 labelCol={{ span: 24 }}
  //                 onFinish={handleSubmit} onFinishFailed={handleValidationFailed}
  //                 style={{ textAlign: 'left' }}
  //               >
  //                 <SignupForm />
  //                 <Space style={{ width: '100%', justifyContent: 'space-between' }}>
  //                   <Button loading={signup.isLoading} htmlType='submit' type="primary"><FormattedMessage defaultMessage="Sign up" /></Button>
  //                   <Link to='/auth/signin' replace={true}>
  //                     <Button type="link"><FormattedMessage defaultMessage="Already have an account?" /></Button>
  //                   </Link>
  //                 </Space>
  //               </Form>
  //               <Divider>or</Divider>
  //               <Space direction='vertical' style={{ width: '100%', textAlign: 'center' }}>
  //                 <ContinueWithGoogleButton />
  //                 <ContinueWithFacebookButton />
  //               </Space>
  //               <Helmet>
  //                 <title>Sign up - Literasiin</title>
  //               </Helmet>
  //             </Card>
  //           </Col>
  //         </Row>
  //       </PageWidthAdapter>
  //     </Layout.Default>
  //   </RouteGuard>
  // )
}
