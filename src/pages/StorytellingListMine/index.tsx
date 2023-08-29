import { PlusOutlined } from '@ant-design/icons'
import { Button, Tabs } from 'antd'
import Layout from 'components/Layout'
import RouteGuard from 'components/RouteGuard'
import analytics from 'libs/analytics'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { FormattedMessage, useIntl } from 'react-intl'
// import PendingInvitationSection from './PendingInvitationSection'
import StorytellingCreateButton from './StorytellingCreateButton'
import StorytellingListAny from './StorytellingListAny'
import StorytellingListPublished from './StorytellingListPublished'

export default function StorytellingListMine () {
  const intl = useIntl()

  useEffect(() => {
    analytics.page({
      title: 'My Storytellings',
      url: window.location.href
    })
  }, [])

  return (
    <RouteGuard require='authenticated'>
      <Layout.Default>
        <Layout.Scaffold
          title={<FormattedMessage defaultMessage="My Storytellings" />}
          description={<FormattedMessage defaultMessage="List of all my storytellings" />}
          actions={[
            <StorytellingCreateButton key='crt'>
              <Button icon={<PlusOutlined />} type='primary'>{intl.formatMessage({ defaultMessage: 'New Storytelling' })}</Button>
            </StorytellingCreateButton>
          ]}
          bodyStyle={{ paddingBottom: 16 }}
        >
          {/* <PendingInvitationSection /> */}
          <Tabs
            destroyInactiveTabPane
            items={[
              { key: 'all', tabKey: 'all', label: <FormattedMessage defaultMessage='All Storytellings' />, children: <StorytellingListAny /> },
              { key: 'published', tabKey: 'published', label: <FormattedMessage defaultMessage='Published' />, children: <StorytellingListPublished /> }
            ]}
          />
        </Layout.Scaffold>
        <Helmet>
          <title>My Storytellings - Literasiin</title>
        </Helmet>
      </Layout.Default>
    </RouteGuard>

  )
}
