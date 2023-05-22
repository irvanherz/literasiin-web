import { Card, CardProps } from 'antd'
import Layout from 'components/Layout'
import RouteGuard from 'components/RouteGuard'
import { Helmet } from 'react-helmet'
import { FormattedMessage } from 'react-intl'
import { useNavigate, useParams } from 'react-router-dom'
import EditAddresses from './EditAddresses'
import EditDetails from './EditDetails'
import EditSecurity from './EditSecurity'

export default function UserProfileEdit () {
  const params = useParams()
  const sectionId = params.sectionId || 'profile'
  const navigate = useNavigate()

  const handleTabChange: CardProps['onTabChange'] = (key) => {
    navigate(`/users/me/edit/${key}`)
  }
  const menuItems: CardProps['tabList'] = [
    {
      key: 'profile',
      tab: 'Profile'
    },
    {
      key: 'addresses',
      tab: 'Address'
    },
    {
      key: 'security',
      tab: 'Security'
    }
  ]

  return (
    <RouteGuard require='authenticated'>
      <Layout.Default>
        <Layout.Scaffold
          title={<FormattedMessage defaultMessage="Edit Profile" />}
          description={<FormattedMessage defaultMessage="Update your profile details" />}
          bodyStyle={{ padding: '24px 0' }}
        >
          <Card
            type='inner'
            activeTabKey={sectionId}
            tabList={menuItems}
            onTabChange={handleTabChange}
          >
            {sectionId === 'profile' && (
              <EditDetails />
            )}
            {sectionId === 'addresses' && (
              <EditAddresses />
            )}
            {sectionId === 'security' && (
              <EditSecurity />
            )}
          </Card>
        </Layout.Scaffold>
        <Helmet>
          <title>Edit Profile - Literasiin</title>
        </Helmet>
      </Layout.Default>
    </RouteGuard>

  )
}
