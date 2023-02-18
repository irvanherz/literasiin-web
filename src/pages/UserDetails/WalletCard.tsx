import { Button, Card, Space } from 'antd'

export default function WalletCard () {
  return (
    <Card>
      <Space style={{ width: '100%', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontWeight: 800 }}>10.000</div>
          <div>koin</div>
        </div>
        <div><Button>Topup</Button></div>
      </Space>
    </Card>
  )
}
