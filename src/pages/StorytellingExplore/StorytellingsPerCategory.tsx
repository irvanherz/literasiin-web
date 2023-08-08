import { List } from 'antd'
import StorytellingCard from 'components/StorytellingCard'
import useStorytellings from 'hooks/useStorytellings'

type StorytellingsPerCategoryProps = { category?: any }
export default function StorytellingsPerCategory ({ category }:StorytellingsPerCategoryProps) {
  const categoryId = category?.id
  const { data } = useStorytellings({ categoryId, limit: 100 })
  const storytellings = data?.data || []

  return (
    <List
      grid={{ gutter: 16, xs: 2, sm: 4, md: 4, lg: 5, xl: 5, xxl: 5 }}
      dataSource={storytellings}
      renderItem={storytelling => (
        <List.Item>
          <StorytellingCard storytelling={storytelling} />
        </List.Item>
      )}
  />
  )
}
