import { List } from 'antd'
import StoryListItem from 'components/StoryListItem'
import useCurrentUser from 'hooks/useCurrentUser'
import { useQuery } from 'react-query'
import StoriesService from 'services/Stories'

export default function StoryListAny () {
  const user = useCurrentUser()
  const { data } = useQuery(
    'stories.mine.any',
    () => StoriesService.findMany({ userId: user.id, limit: 100 })
  )
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
