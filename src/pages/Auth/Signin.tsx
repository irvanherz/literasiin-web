/* eslint-disable no-unused-vars */
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
import SigninForm from './SigninForm'

export default function Signin () {
  const auth = useAuthContext()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const form = useForm()
  const signin = useMutation<any, any, any>(AuthService.signin)
  const fcm = useFcmContext()

  const handleSubmit: SubmitHandler<any> = async (values: any) => {
    console.log(values)

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
      title: 'Sign in - Literasiin',
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
              <div className='text-xl text-slate-400 font-black text-center'>Masuk ke <span className='text-emerald-500'>Literasiin</span></div>
              <div>
                <FormProvider {...form}>
                  <SigninForm />
                </FormProvider>
              </div>
              <div className='flex justify-between items-center'>
                <div className='flex-0'>
                  <button className='btn btn-sm btn-primary' onClick={form.handleSubmit(handleSubmit, handleSubmitError)}><UserIcon className='w-4' /> Masuk</button>
                </div>
                <div className='flex-0'>
                  <Link replace to='/auth/signup' className='font-bold'>
                    <button className='btn btn-ghost btn-sm'>Tidak punya akun?</button>
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
}
