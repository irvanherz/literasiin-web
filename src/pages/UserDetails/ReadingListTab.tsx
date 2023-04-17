import { Card, List, Space } from 'antd'
import ArticleCard from 'components/ArticleCard'
import StoryCard from 'components/StoryCard'
import useArticles from 'hooks/useArticles'
import useStories from 'hooks/useStories'
import { FormattedMessage } from 'react-intl'

type ArticleReadingListProps = { user: any }
function ArticleReadingList ({ user }: ArticleReadingListProps) {
  const { data } = useArticles({ limit: 20, bookmarkedByUserId: user?.id, sortBy: 'reader.createdAt', sortOrder: 'DESC' }, { enabled: !!user?.id })
  const articles = data?.data || []

  return (
    <List
      grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 2, xxl: 2 }}
      dataSource={articles}
      renderItem={article => (
        <List.Item>
          <ArticleCard article={article}/>
        </List.Item>
      )}
    />
  )
}

type StoryReadingListProps = { user: any }
function StoryReadingList ({ user }: StoryReadingListProps) {
  const { data } = useStories({ limit: 20, bookmarkedByUserId: user?.id, sortBy: 'reader.createdAt', sortOrder: 'DESC' }, { enabled: !!user?.id })
  const stories = data?.data || []

  return (
    <List
      grid={{ gutter: 16, xs: 2, sm: 2, md: 3, lg: 4, xl: 4, xxl: 4 }}
      dataSource={stories}
      renderItem={story => (
        <List.Item>
          <StoryCard story={story}/>
        </List.Item>
      )}
    />
  )
}

type ReadingListTabProps = { user: any }
export default function ReadingListTab ({ user }: ReadingListTabProps) {
  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      <Card title={<FormattedMessage defaultMessage="Stories" />}>
        <StoryReadingList user={user} />
      </Card>
      <Card title={<FormattedMessage defaultMessage="Articles" />}>
        <ArticleReadingList user={user} />
      </Card>
    </Space>
  )
}
