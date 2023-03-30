import { Button, Tabs } from 'antd'
import Layout from 'components/Layout'
import RouteGuard from 'components/RouteGuard'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import PendingInvitationSection from './PendingInvitationSection'
import StoryListAny from './StoryListAny'
import StoryListPublished from './StoryListPublished'

export default function StoryListMine () {
  return (
    <RouteGuard require='authenticated'>
      <Layout.Default>
        <Layout.Scaffold
          title="My Stories"
          description="List of all my stories"
          actions={[
            <Link to='/stories/create' key='create'>
              <Button>Create New</Button>
            </Link>
          ]}
      >
          <PendingInvitationSection />
          <Tabs destroyInactiveTabPane>
            <Tabs.TabPane tab="All Stories" tabKey="all" key='all'>
              <StoryListAny />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Published" tabKey="published" key='published'>
              <StoryListPublished />
            </Tabs.TabPane>
          </Tabs>
        </Layout.Scaffold>
        <Helmet>
          <title>My Stories - Literasiin</title>
        </Helmet>
      </Layout.Default>
    </RouteGuard>

  )
}
