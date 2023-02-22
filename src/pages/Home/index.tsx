import { Space } from 'antd'
import Layout from '../../components/Layout'
import ArticleList from './ArticleList'
import Banner from './Banner'
import StoryList from './StoryList'

export default function Home () {
  return (
    <Layout.Default>
      <Layout.Scaffold withHeader={false}>
        <Space direction='vertical' style={{ width: '100%' }}>
          <Banner />
          <StoryList />
          <ArticleList />
        </Space>
      </Layout.Scaffold>
    </Layout.Default>
  )
}
