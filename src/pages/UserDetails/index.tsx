import { SettingFilled } from '@ant-design/icons'
import { Avatar, Button, Col, Row, Space, Tabs } from 'antd'
import Layout from 'components/Layout'
import RouteGuard from 'components/RouteGuard'
import { DEFAULT_PHOTO } from 'libs/variables'
import { Helmet } from 'react-helmet'
import { useQuery } from 'react-query'
import { Link, useParams } from 'react-router-dom'
import UsersService from 'services/Users'
import AnnouncementsSection from './AnnouncementsSection'
import ChatButton from './ChatButton'
import FollowButton from './FollowButton'
import FollowerButton from './FollowersButton'
import FollowingButton from './FollowingButton'
import MyStories from './MyStories'
import ProfileCard from './ProfileCard'
import PublicationsTab from './PublicationsTab'
import ReadingListTab from './ReadingListTab'
import RecentStories from './RecentStories'
import WalletCard from './WalletCard'

export default function UserDetails () {
  const params = useParams()
  const username = params?.username
  const { data, refetch } = useQuery(`users[${username}]`, () => UsersService.findByUsername(username!), { enabled: !!username })
  const user = data?.data

  const { data: dataContext, refetch: refetchContext } = useQuery(`users[${username}].context`, () => UsersService.findContextById(user?.id), { enabled: !!user?.id })
  const context = dataContext?.data

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
              <Space>
                <FollowButton user={user} context={context} afterUpdated={refetchContext}/>
                <ChatButton user={user} />
              </Space>

            </Space>
        }
          description={
            <Space>
              <FollowerButton user={user} context={context} />
              <FollowingButton user={user} context={context} />
            </Space>
        }
          bodyStyle={{ padding: '16px 0' }}
          actionsContainerStyle={{ alignItems: 'start' }}
          actions={[
            <Link key='edit' to={`/users/${username}/edit`}>
              <Button shape='circle' icon={<SettingFilled />} />
            </Link>
          ]}
      >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={8}>
              <Space direction='vertical' style={{ width: '100%' }}>
                <WalletCard user={user} />
                <ProfileCard user={user || {}} afterUpdated={refetch} />
              </Space>
            </Col>
            <Col xs={24} sm={12} md={12} lg={16} xl={16} xxl={16}>
              <Tabs>
                <Tabs.TabPane key='activities' tabKey='activities' tab='Activities'>
                  <Space direction='vertical' style={{ width: '100%' }}>
                    <RecentStories />
                    <MyStories />
                  </Space>
                </Tabs.TabPane>
                <Tabs.TabPane key='publications' tabKey='publications' tab='Publications'>
                  <PublicationsTab />
                </Tabs.TabPane>
                <Tabs.TabPane key='reading-list' tabKey='reading-list' tab='Reading List'>
                  <ReadingListTab />
                </Tabs.TabPane>
              </Tabs>
            </Col>
            <Col span={24}>
              <AnnouncementsSection />
            </Col>
          </Row>
        </Layout.Scaffold>
        <Helmet>
          <title>{user?.username ? `${user.fullName} (@${user.username}) - Literasiin` : 'Literasiin'}</title>
        </Helmet>
      </Layout.Default>
    </RouteGuard>

  )
}
