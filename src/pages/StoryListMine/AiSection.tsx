import { Alert, Button } from 'antd'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledAlert = styled(Alert)`
.ant-alert-message {
  font-weight: 900;
}
`
export default function AiSection () {
  return (
    <StyledAlert
      type='info'
      message="Tidak Punya Ide?"
      description="Literasiin punya robot untuk membuatkanmu ide cerita yang menarik."
      action={
        <Link to='/stories/assistants/create'>
          <Button type='primary'>Coba Sekarang</Button>
        </Link>
      }
      style={{ alignItems: 'center' }}
    />
  )
}
