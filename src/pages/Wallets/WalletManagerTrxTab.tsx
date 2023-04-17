import { List, Typography } from 'antd'
import RenderTimeFromNow from 'components/shared/RenderTimeFromNow'
import useWalletTransactions from 'hooks/useWalletTransactions'
import { FormattedMessage } from 'react-intl'

type WalletManagerTrxTabProps = {
  wallet: any
}

export default function WalletManagerTrxTab ({ wallet }: WalletManagerTrxTabProps) {
  const { data } = useWalletTransactions({ walletId: wallet.id })
  const transactions: any[] = data?.data || []
  return (
    <div>
      <List
        dataSource={transactions}
        renderItem={trx => (
          <List.Item extra={<RenderTimeFromNow timestamp={trx.createdAt} />}>
            <List.Item.Meta
              title={<Typography.Text type={trx.type === 'C' ? undefined : 'danger'}>{trx.amount}</Typography.Text>}
              description={trx.description || <i><FormattedMessage defaultMessage='No description' /></i>}
            />
          </List.Item>
        )}
      />
    </div>
  )
}
