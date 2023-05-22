/* eslint-disable prefer-promise-reject-errors */
import { Form, Input } from 'antd'
import { FormattedMessage, useIntl } from 'react-intl'

export default function ChangePasswordForm () {
  const intl = useIntl()

  const newPassword = Form.useWatch('newPassword')

  const validatePasswordConfirmation = (_rule: any, value: string) => {
    if (!value) return Promise.reject('Please confirm your password')
    if (newPassword !== value) return Promise.reject('Password confirmation does not match')
    else return Promise.resolve()
  }

  return (
    <Form.Provider>
      <Form.Item
        label={<FormattedMessage defaultMessage='Current password' />}
        name='oldPassword'
        rules={[{ required: true, message: intl.formatMessage({ defaultMessage: 'Current password is required!' }) }]}
        >
        <Input type="password" placeholder={intl.formatMessage({ defaultMessage: 'Your current password...' })}/>
      </Form.Item>
      <Form.Item
        label={intl.formatMessage({ defaultMessage: 'New password' })}
        name='newPassword'
        rules={[{ required: true, message: intl.formatMessage({ defaultMessage: 'New password is required!' }) }]}
      >
        <Input type="password" placeholder={intl.formatMessage({ defaultMessage: 'Your new password...' })} maxLength={50} />
      </Form.Item>
      <Form.Item
        label={intl.formatMessage({ defaultMessage: 'Confirm new password' })}
        name='newPasswordConfirmation'
        dependencies={['newPassword']}
        rules={[{ required: true, message: intl.formatMessage({ defaultMessage: 'Please verify your new password!' }), validator: validatePasswordConfirmation }]}
      >
        <Input type="password" placeholder={intl.formatMessage({ defaultMessage: 'Confirm your new password...' })} maxLength={50}/>
      </Form.Item>
    </Form.Provider>
  )
}
