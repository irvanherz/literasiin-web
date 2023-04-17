import { List } from 'antd'
import StoryCard from 'components/StoryCard'
import useStories from 'hooks/useStories'

type UserStoriesTabProps = { user: any }
export default function UserStoriesTab ({ user }: UserStoriesTabProps) {
  const { data } = useStories({ limit: 20, userId: user?.id, sortBy: 'createdAt', sortOrder: 'DESC' }, { enabled: !!user?.id })
  const stories = data?.data || []

  return (
    <List
      grid={{ gutter: 16, xs: 2, sm: 3, md: 4, lg: 4, xl: 4, xxl: 4 }}
      dataSource={stories}
      renderItem={story => (
        <List.Item>
          <StoryCard story={story}/>
        </List.Item>
      )}
    />
  )
}
