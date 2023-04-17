import { ShareAltOutlined } from '@ant-design/icons'
import { Button, Card, Col, Row, Space, Typography } from 'antd'
import KbShareButton from 'components/KbShareButton'
import Layout from 'components/Layout'
import PageWidthAdapter from 'components/PageWidthAdapter'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import KbsService from 'services/Kbs'
import KbOtherMessage from './KbOtherMessage'
import KbRelatedList from './KbRelatedList'

export default function KbDetails () {
  const params = useParams()
  const kbId = +(params?.kbId || 0)
  const { data } = useQuery<any, any, any>(`kbs[${kbId}]`, () => KbsService.findById(kbId))
  const kb = data?.data

  return (
    <Layout.Default>
      <PageWidthAdapter>
        <Row gutter={[16, 16]} style={{ padding: '24px 0' }}>
          <Col xs={24} sm={24} md={16} lg={16} xl={16} xxl={16}>
            <Card
              actions={[
                <KbShareButton key='share' kb={kb}>
                  <Button type='link' icon={<ShareAltOutlined />}>Share</Button>
                </KbShareButton>
              ]}
            >
              <Space direction='vertical' style={{ width: '100%' }}>
                <Typography.Title level={2} style={{ margin: 0 }}>{kb?.title}</Typography.Title>
                <Typography.Paragraph>{kb?.description}</Typography.Paragraph>
                <div dangerouslySetInnerHTML={{ __html: kb?.content }}></div>
              </Space>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
            <KbRelatedList kb={kb} />
          </Col>
          <Col span={24}>
            <KbOtherMessage />
          </Col>
        </Row>
      </PageWidthAdapter>
    </Layout.Default>
  )
}
