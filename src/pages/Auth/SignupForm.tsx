/* eslint-disable prefer-promise-reject-errors */
import { DatePicker, Form, Input, Select } from 'antd'
import UsernameInput from 'components/shared/UsernameInput'
import { useIntl } from 'react-intl'

export default function SignupForm () {
  const intl = useIntl()
  const form = Form.useFormInstance()
  const password = Form.useWatch('password', form)

  const validatePasswordConfirmation = (_rule: any, value: string) => {
    if (!value) return Promise.reject('Please confirm your password')
    if (password !== value) return Promise.reject('Password confirmation does not match')
    else return Promise.resolve()
  }

  return (
    <Form.Provider>
      <Form.Item
        label={intl.formatMessage({ defaultMessage: 'Email' })}
        name='email'
        rules={[{ required: true, message: intl.formatMessage({ defaultMessage: 'Email is required!' }) }]}
      >
        <Input type="email" placeholder={intl.formatMessage({ defaultMessage: 'Email...' })} maxLength={255} />
      </Form.Item>
      <Form.Item
        label={intl.formatMessage({ defaultMessage: 'Username' })}
        name='username'
        rules={[{ required: true, message: intl.formatMessage({ defaultMessage: 'Username is required!' }) }]}
      >
        <UsernameInput placeholder={intl.formatMessage({ defaultMessage: 'Username...' })} maxLength={255} />
      </Form.Item>
      <Form.Item
        label={intl.formatMessage({ defaultMessage: 'Full name' })}
        name='fullName'
        rules={[{ required: true, message: intl.formatMessage({ defaultMessage: 'Full name is required!' }) }]}
      >
        <Input placeholder={intl.formatMessage({ defaultMessage: 'Full name...' })} maxLength={255} />
      </Form.Item>
      <Form.Item
        label={intl.formatMessage({ defaultMessage: 'Gender' })}
        name='gender'
        rules={[{ required: true, message: intl.formatMessage({ defaultMessage: 'Gender is required!' }) }]}
      >
        <Select
          options={[{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }, { label: 'Other', value: 'other' }]}
          placeholder={intl.formatMessage({ defaultMessage: 'Select gender...' })}
          style={{ maxWidth: 300 }}
        />
      </Form.Item>
      <Form.Item
        label={intl.formatMessage({ defaultMessage: 'Date of birth' })}
        name='dob'
        rules={[{ required: true, message: intl.formatMessage({ defaultMessage: 'Date of birth is required!' }) }]}
      >
        <DatePicker placeholder={intl.formatMessage({ defaultMessage: 'Select date...' })} />
      </Form.Item>
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
        rules={[{ required: true, message: intl.formatMessage({ defaultMessage: 'Please verify your password!' }), validator: validatePasswordConfirmation }]}
      >
        <Input type="password" placeholder={intl.formatMessage({ defaultMessage: 'Confirm your password...' })} maxLength={50}/>
      </Form.Item>
    </Form.Provider>
  )
}
