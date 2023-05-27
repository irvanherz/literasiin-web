import { Card, Descriptions, List, Space, Typography } from 'antd'
import usePublicationCalculatePayment from 'hooks/usePublicationCalculatePayment'

const formatter = new Intl.NumberFormat('id-ID')

type ReviewSectionProps = {
  publication: any
}

export default function ReviewSection ({ publication }: ReviewSectionProps) {
  const { data } = usePublicationCalculatePayment(publication.id)
  const info = data?.data || {}
  const breakdown = info.breakdown || []

  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      <div>
        <Typography.Title level={3}>Tinggal selangkah lagi!</Typography.Title>
        <Typography.Paragraph>Mohon periksa detail submission kamu di bawah ini.</Typography.Paragraph>
      </div>
      <Card type='inner'>
        <Descriptions>
          <Descriptions.Item label="Judul">{publication.title}</Descriptions.Item>
          <Descriptions.Item label="Penulis">{publication.author}</Descriptions.Item>
          <Descriptions.Item label="Jenis Penerbitan">{publication.type}</Descriptions.Item>
          <Descriptions.Item label="Pengiriman" span={3}>{publication.meta?.shipping?.courier_name} - {publication.meta?.shipping?.courier_service_name}</Descriptions.Item>
          <Descriptions.Item label="Alamat Kirim">{publication.address?.address}</Descriptions.Item>
        </Descriptions>
      </Card>
      <List
        bordered
        header="Rincian Biaya"
      >
        {breakdown.map((item: any) => (
          <List.Item key={item.name} extra={formatter.format(item.totalPrice)}>
            <List.Item.Meta
              title={item.name}
            />
          </List.Item>
        ))}
        {info.totalPrice && (
          <List.Item extra={formatter.format(info.totalPrice)}>
            <List.Item.Meta
              title="Total"
            />
          </List.Item>
        )}
      </List>
    </Space>
  )
}
