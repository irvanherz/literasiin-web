import { Avatar, Drawer, Menu, Space } from 'antd'
import useAuthContext from 'hooks/useAuthContext'
import useCurrentUser from 'hooks/useCurrentUser'
import { DEFAULT_PHOTO } from 'libs/variables'
import { cloneElement, ReactElement, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledDrawer = styled(Drawer)`

`

type ProfileMenuProps = {
  children: ReactElement,
}
export default function ProfileMenu ({ children }: ProfileMenuProps) {
  const auth = useAuthContext()
  const [open, setOpen] = useState(false)
  const user = useCurrentUser()

  const handleClick = () => {
    setOpen(!open)
  }

  const handleSignout = () => {
    auth.setToken(null, null)
  }

  const md = user?.photo?.meta?.objects?.find((object: any) => object.id === 'md')

  return (
    <>
      { children && cloneElement(children, { onClick: handleClick })}
      <StyledDrawer
        open={open}
        onClose={handleClick}
      >
        <Space direction='vertical' style={{ width: '100%' }}>
          <div style={{ textAlign: 'center' }}>
            <Space direction='vertical' style={{ width: '100%' }}>
              <Avatar size={64} shape='square' src={md?.url || DEFAULT_PHOTO} />
              <div style={{ fontWeight: 800 }}>{user?.fullName}</div>
              <div>@{user?.username}</div>
            </Space>

          </div>
          <Menu
            onClick={handleClick}
            items={[
              {
                key: '/users/me',
                label: <Link to={'/users/me'}>Profile</Link>
              },
              {
                key: '/stories/mine',
                label: <Link to={'/stories/mine'}>My Stories</Link>
              },
              {
                key: '/notifications',
                label: <Link to={'/notifications'}>Notifications</Link>
              },
              // {
              //   key: '/chats',
              //   label: <Link to={'/chats'}>Messages</Link>
              // },
              // {
              //   key: '/users/me/settings',
              //   label: <Link to={'/users/me/settings'}>Settings</Link>
              // },
              {
                key: 'signout',
                label: 'Sign Out',
                onClick: handleSignout
              }
            ]}
          />
        </Space>
      </StyledDrawer>
    </>
  )
}
