import { Avatar, ConfigProvider, Drawer, Menu, Space, theme } from 'antd'
import useAuthContext from 'hooks/useAuthContext'
import useCurrentUser from 'hooks/useCurrentUser'
import { DEFAULT_PHOTO } from 'libs/variables'
import { useState } from 'react'
import { useIntl } from 'react-intl'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledDrawer = styled(Drawer)`

`
export default function ProfileMenu () {
  const { token } = theme.useToken()
  const intl = useIntl()
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
      <Avatar src={md?.url || DEFAULT_PHOTO} onClick={handleClick} style={{ cursor: 'pointer' }}/>
      <StyledDrawer
        open={open}
        onClose={handleClick}
        style={{ color: token.colorTextBase }}
      >
        <Space direction='vertical' style={{ width: '100%' }}>
          <div style={{ textAlign: 'center' }}>
            <Space direction='vertical' style={{ width: '100%' }}>
              <Avatar size={64} shape='square' src={md?.url || DEFAULT_PHOTO} />
              <div style={{ fontWeight: 800 }}>{user?.fullName}</div>
              <div>@{user?.username}</div>
            </Space>
          </div>
          <ConfigProvider
            theme={{ token: { colorBgContainer: 'transparent', colorSplit: 'transparent' } }}
          >
            <Menu
              onClick={handleClick}
              items={[
                {
                  key: '/users/me',
                  label: <Link to={'/users/me'}>{intl.formatMessage({ defaultMessage: 'Profile' })}</Link>
                },
                {
                  key: '/stories/mine',
                  label: <Link to={'/stories/mine'}>{intl.formatMessage({ defaultMessage: 'My Stories' })}</Link>
                },
                {
                  key: '/articles/mine',
                  label: <Link to={'/articles/mine'}>{intl.formatMessage({ defaultMessage: 'My Articles' })}</Link>
                },
                {
                  key: '/notifications',
                  label: <Link to={'/notifications'}>{intl.formatMessage({ defaultMessage: 'Notifications' })}</Link>
                },
                {
                  key: '/chats',
                  label: <Link to={'/chats'}>{intl.formatMessage({ defaultMessage: 'Chats' })}</Link>
                },
                // {
                //   key: '/users/me/settings',
                //   label: <Link to={'/users/me/settings'}>Settings</Link>
                // },
                {
                  key: 'signout',
                  label: intl.formatMessage({ defaultMessage: 'Sign Out' }),
                  onClick: handleSignout
                }
              ]}
            />
          </ConfigProvider>

        </Space>
      </StyledDrawer>
    </>
  )
}
