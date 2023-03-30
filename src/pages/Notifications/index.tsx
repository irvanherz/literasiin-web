import { List } from 'antd'
import Layout from 'components/Layout'
import RouteGuard from 'components/RouteGuard'
import useNotificationContext from 'hooks/useNotificationContext'
import useNotifications from 'hooks/useNotifications'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Link } from 'react-router-dom'

type NotificationListItemProps = {
  notification: any
}

function NotificationListItem ({ notification }: NotificationListItemProps) {
  return (
    <Link to='/'>
      <List.Item>
        <List.Item.Meta
          title={'You are invited to write'}
          description="Rendy inviting you to contribute their story"
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
          title="Notifications"
          description="List of all notifications"
          bodyStyle={{ padding: '16px 0' }}
        >
          <InfiniteScroll
            dataLength={data?.length || 0}
            next={() => ctx.fetchNext()}
            hasMore={meta?.numItems > data.length}
            loader={<div style={{ textAlign: 'center' }}>Loading...</div>}
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
