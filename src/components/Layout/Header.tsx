import { MessageOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Space } from 'antd'
import useAuthContext from 'hooks/useAuthContext'
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import PageWidthAdapter from '../PageWidthAdapter'
import ProfileMenu from './ProfileMenu'

function UserMenu () {
  const auth = useAuthContext()
  return auth.status === 'authenticated'
    ? (
      <Space>
        <Link to='/cart'>
          <Button shape='circle' icon={<ShoppingCartOutlined />} />
        </Link>
        <Link to='/chats'>
          <Button shape='circle' icon={<MessageOutlined />} />
        </Link>
        <ProfileMenu><Button shape='round' icon={<UserOutlined />}>Menu</Button></ProfileMenu>
      </Space>
      )
    : (
      <Link to="/auth/signin">
        <Button>Sign in</Button>
      </Link>
      )
}

const StyledPageWidthAdapter = styled(PageWidthAdapter)`
display: flex;
align-items: center;
gap: 8px;
.logo {
  display: flex;
  flex: 0;
  img { flex: 1; height: 36px }
}
.search {
  flex: 1;
}
.user-menus {
  flex: 0;
}
`
type HeaderProps = {
  searchComponent?: ReactNode
}

export default function Header ({ searchComponent }: HeaderProps) {
  return (
    <StyledPageWidthAdapter className="adapter">
      <Link to="/" className="logo">
        <img src={`${process.env.PUBLIC_URL}/assets/images/logo.svg`} />
      </Link>
      <div className="search">
        {searchComponent}
      </div>
      <div className='user-menus'>
        <UserMenu />
      </div>
    </StyledPageWidthAdapter>
  )
}
