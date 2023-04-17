import { PlusOutlined } from '@ant-design/icons'
import { Button, Card, List, Space } from 'antd'
import ArticleCard from 'components/ArticleCard'
import useArticles from 'hooks/useArticles'
import useCurrentUser from 'hooks/useCurrentUser'
import CreateArticleButton from 'pages/ArticleListMine/CreateArticleButton'
import { useIntl } from 'react-intl'

type UserArticlesTabProps = { user: any }
export default function UserArticlesTab ({ user }: UserArticlesTabProps) {
  const intl = useIntl()
  const currentUser = useCurrentUser()
  const { data } = useArticles({ limit: 20, userId: user?.id, sortBy: 'createdAt', sortOrder: 'DESC' }, { enabled: !!user?.id })
  const articles = data?.data || []

  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      {currentUser && currentUser?.id === user?.id
        ? (
          <Card
            bodyStyle={{ textAlign: 'center' }}
          >
            <CreateArticleButton>
              <Button shape='round' type='primary' icon={<PlusOutlined />}>{intl.formatMessage({ defaultMessage: 'New Article' })}</Button>
            </CreateArticleButton>
          </Card>
          )
        : null
      }
      <List
        grid={{ gutter: 16, xs: 1, sm: 1, md: 1, lg: 2, xl: 2, xxl: 3 }}
        dataSource={articles}
        renderItem={article => (
          <List.Item>
            <ArticleCard article={article}/>
          </List.Item>
        )}
      />
    </Space>

  )
}
