import { HomeOutlined, LeftOutlined, PauseOutlined, RightOutlined, StopFilled } from '@ant-design/icons'
import { Card, Col, Row, Space } from 'antd'
import ContentGateway from 'components/ContentGateway'
import Layout from 'components/Layout'
import StoryChapterShareSegment from 'components/StoryChapterShareSegment'
import useStory from 'hooks/useStory'
import useStoryChapter from 'hooks/useStoryChapter'
import useStoryChapterContext from 'hooks/useStoryChapterContext'
import analytics from 'libs/analytics'
import { contentIdFromSlug, slugifyContentId } from 'libs/slug'
import { useEffect, useMemo } from 'react'
import { Helmet } from 'react-helmet'
import { FormattedMessage } from 'react-intl'
import { useMutation } from 'react-query'
import { Link, useParams } from 'react-router-dom'
import StoriesService from 'services/Stories'
import StoryChapterComments from './StoryChapterComments'
import StoryChapterWriter from './StoryChapterWriter'
import StoryRecommendations from './StoryRecommendations'
import VoteButton from './VoteButton'

export default function StoryChapterDetails () {
  const params = useParams()
  const chapterId = contentIdFromSlug(params?.chapterId || '')
  const { data, status, error } = useStoryChapter(chapterId, { includeStory: true })
  const viewer = useMutation(() => StoriesService.Chapters.Readers.track(chapterId))
  const chapter = data?.data
  const storyId = chapter?.storyId
  const { data: storyData } = useStory(storyId)
  const story = storyData?.data

  const { data: contextData, refetch: refetchContext } = useStoryChapterContext(chapterId)
  const context = contextData?.data

  useEffect(() => {
    if (chapterId) viewer.mutate()
  }, [chapterId])

  useEffect(() => {
    analytics.page({
      title: chapter?.title ? `${chapter.title} - Literasiin` : 'Literasiin',
      url: window.location.href
    })
  }, [chapter])

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
        <Link to={`/stories/${slugifyContentId(story)}`} className='story-chapter-nav-link'>
          <div className='story-chapter-nav-title'><HomeOutlined /></div>
          <div className='story-chapter-nav-subtitle'><FormattedMessage defaultMessage='Back to story list' /></div>
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
      if (story?.hasCompleted) {
        res.push(
          <div className='story-chapter-nav-link story-chapter-nav-link-disabled'>
            <div className='story-chapter-nav-title'><StopFilled /></div>
            <div className='story-chapter-nav-subtitle'><FormattedMessage defaultMessage='End of story' /></div>
          </div>
        )
      } else {
        res.push(
          <div className='story-chapter-nav-link story-chapter-nav-link-disabled'>
            <div className='story-chapter-nav-title'><PauseOutlined /></div>
            <div className='story-chapter-nav-subtitle'><FormattedMessage defaultMessage='To be continued' />...</div>
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
                <StoryChapterComments story={story} chapter={chapter} />
              </Space>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
              <Space direction='vertical' style={{ width: '100%' }}>
                <StoryChapterWriter story={story} />
                {story
                  ? (
                    <Card>
                      <StoryChapterShareSegment story={story} chapter={chapter} />
                    </Card>
                    )
                  : null}

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
