import { Avatar, Button, Col, Row, Space, Tabs } from 'antd'
import Layout from 'components/Layout'
import RouteGuard from 'components/RouteGuard'
import { DEFAULT_PHOTO } from 'libs/variables'
import { useQuery } from 'react-query'
import { Link, useParams } from 'react-router-dom'
import UsersService from 'services/Users'
import FollowerButton from './FollowersButton'
import FollowingButton from './FollowingButton'
import MyStories from './MyStories'
import ProfileCard from './ProfileCard'
import RecentStories from './RecentStories'
import WalletCard from './WalletCard'

export default function UserDetails () {
  const params = useParams()
  const username = params?.username
  const { data } = useQuery(`users[${username}]`, () => UsersService.findByUsername(username!), { enabled: !!username })
  const user = data?.data

  const photo = user?.photo?.meta?.objects?.find?.((object: any) => object.id === 'sm')

  return (
    <RouteGuard require={username === 'me' ? 'authenticated' : undefined}>
      <Layout.Default>
        <Layout.Scaffold
          headerStyle={{ textAlign: 'center' }}
          title={
            <Space direction='vertical' style={{ width: '100%' }}>
              <Avatar size={128} shape='square' src={photo?.url || DEFAULT_PHOTO} />
              <div>{user?.fullName}</div>
              <div style={{ fontWeight: 'normal' }}>@{user?.username}</div>
            </Space>
        }
          description={
            <Space>
              <FollowerButton user={user} />
              <FollowingButton user={user} />
            </Space>
        }
          bodyStyle={{ padding: '16px 0' }}
          actions={[
            <Link key='edit' to={`/users/${username}/edit`}>
              <Button >Edit</Button>
            </Link>

          ]}
      >
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Space direction='vertical' style={{ width: '100%' }}>
                <WalletCard />
                <ProfileCard user={user || {}} />
              </Space>
            </Col>
            <Col span={16}>
              <Tabs>
                <Tabs.TabPane key='activities' tabKey='activities' tab='Activities'>
                  <Space direction='vertical' style={{ width: '100%' }}>
                    <RecentStories />
                    <MyStories />
                  </Space>
                </Tabs.TabPane>
                <Tabs.TabPane key='connections' tabKey='connections' tab='Connections'>
                  <Space direction='vertical' style={{ width: '100%' }}>
                    <RecentStories />
                    <MyStories />
                  </Space>
                </Tabs.TabPane>
                <Tabs.TabPane key='settings' tabKey='settings' tab='Settings'>
                  <Space direction='vertical' style={{ width: '100%' }}>
                    <RecentStories />
                    <MyStories />
                  </Space>
                </Tabs.TabPane>
              </Tabs>
            </Col>
          </Row>
        </Layout.Scaffold>
      </Layout.Default>
    </RouteGuard>

  )
}
