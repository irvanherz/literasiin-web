import { Col, Divider, Row } from 'antd'
import StoryCard from 'components/StoryCard'
import { FormattedMessage } from 'react-intl'
import { useQuery } from 'react-query'
import StoriesService from 'services/Stories'

export default function StoryRecommendations () {
  const { data } = useQuery('stories.latest', () => StoriesService.findMany({ limit: 20 }))
  const stories: any[] = data?.data || []

  return (
    <>
      <Divider><FormattedMessage defaultMessage='Other stories you may like' /></Divider>
      <Row gutter={[16, 16]} style={{ width: '100%' }}>
        {stories.map((story) => (
          <Col key={story.id} xs={24} sm={12} md={8} lg={6} xl={4} xxl={4}>
            <StoryCard story={story} />
          </Col>
        ))}
      </Row>
    </>

  )
}
