import { PlusOutlined } from '@ant-design/icons'
import { Button, Space, Tabs } from 'antd'
import Layout from 'components/Layout'
import RouteGuard from 'components/RouteGuard'
import analytics from 'libs/analytics'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { FormattedMessage, useIntl } from 'react-intl'
import AiSection from './AiSection'
import PendingInvitationSection from './PendingInvitationSection'
import StoryCreateButton from './StoryCreateButton'
import StoryListAny from './StoryListAny'
import StoryListPublished from './StoryListPublished'

export default function StoryListMine () {
  const intl = useIntl()

  useEffect(() => {
    analytics.page({
      title: 'My Stories',
      url: window.location.href
    })
  }, [])

  return (
    <RouteGuard require='authenticated'>
      <Layout.Default>
        <Layout.Scaffold
          title={<FormattedMessage defaultMessage="My Stories" />}
          description={<FormattedMessage defaultMessage="List of all my stories" />}
          actions={[
            <StoryCreateButton key='crt'>
              <Button icon={<PlusOutlined />} type='primary'>{intl.formatMessage({ defaultMessage: 'New Story' })}</Button>
            </StoryCreateButton>
          ]}
      >
          <Space direction='vertical' style={{ width: '100%' }}>
            <PendingInvitationSection />
            <Tabs
              destroyInactiveTabPane
              items={[
                { key: 'all', tabKey: 'all', label: <FormattedMessage defaultMessage='All Stories' />, children: <StoryListAny /> },
                { key: 'published', tabKey: 'published', label: <FormattedMessage defaultMessage='Published' />, children: <StoryListPublished /> }
              ]}
            />
            <AiSection />
          </Space>
        </Layout.Scaffold>
        <Helmet>
          <title>My Stories - Literasiin</title>
        </Helmet>
      </Layout.Default>
    </RouteGuard>

  )
}
