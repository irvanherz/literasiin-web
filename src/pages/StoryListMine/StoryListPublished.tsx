import { List } from 'antd'
import StoryListItem from 'components/StoryListItem'
import { useQuery } from 'react-query'
import StoriesService from 'services/Stories'

export default function StoryListPublished () {
  const { data } = useQuery('stories.mine.published', () => StoriesService.findMany())
  const stories = data?.data || []

  return (
    <List
      dataSource={stories}
      renderItem={story => (
        <StoryListItem story={story} />
      )}
    />
  )
}
