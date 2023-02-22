import { Card, Col, Row, Space, Typography } from 'antd'
import ContentGateway from 'components/ContentGateway'
import Layout from 'components/Layout'
import StoryCover from 'components/StoryCover'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import StoriesService from 'services/Stories'
import StoryChapters from './StoryChapters'

export default function StoryDetails () {
  const params = useParams()
  const storyId = +(params?.storyId || 0)
  const { data, status, error } = useQuery<any, any, any>(['stories.details', storyId], () => StoriesService.findById(storyId))
  const story = data?.data

  return (
    <Layout.Default>
      <ContentGateway data={data?.data} status={status} error={error}>
        <Layout.Scaffold
          bodyStyle={{ padding: '16px 0' }}
          title={
            <Space size='large' style={{ alignItems: 'start' }}>
              <div style={{ minWidth: 150, maxWidth: 150 }}>
                <StoryCover story={story} />
              </div>
              <div style={{ flex: 1 }}>
                <Typography.Title style={{ marginTop: 0 }}>{story?.title}</Typography.Title>
                <Space style={{ textAlign: 'center' }}>
                  <div>
                    <div>{story?.numReads || 0}</div>
                    <div>Reads</div>
                  </div>
                  <div>
                    <div>{story?.numVotes || 0}</div>
                    <div>Votes</div>
                  </div>
                  <div>
                    <div>{story?.numChapters}</div>
                    <div>Chapters</div>
                  </div>
                </Space>
              </div>
            </Space>
        }
      >
          <Row gutter={[16, 16]}>
            <Col xs={24} md={18}>
              <Space direction='vertical' style={{ width: '100%' }}>
                <Card>
                  <Typography.Paragraph>{story?.description}</Typography.Paragraph>
                  <div>Category: {story?.category?.name || 'Uncategorized'}</div>
                </Card>
                <StoryChapters story={story} />
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
