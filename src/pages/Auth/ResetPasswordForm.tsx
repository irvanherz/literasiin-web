/* eslint-disable prefer-promise-reject-errors */
import { Form, Input } from 'antd'
import { useIntl } from 'react-intl'

export default function ResetPasswordForm () {
  const intl = useIntl()
  const form = Form.useFormInstance()
  const password = Form.useWatch('password', form)

  const validatePasswordConfirmation = (_rule: any, value: string) => {
    if (!value) return Promise.reject('Please confirm your password!')
    if (password !== value) return Promise.reject('Password confirmation does not match!')
    else return Promise.resolve()
  }
  return (
    <Form.Provider>
      <Form.Item
        label={intl.formatMessage({ defaultMessage: 'Password' })}
        name='password'
        rules={[{ required: true, message: intl.formatMessage({ defaultMessage: 'Password is required!' }) }]}
      >
        <Input type="password" placeholder={intl.formatMessage({ defaultMessage: 'Password...' })} maxLength={50} />
      </Form.Item>
      <Form.Item
        label={intl.formatMessage({ defaultMessage: 'Confirm password' })}
        name='passwordConfirmation'
        dependencies={['password']}
        rules={[{ required: true, message: intl.formatMessage({ defaultMessage: 'Please confirm your password!' }), validator: validatePasswordConfirmation }]}
      >
        <Input type="password" placeholder={intl.formatMessage({ defaultMessage: 'Confirm password...' })} maxLength={50}/>
      </Form.Item>
    </Form.Provider>
  )
}
