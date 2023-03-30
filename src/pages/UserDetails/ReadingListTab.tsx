import { List } from 'antd'
import StoryCard from 'components/StoryCard'
import useStories from 'hooks/useStories'

type StoryListItemProps = { story: any }

function StoryListItem ({ story }: StoryListItemProps) {
  return (
    <List.Item>
      <StoryCard story={story}/>
    </List.Item>
  )
}

export default function ReadingListTab () {
  const { data } = useStories({ limit: 20, bookmarkedByUserId: 'me', sortBy: 'reader.createdAt', sortOrder: 'DESC' })
  const stories = data?.data || []

  return (
    <List
      grid={{ gutter: 16, xs: 2, sm: 3, md: 4, lg: 4, xl: 4, xxl: 4 }}
      dataSource={stories}
      renderItem={story => <StoryListItem story={story} />}
    />
  )
}
