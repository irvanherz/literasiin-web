import { Card, Col, Row, Typography } from 'antd'
import { useMemo, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import WalletManagerTopupTab from './WalletManagerTopupTab'
import WalletManagerTrxTab from './WalletManagerTrxTab'
import WalletManagerWithdrawTab from './WalletManagerWithdrawTab'

const formatter = new Intl.NumberFormat('id-ID')

type WalletManagerProps = { wallet: any }
export default function WalletManager ({ wallet }: WalletManagerProps) {
  const formattedBalance = formatter.format(+wallet?.balance || 0)
  const [tab, setTab] = useState('transactions')

  const content = useMemo(() => {
    switch (tab) {
      case 'topup':
        return <WalletManagerTopupTab wallet={wallet} />
      case 'withdraw':
        return <WalletManagerWithdrawTab wallet={wallet} />
      default:
        return <WalletManagerTrxTab wallet={wallet} />
    }
  }, [tab])

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Card bodyStyle={{ textAlign: 'center' }}>
          <Typography.Title level={2} style={{ margin: 0 }}>{formattedBalance}</Typography.Title>
          <Typography.Text strong><FormattedMessage defaultMessage='COINS' /></Typography.Text>
        </Card>
      </Col>
      <Col span={24}>
        <Card
          onTabChange={setTab}
          tabList={[
            { key: 'transactions', tab: 'Transactions' },
            { key: 'topup', tab: 'Topup' },
            { key: 'withdraw', tab: 'Withdraw' }
          ]}
        >
          {content}
        </Card>
      </Col>
    </Row>
  )
}
