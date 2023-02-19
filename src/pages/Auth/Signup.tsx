import { Button, Form, message, Space } from 'antd'
import useAuthContext from 'hooks/useAuthContext'
import { useEffect } from 'react'
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

  const handleSubmit = (values: any) => {
    delete values.passwordConfirmation
    signup.mutate(values, {
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

  return (
    <div>
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
        <Button type="primary" onClick={form.submit}>Sign Up</Button>
        <Link to='/auth/signin' replace={true}>
          <Button type="link">Already have an account? Sign In</Button>
        </Link>
      </Space>
    </div>
  )
}
