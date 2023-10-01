import Layout from 'components/Layout'
import PageHeader from 'components/PageHeader'
import RouteGuard from 'components/RouteGuard'
import RenderTimeFromNow from 'components/shared/RenderTimeFromNow'
import useNotificationContext from 'hooks/useNotificationContext'
import useNotifications from 'hooks/useNotifications'
import analytics from 'libs/analytics'
import { translateNotification } from 'libs/notifications'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import InfiniteScroll from 'react-infinite-scroll-component'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'

function NotificationListEmpty() {
  return (
    <div className="text-center py-8">
      <div className="inline-flex rounded-full bg-yellow-100 p-2">
        <div className="rounded-full stroke-yellow-600 bg-yellow-200 p-2">
          <svg className="w-8 h-8" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.0002 9.33337V14M14.0002 18.6667H14.0118M25.6668 14C25.6668 20.4434 20.4435 25.6667 14.0002 25.6667C7.55684 25.6667 2.3335 20.4434 2.3335 14C2.3335 7.55672 7.55684 2.33337 14.0002 2.33337C20.4435 2.33337 25.6668 7.55672 25.6668 14Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
        </div>
      </div>
      <h1 className="mt-4 font-bold text-slate-800 text-2xl">Tidak Ada Notifikasi</h1>
      <p className="text-slate-600 mt-2 text-base">Belum ada notifikasi yang bisa dilihat untuk saat ini. Periksa lagi nanti.</p>
    </div>
  )
}

type NotificationItemProps = {
  notification: any
}

function NotificationItem ({ notification }: NotificationItemProps) {
  const translated = translateNotification(notification)
  return (
    <Link to={translated.url} className='border rounded-lg bg-white shadow-sm flex items-center px-4 py-2'>
      <div className='flex-1'>
        <div className='font-bold'>{translated?.title}</div>
        <div className='text-slate-500 text-sm'>{translated?.description}</div>
      </div>
      <div className='flex-none text-xs text-slate-400'>
        <RenderTimeFromNow timestamp={notification?.createdAt} />
      </div>
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

  useEffect(() => {
    analytics.page({
      title: 'Notifications - Literasiin',
      url: window.location.href
    })
  }, [])

  return (
    <RouteGuard require='authenticated'>
      <Layout.Default
        beforeContent={
          <PageHeader
            title='Notifikasi'
            description='Daftar notifikasi'
          />
        }
      >
        <div className='py-4'>
          <div className='container'>
            <InfiniteScroll
              dataLength={data?.length || 0}
              next={() => ctx.fetchNext()}
              hasMore={meta?.numItems > data.length}
              loader={<div style={{ textAlign: 'center' }}><FormattedMessage defaultMessage='Loading' />...</div>}
              scrollableTarget="chatroom-list-wrapper"
            >
              <div className='space-y-2'>
                {data.length
                  ? data.map(notif => <NotificationItem key={notif.id} notification={notif} />)
                  : <NotificationListEmpty />
                }
              </div>
            </InfiniteScroll>
          </div>
        </div>
        <Helmet>
          <title>Notifications - Literasiin</title>
        </Helmet>
      </Layout.Default>
    </RouteGuard>
  )
}
