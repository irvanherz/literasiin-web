import { GoogleOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { API_BASE_URL } from 'libs/variables'
import { Link } from 'react-router-dom'

export default function ContinueWithGoogleButton () {
  return (
    <Link to={`${API_BASE_URL}/auth/google`}>
      <Button type='default' style={{ width: '100%' }} icon={<GoogleOutlined />}>Continue With Google</Button>
    </Link>
  )
}
