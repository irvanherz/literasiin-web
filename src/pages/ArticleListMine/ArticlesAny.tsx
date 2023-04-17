import { List } from 'antd'
import ArticleListItem from 'components/ArticleListItem'
import useArticles from 'hooks/useArticles'
import useCurrentUser from 'hooks/useCurrentUser'

export default function ArticlesAny () {
  const user = useCurrentUser()
  const { data, refetch } = useArticles({ userId: user.id, limit: 100, status: 'any' })
  const articles = data?.data || []

  return (
    <List
      dataSource={articles}
      renderItem={article => (
        <ArticleListItem article={article} afterUpdated={refetch} afterDeleted={refetch} />
      )}
    />
  )
}
