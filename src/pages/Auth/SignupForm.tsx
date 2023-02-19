/* eslint-disable prefer-promise-reject-errors */
import { DatePicker, Form, Input, Select } from 'antd'
import UsernameInput from 'components/shared/UsernameInput'

export default function SignupForm () {
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
        label="Email"
        name='email'
        rules={[{ required: true, message: 'Email is required' }]}
      >
        <Input type="email" placeholder="Email" maxLength={255} />
      </Form.Item>
      <Form.Item
        label="Username"
        name='username'
        rules={[{ required: true, message: 'Username is required' }]}
      >
        <UsernameInput placeholder="Username" maxLength={255} />
      </Form.Item>
      <Form.Item
        label="Full name"
        name='fullName'
        rules={[{ required: true, message: 'Full name is required' }]}
      >
        <Input placeholder="Full name" maxLength={255} />
      </Form.Item>
      <Form.Item
        label="Gender"
        name='gender'
        rules={[{ required: true, message: 'Gender is required' }]}
      >
        <Select
          options={[{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }, { label: 'Other', value: 'other' }]}
          placeholder="Select gender"
          style={{ maxWidth: 300 }}
        />
      </Form.Item>
      <Form.Item
        label="Date of birth"
        name='dob'
        rules={[{ required: true, message: 'Date of birth is required' }]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        label="Password"
        name='password'
        rules={[{ required: true, message: 'Password is required' }]}
      >
        <Input type="password" placeholder="Password" maxLength={50} />
      </Form.Item>
      <Form.Item
        label="Confirm your password"
        name='passwordConfirmation'
        dependencies={['password']}
        rules={[{ required: true, message: 'Please verify your password', validator: validatePasswordConfirmation }]}
      >
        <Input type="password" placeholder="Password" maxLength={50}/>
      </Form.Item>
    </Form.Provider>
  )
}
