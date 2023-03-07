import { List } from 'antd'
import Layout from 'components/Layout'
import RouteGuard from 'components/RouteGuard'

export default function Notifications () {
  return (
    <RouteGuard require='authenticated'>
      <Layout.Default>
        <Layout.Scaffold
          title="Notifications"
          description="List of all notifications"
          bodyStyle={{ padding: '16px 0' }}
        >
          <List />
        </Layout.Scaffold>
      </Layout.Default>
    </RouteGuard>
  )
}
