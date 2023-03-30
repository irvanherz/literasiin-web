import { Col, Row, Space, Typography } from 'antd'
import Layout from 'components/Layout'
import PageWidthAdapter from 'components/PageWidthAdapter'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import KbsService from 'services/Kbs'

export default function KbDetails () {
  const params = useParams()
  const kbId = +(params?.kbId || 0)
  const { data } = useQuery<any, any, any>(`kbs[${kbId}]`, () => KbsService.findById(kbId))
  const kb = data?.data

  return (
    <Layout.Default>
      <PageWidthAdapter style={{ maxWidth: 920 }}>
        <div style={{ padding: '24px 0' }}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Space direction='vertical' style={{ width: '100%', textAlign: 'center' }}>
                <Typography.Title level={2}>{kb?.title}</Typography.Title>
                <Typography.Paragraph>{kb?.description}</Typography.Paragraph>
              </Space>
            </Col>
            <Col span={24}>
              <div dangerouslySetInnerHTML={{ __html: kb?.content }}></div>
            </Col>
          </Row>
        </div>
      </PageWidthAdapter>
    </Layout.Default>
  )
}
