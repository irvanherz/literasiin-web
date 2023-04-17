import { Alert, Button } from 'antd'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledAlert = styled(Alert)`
align-items: center;
.ant-alert-message {
  font-weight: 900;
}
`
export default function KbOtherMessage () {
  return (
    <StyledAlert
      message='Have another question?'
      description='Keep in touch with us. We always be ready to help you!'
      action={
        <Link to='https://wa.me/6287850620305'><Button type='primary'>Contact us</Button></Link>
      }
    />
  )
}
