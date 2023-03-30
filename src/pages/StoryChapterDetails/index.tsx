import { HomeOutlined, LeftOutlined, PauseOutlined, RightOutlined, StopFilled } from '@ant-design/icons'
import { Avatar, Card, Col, Row, Space } from 'antd'
import ContentGateway from 'components/ContentGateway'
import Layout from 'components/Layout'
import StoryChapterShareSegment from 'components/StoryChapterShareSegment'
import useStoryChapterContext from 'hooks/useStoryChapterContext'
import { DEFAULT_PHOTO } from 'libs/variables'
import Media from 'models/Media'
import { useEffect, useMemo } from 'react'
import { Helmet } from 'react-helmet'
import { useMutation, useQuery } from 'react-query'
import { Link, useParams } from 'react-router-dom'
import StoriesService from 'services/Stories'
import StoryChapterComments from './StoryChapterComments'
import StoryRecommendations from './StoryRecommendations'
import VoteButton from './VoteButton'

export default function StoryChapterDetails () {
  const params = useParams()
  const chapterId = +(params?.chapterId || 0)
  const { data, status, error } = useQuery<any, any, any>(`stories.chapters[${chapterId}]`, () => StoriesService.Chapters.findById(chapterId, { includeStory: true }))
  const viewer = useMutation(() => StoriesService.Chapters.Readers.track(chapterId))
  const chapter = data?.data
  const story = chapter?.story
  const user = chapter?.story?.user
  const avatar = new Media(user?.photo || {})

  const { data: contextData, refetch: refetchContext } = useStoryChapterContext(chapterId)
  const context = contextData?.data

  useEffect(() => {
    if (status === 'success' && chapterId) viewer.mutate()
  }, [status, chapterId])

  const navActions = useMemo(() => {
    const res: any[] = []
    if (context?.prevChapter) {
      res.push(
        <Link to={`/stories/chapters/${context?.prevChapter?.id}`} className='story-chapter-nav-link'>
          <div className='story-chapter-nav-title'><LeftOutlined /></div>
          <div className='story-chapter-nav-subtitle'>{context?.prevChapter?.title}</div>
        </Link>
      )
    } else {
      res.push(
        <Link to={`/stories/${story?.id}`} className='story-chapter-nav-link'>
          <div className='story-chapter-nav-title'><HomeOutlined /></div>
          <div className='story-chapter-nav-subtitle'>Back to story list</div>
        </Link>
      )
    }
    if (context?.nextChapter) {
      res.push(
        <Link to={`/stories/chapters/${context.nextChapter?.id}`} className='story-chapter-nav-link'>
          <div className='story-chapter-nav-title'><RightOutlined /></div>
          <div className='story-chapter-nav-subtitle'>{context.nextChapter?.title}</div>
        </Link>
      )
    } else {
      if (story.hasCompleted) {
        res.push(
          <div className='story-chapter-nav-link story-chapter-nav-link-disabled'>
            <div className='story-chapter-nav-title'><StopFilled /></div>
            <div className='story-chapter-nav-subtitle'>End of Chapter</div>
          </div>
        )
      } else {
        res.push(
          <div className='story-chapter-nav-link story-chapter-nav-link-disabled'>
            <div className='story-chapter-nav-title'><PauseOutlined /></div>
            <div className='story-chapter-nav-subtitle'>To be continued...</div>
          </div>
        )
      }
    }
    return res
  }, [story, context])

  return (
    <Layout.Default>
      <ContentGateway data={data?.data} status={status} error={error}>
        <Layout.Scaffold
          bodyStyle={{ padding: '16px 0' }}
          title={story?.title}
          description={chapter?.title}
          actions={[
            <VoteButton key='vote' chapter={chapter} context={context} afterUpdated={refetchContext} />
          ]}
      >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={12} lg={16} xl={16} xxl={16}>
              <Space direction='vertical' style={{ width: '100%' }}>
                <Card
                  actions={navActions}
                >
                  <div dangerouslySetInnerHTML={{ __html: chapter?.content || '' }}></div>
                </Card>
                <StoryChapterComments />
              </Space>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
              <Space direction='vertical' style={{ width: '100%' }}>
                <Card>
                  <Card.Meta
                    avatar={<Avatar src={avatar.md?.url || DEFAULT_PHOTO} />}
                    title={user?.fullName || 'User'}
                    description={'Writer'}
                />
                </Card>
                <Card>
                  <StoryChapterShareSegment story={story} chapter={chapter} />
                </Card>
              </Space>
            </Col>
            <Col span={24}>
              <StoryRecommendations />
            </Col>
          </Row>
        </Layout.Scaffold>
      </ContentGateway>
      <Helmet>
        <title>{chapter?.title ? `${chapter.title} - Literasiin` : 'Literasiin'}</title>
      </Helmet>
    </Layout.Default>
  )
}
