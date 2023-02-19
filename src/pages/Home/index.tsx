import { List, Space } from 'antd'
import AuthorCardCarousel from 'components/AuthorCardCarousel'
import { useQuery } from 'react-query'
import StoriesService from 'services/Stories'
import styled from 'styled-components'
import Layout from '../../components/Layout'
import StoryCard from '../../components/StoryCard'
import Banner from './Banner'

const StyledList = styled(List)`
.ant-list-item {
  padding: 8px;
}
`
export default function Home () {
  const { data: storiesData } = useQuery(['stories', 'newest'], () => StoriesService.findMany({}))
  const { data = [] } = storiesData || {}

  return (
    <Layout.Default>
      <Layout.Scaffold withHeader={false}>
        <Space direction='vertical' style={{ width: '100%' }}>
          <Banner />
          <StyledList
            grid={{ column: 4, gutter: 8 }}
            dataSource={data}
            renderItem={story => (
              <List.Item>
                <StoryCard story={story} />
              </List.Item>

            )}
          />
          <AuthorCardCarousel />
        </Space>
      </Layout.Scaffold>
    </Layout.Default>
  )
}
