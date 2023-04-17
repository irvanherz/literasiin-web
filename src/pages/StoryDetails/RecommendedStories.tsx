import { StarFilled } from '@ant-design/icons'
import { Card, List, Space } from 'antd'
import StoryCover from 'components/StoryCover'
import { useMemo } from 'react'
import { FormattedMessage } from 'react-intl'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import StoriesService from 'services/Stories'

type StoryItemProps = {
  story: any
}
function StoryItem ({ story }: StoryItemProps) {
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
    <Link to={`/stories/${story?.id}`}>
      <List.Item
        extra={
          <Space>
            <span>{story?.meta?.numVotes || 0}</span>
            <StarFilled style={{ color: 'yellow' }} />
          </Space>
        }
      >
        <List.Item.Meta
          avatar={
            <div style={{ width: 64 }}>
              <StoryCover story={story} containerStyle={{ borderRadius: 8, overflow: 'hidden' }} />
            </div>
          }
          title={story?.title}
          description={authors}
              />
      </List.Item>
    </Link>
  )
}

export default function RecommendedStories () {
  const { data } = useQuery('stories[recommended]', () => StoriesService.findMany({ limit: 5 }))
  const stories: any[] = data?.data || []

  return (
    <Card title={<FormattedMessage defaultMessage='Recommended Stories'/>}>
      <List
        dataSource={stories}
        renderItem={story => <StoryItem story={story} />}
      />
    </Card>

  )
}
