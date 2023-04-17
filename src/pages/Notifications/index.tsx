import { List } from 'antd'
import Layout from 'components/Layout'
import RouteGuard from 'components/RouteGuard'
import RenderTimeFromNow from 'components/shared/RenderTimeFromNow'
import useNotificationContext from 'hooks/useNotificationContext'
import useNotifications from 'hooks/useNotifications'
import { translateNotification } from 'libs/notifications'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import InfiniteScroll from 'react-infinite-scroll-component'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'

type NotificationListItemProps = {
  notification: any
}

function NotificationListItem ({ notification }: NotificationListItemProps) {
  const translated = translateNotification(notification)
  return (
    <Link to={translated.url}>
      <List.Item extra={<RenderTimeFromNow timestamp={notification?.createdAt} />}>
        <List.Item.Meta
          title={translated?.title}
          description={translated?.description}
        />
      </List.Item>
    </Link>

  )
}

export default function Notifications () {
  const ctx = useNotificationContext()
  const { data, meta } = useNotifications()

  useEffect(() => {
    if (ctx.isReady && meta.status === 'idle') {
      ctx.fetchNext()
    }
  }, [ctx.isReady, meta.status])
  console.log(meta)

  return (
    <RouteGuard require='authenticated'>
      <Layout.Default>
        <Layout.Scaffold
          title={<FormattedMessage defaultMessage="Notifications" />}
          description={<FormattedMessage defaultMessage="List of all notifications" />}
          bodyStyle={{ padding: '16px 0' }}
        >
          <InfiniteScroll
            dataLength={data?.length || 0}
            next={() => ctx.fetchNext()}
            hasMore={meta?.numItems > data.length}
            loader={<div style={{ textAlign: 'center' }}><FormattedMessage defaultMessage='Loading' />...</div>}
            scrollableTarget="chatroom-list-wrapper"
      >
            <List
              dataSource={data}
              renderItem={notif => <NotificationListItem notification={notif}/>}
            />
          </InfiniteScroll>
        </Layout.Scaffold>
        <Helmet>
          <title>Notifications - Literasiin</title>
        </Helmet>
      </Layout.Default>
    </RouteGuard>
  )
}
