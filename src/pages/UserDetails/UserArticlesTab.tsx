import { PlusIcon } from '@heroicons/react/24/solid'
import { List, Space } from 'antd'
import ArticleCard from 'components/ArticleCard'
import useArticles from 'hooks/useArticles'
import useCurrentUser from 'hooks/useCurrentUser'
import CreateArticleButton from 'pages/ArticleListMine/CreateArticleButton'

type UserArticlesTabProps = { user: any }
export default function UserArticlesTab ({ user }: UserArticlesTabProps) {
  const currentUser = useCurrentUser()
  const { data } = useArticles({ limit: 20, userId: user?.id, sortBy: 'createdAt', sortOrder: 'DESC' }, { enabled: !!user?.id })
  const articles = data?.data || []

  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      {currentUser && currentUser?.id === user?.id
        ? (
          <div className='bg-white p-4 rounded-lg border shadow text-center'>
            <CreateArticleButton>
              <button className='btn btn-sm btn-primary'><PlusIcon className='w-4' />Buat Artikel Baru</button>
            </CreateArticleButton>
          </div>
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
