import { Button, Card, Space } from 'antd'
import TopupButton from 'components/shared/TopupButton'
import useCurrentUser from 'hooks/useCurrentUser'
import { useQuery } from 'react-query'
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
            <div>koin</div>
          </div>
          <div>
            <TopupButton>
              <Button>Topup</Button>
            </TopupButton>
          </div>
        </Space>
      </Card>
      )
    : null
}
