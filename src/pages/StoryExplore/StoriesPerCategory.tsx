import { List } from 'antd'
import StoryCard from 'components/StoryCard'
import useStories from 'hooks/useStories'

type StoriesPerCategoryProps = { category?: any }
export default function StoriesPerCategory ({ category }:StoriesPerCategoryProps) {
  const categoryId = category?.id
  const { data } = useStories({ categoryId, limit: 100 })
  const stories = data?.data || []

  return (
    <List
      grid={{ gutter: 16, xs: 2, sm: 4, md: 4, lg: 5, xl: 5, xxl: 5 }}
      dataSource={stories}
      renderItem={story => (
        <List.Item>
          <StoryCard story={story} />
        </List.Item>
      )}
  />
  )
}
