import { Form, Input, Space } from 'antd'
import { FormattedMessage, useIntl } from 'react-intl'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Wrapper = styled.div`
.special label{
  width: 100%;
}
`
export default function SigninForm () {
  const intl = useIntl()
  return (
    <Form.Provider>
      <Wrapper>
        <Form.Item
          label={<FormattedMessage defaultMessage="Username or email" />}
          name='username'
          rules={[{ required: true, message: intl.formatMessage({ defaultMessage: 'Username or email is required!' }) }]}
        >
          <Input type="email" placeholder={intl.formatMessage({ defaultMessage: 'Your email or username...' })}/>
        </Form.Item>
        <Form.Item
          className='special'
          label={
            <Space style={{ width: '100%', justifyContent: 'space-between' }}>
              <span><FormattedMessage defaultMessage='Password' /></span>
              <Link to='/auth/forgot-password'><FormattedMessage defaultMessage='Forgot password?' /></Link>
            </Space>
          }
          name='password'
          rules={[{ required: true, message: intl.formatMessage({ defaultMessage: 'Password is required!' }) }]}
        >
          <Input type="password" placeholder={intl.formatMessage({ defaultMessage: 'Your password...' })}/>
        </Form.Item>
      </Wrapper>
    </Form.Provider>
  )
}
