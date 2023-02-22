import { Avatar, Card, Col, Row } from 'antd'
import ContentGateway from 'components/ContentGateway'
import Layout from 'components/Layout'
import { DEFAULT_PHOTO } from 'libs/variables'
import Media from 'models/Media'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import StoriesService from 'services/Stories'

export default function StoryChapterDetails () {
  const params = useParams()
  const chapterId = +(params?.chapterId || 0)
  const { data, status, error } = useQuery<any, any, any>(`stories.chapters[${chapterId}]`, () => StoriesService.Chapters.findById(chapterId, { includeStory: true }))
  const chapter = data?.data
  const user = chapter?.story?.user
  const avatar = new Media(user?.photo || {})

  return (
    <Layout.Default>
      <ContentGateway data={data?.data} status={status} error={error}>
        <Layout.Scaffold
          bodyStyle={{ padding: '16px 0' }}
          title={'Judul'}
          description={chapter?.title}
      >
          <Row gutter={[16, 16]}>
            <Col span={16}>
              <Card>
                <div dangerouslySetInnerHTML={{ __html: chapter?.content || '' }}></div>
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Card.Meta
                  avatar={<Avatar src={avatar.md?.url || DEFAULT_PHOTO} />}
                  title={user?.fullName || 'User'}
                  description={'Writer'}
                />
              </Card>
            </Col>
          </Row>
        </Layout.Scaffold>
      </ContentGateway>

    </Layout.Default>
  )
}
