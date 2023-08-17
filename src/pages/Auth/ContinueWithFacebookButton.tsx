import { FacebookOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { API_BASE_URL } from 'libs/variables'
import { Link } from 'react-router-dom'

export default function ContinueWithFacebookButton () {
  return (
    <Link to={`${API_BASE_URL}/auth/facebook`}>
      <Button type='default' style={{ width: '100%' }} icon={<FacebookOutlined />}>Continue With Facebook</Button>
    </Link>
  )
}
