import { Card, Col, Row, Space } from 'antd'
import ContentGateway from 'components/ContentGateway'
import Layout from 'components/Layout'
import StoryShareSegment from 'components/StoryShareSegment'
import useStoryContext from 'hooks/useStoryContext'
import analytics from 'libs/analytics'
import { useEffect, useMemo } from 'react'
import { Helmet } from 'react-helmet'
import { useMutation, useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import StoriesService from 'services/Stories'
import AuthorEditButton from './AuthorEditButton'
import BookmarkButton from './BookmarkButton'
import Header from './Header'
import RecommendedStories from './RecommendedStories'
import StoryChapters from './StoryChapters'
import Summary from './Summary'

export default function StoryDetails () {
  const params = useParams()
  const storyId = +(params?.storyId || 0)
  const tracker = useMutation(() => StoriesService.Readers.track(storyId))
  const { data, status, error } = useQuery<any, any, any>(`stories[${storyId}]`, () => StoriesService.findById(storyId))
  const { data: contextData, refetch: refetchContext } = useStoryContext(storyId)
  const story = data?.data
  const context = contextData?.data

  useEffect(() => {
    tracker.mutate()
  }, [storyId])

  const documentTitle = useMemo(() => story?.title ? `${story.title} - Literasiin` : '', [story])

  useEffect(() => {
    if (documentTitle) {
      analytics.page({
        title: documentTitle,
        url: window.location.href
      })
    }
  }, [documentTitle])

  return (
    <Layout.Default>
      <ContentGateway data={data?.data} status={status} error={error}>
        <Layout.Scaffold
          bodyStyle={{ padding: '16px 0' }}
          title={
            <Header story={story} />
          }
          actions={[
            <BookmarkButton key='bookmark' story={story} context={context} afterUpdated={refetchContext} />,
            <AuthorEditButton key='settings' story={story} />
          ]}
          actionsContainerStyle={{ alignSelf: 'start' }}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} md={16}>
              <Space direction='vertical' style={{ width: '100%' }}>
                <Summary story={story}/>
                <StoryChapters story={story} />
              </Space>
            </Col>
            <Col xs={24} md={8}>
              <Space direction='vertical' style={{ width: '100%' }}>
                <Card bodyStyle={{ textAlign: 'center' }}>
                  <StoryShareSegment story={story}/>
                </Card>
                <RecommendedStories />
              </Space>
            </Col>
          </Row>
        </Layout.Scaffold>
      </ContentGateway>
      <Helmet>
        <title>{documentTitle || 'Literasiin'}</title>
      </Helmet>
    </Layout.Default>
  )
}
