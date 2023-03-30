import { Card, Col, Row } from 'antd'
import PageWidthAdapter from 'components/PageWidthAdapter'
import StoryCover from 'components/StoryCover'
import { useMemo } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import StoriesService from 'services/Stories'
import styled from 'styled-components'

const StyledCard = styled(Card)`
width: 100%;
.ant-card-meta {
  text-align: center;
}
.ant-card-meta-title {
  font-size: 1em;
  margin-bottom: 0 !important;
}
.ant-card-meta-description {
  font-size: 0.9em;
}
`

type StoryCardProps = {
  story: any
}

function StoryCard ({ story }: StoryCardProps) {
  const authors = useMemo(() => {
    const writers: any[] = story?.writers || []
    return writers.reduce((a, c, i, arr) => {
      if (i === arr.length - 2) {
        a.push(<Link to={`/users/${c.username}`} className='header-author'>{c.fullName}</Link>)
        a.push(<span> and </span>)
      } else if (i !== arr.length - 1) {
        a.push(<Link to={`/users/${c.username}`} className='header-author'>{c.fullName}</Link>)
        a.push(<span>, </span>)
      } else {
        a.push(<Link to={`/users/${c.username}`} className='header-author'>{c.fullName}</Link>)
      }
      return a
    }, [])
  }, [story?.writers])
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
          description={authors}
        />
      </StyledCard>
    </Link>
  )
}

export default function StoryList () {
  const { data } = useQuery('stories.latest', () => StoriesService.findMany({ limit: 20 }))
  const stories: any[] = data?.data || []

  return (
    <PageWidthAdapter style={{ marginTop: -64 }}>
      <Row gutter={[16, 16]} style={{ width: '100%' }}>
        {stories.map((story) => (
          <Col key={story.id} xs={12} sm={12} md={8} lg={6} xl={4} xxl={4}>
            <StoryCard story={story} />
          </Col>
        ))}
      </Row>
    </PageWidthAdapter>

  )
}
