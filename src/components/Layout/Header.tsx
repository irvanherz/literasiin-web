import { BellOutlined, MessageOutlined } from '@ant-design/icons'
import { Button, Space } from 'antd'
import useAuthContext from 'hooks/useAuthContext'
import { ReactNode } from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import PageWidthAdapter from '../PageWidthAdapter'
import ProfileMenu from './ProfileMenu'

function UserMenu () {
  const auth = useAuthContext()
  return auth.status === 'authenticated'
    ? (
      <Space>
        <Link to='/notifications'>
          <Button shape='circle' icon={<BellOutlined />} />
        </Link>
        <Link to='/chats'>
          <Button shape='circle' icon={<MessageOutlined />} />
        </Link>
        <ProfileMenu />
      </Space>
      )
    : (
      <Link to="/auth/signin">
        <Button><FormattedMessage defaultMessage="Sign in" /></Button>
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
