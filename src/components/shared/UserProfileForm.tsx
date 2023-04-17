import { DatePicker, Form, Input, Select } from 'antd'
import { useIntl } from 'react-intl'
import PhotoInput from './PhotoInput'
import UsernameInput from './UsernameInput'

export default function UserProfileForm () {
  const intl = useIntl()
  return (
    <Form.Provider>
      <Form.Item
        name='photo'
        style={{ textAlign: 'center' }}
      >
        <PhotoInput />
      </Form.Item>
      <Form.Item
        label={intl.formatMessage({ defaultMessage: 'Email' })}
        name='email'
      >
        <Input disabled type="email" placeholder={intl.formatMessage({ defaultMessage: 'Email...' })} maxLength={255} />
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
    </Form.Provider>
  )
}
