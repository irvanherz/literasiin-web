import { Form, Input } from 'antd'
import { useIntl } from 'react-intl'

export default function ForgotPasswordForm () {
  const intl = useIntl()
  return (
    <Form.Provider>
      <Form.Item
        name='username'
        rules={[{ required: true, message: intl.formatMessage({ defaultMessage: 'Email or username is required!' }) }]}
      >
        <Input
          placeholder={intl.formatMessage({ defaultMessage: 'Your email or username...' })}
        />
      </Form.Item>
    </Form.Provider>
  )
}
