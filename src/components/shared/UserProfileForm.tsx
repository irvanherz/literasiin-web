import { DatePicker, Form, Input, Select } from 'antd'
import PhotoInput from './PhotoInput'
import UsernameInput from './UsernameInput'

export default function UserProfileForm () {
  return (
    <Form.Provider>
      <Form.Item
        name='photo'
        style={{ textAlign: 'center' }}
      >
        <PhotoInput />
      </Form.Item>
      <Form.Item
        label="Email"
        name='email'
      >
        <Input disabled type="email" placeholder="Email" maxLength={255} />
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
    </Form.Provider>
  )
}
