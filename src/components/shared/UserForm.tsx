/* eslint-disable prefer-promise-reject-errors */
import { DatePicker, Form, Input, Select } from 'antd'
import dayjs from 'dayjs'

export default function UserForm () {
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
        <Input placeholder="Username" maxLength={255} />
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
        <DatePicker disabledDate={d => (d.isSame(dayjs()) || d.isAfter(dayjs()))} />
      </Form.Item>
    </Form.Provider>
  )
}
