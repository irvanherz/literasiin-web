import { Card, Col, Row } from 'antd'
import PageWidthAdapter from 'components/PageWidthAdapter'
import StoryCover from 'components/StoryCover'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import StoriesService from 'services/Stories'
import styled from 'styled-components'

const StyledCard = styled(Card)`
width: 100%;
`

type StoryCardProps = {
  story: any
}

function StoryCard ({ story }: StoryCardProps) {
  return (
    <Link to={`/stories/${story.id}`}>
      <StyledCard
        size='small'
        cover={
          <StoryCover story={story} />
        }
      >
        <Card.Meta
          title={story.title}
          description={story.description}
        />
      </StyledCard>
    </Link>
  )
}

export default function StoryList () {
  const { data } = useQuery('stories.latest', () => StoriesService.findMany({ limit: 20 }))
  const stories: any[] = data?.data || []

  return (
    <PageWidthAdapter>
      <Row gutter={[16, 16]} style={{ width: '100%' }}>
        {stories.map((story) => (
          <Col key={story.id} xs={24} sm={12} md={8} lg={6} xl={4} xxl={4}>
            <StoryCard story={story} />
          </Col>
        ))}
      </Row>
    </PageWidthAdapter>

  )
}
