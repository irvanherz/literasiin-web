import { SettingFilled } from '@ant-design/icons'
import { Button, Card, Space } from 'antd'
import useCurrentUser from 'hooks/useCurrentUser'
import { FormattedMessage } from 'react-intl'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import WalletsService from 'services/Wallets'

const formatter = new Intl.NumberFormat('id-ID')

type WalletCardProps = { user: any}
export default function WalletCard ({ user }: WalletCardProps) {
  const currentUser = useCurrentUser()
  const canLoad = currentUser?.id === user?.id
  const { data } = useQuery('wallets[me]', () => WalletsService.findMany({ userId: 'me' }), { enabled: canLoad })

  const wallet = data?.data?.[0]

  const formattedBalance = formatter.format(+wallet?.balance || 0)

  return (currentUser && canLoad && wallet)
    ? (
      <Card>
        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontWeight: 800 }}>{formattedBalance}</div>
            <div><FormattedMessage defaultMessage='coins' /></div>
          </div>
          <div>
            <Link to='/wallets'>
              <Button icon={<SettingFilled />} shape='circle'/>
            </Link>
          </div>
        </Space>
      </Card>
      )
    : null
}
