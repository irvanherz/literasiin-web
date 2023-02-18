import { Card, Col, Menu, Row, Space, Typography } from 'antd'
import ContentGateway from 'components/ContentGateway'
import Layout from 'components/Layout'
import StoryCover from 'components/StoryCover'
import { DEFAULT_IMAGE } from 'libs/variables'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import StoriesService from 'services/Stories'

export default function StoryDetails () {
  const params = useParams()
  const storyId = +(params?.storyId || 0)
  const { data, status, error } = useQuery<any, any, any>(['stories.details', storyId], () => StoriesService.findById(storyId))
  const story = data?.data || {}

  return (
    <Layout.Default>
      <ContentGateway data={data?.data} status={status} error={error}>
        <Layout.Scaffold
          bodyStyle={{ padding: '16px 0' }}
          title={
            <Space size='large' style={{ alignItems: 'start' }}>
              <div style={{ minWidth: 150, maxWidth: 150 }}>
                <StoryCover src={DEFAULT_IMAGE} />
              </div>
              <div style={{ flex: 1 }}>
                <Typography.Title style={{ marginTop: 0 }}>{story.title}</Typography.Title>
                <Space>
                  <div>Read</div>
                  <div>Vote</div>
                  <div>Chapters</div>
                </Space>
              </div>
            </Space>
        }
      >
          <Row gutter={[16, 16]}>
            <Col xs={24} md={18}>
              <Space direction='vertical' style={{ width: '100%' }}>
                <Card>
                  <Typography.Paragraph>{story.description}</Typography.Paragraph>
                  <div>Copyright</div>
                  <div>tags</div>
                </Card>
                <Card title="Chapters">
                  <Menu items={[{ key: '1', label: 'Chapter 1' }, { key: '2', label: 'Chapter 2' }]} />
                </Card>
              </Space>
            </Col>
            <Col xs={24} md={6}>
              Recommended
            </Col>
          </Row>
        </Layout.Scaffold>
      </ContentGateway>

    </Layout.Default>
  )
}
