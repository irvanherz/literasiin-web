import { Button, Col, List, Row, Tabs, theme, Typography } from 'antd'
import ArticleCard from 'components/ArticleCard'
import PageWidthAdapter from 'components/PageWidthAdapter'
import useArticlesInfinite from 'hooks/useArticlesInfinite'
import { FormattedMessage } from 'react-intl'
import { useQuery } from 'react-query'
import ArticlesService from 'services/Articles'
import styled from 'styled-components'

type ArticleListPerCategoryProps = {
  category: any
}

function ArticleListPerCategory ({ category }: ArticleListPerCategoryProps) {
  const categoryId = +(category?.id || 0)
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useArticlesInfinite({ categoryId: categoryId || undefined, limit: 12 })
  const articles: any[] = data?.pages.reduce<any>((a, c) => [...a, ...c?.data], [])

  return (
    <Row gutter={[16, 16]} style={{ width: '100%' }}>
      <Col span={24}>
        <List
          grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3, xl: 4, xxl: 4 }}
          dataSource={articles}
          renderItem={article => (
            <List.Item>
              <ArticleCard article={article} />
            </List.Item>
          )}
          footer={hasNextPage && (
            <div style={{ textAlign: 'center' }}>
              <Button onClick={() => fetchNextPage({})} loading={isFetchingNextPage}>Load More Articles</Button>
            </div>
          )}
        />
      </Col>
    </Row>
  )
}

const ArticleListContainer = styled.div`
padding: 24px 0 24px 0;
`

export default function ArticleList () {
  const { token } = theme.useToken()
  const { data } = useQuery('articles.categories[]', () => ArticlesService.Categories.findMany())
  const categories: any[] = data?.data || []
  return (
    <ArticleListContainer style={{ background: token.colorBgLayout }}>
      <PageWidthAdapter>
        <Tabs tabPosition='top' tabBarExtraContent={<Typography.Text strong style={{ paddingLeft: 16 }}><FormattedMessage defaultMessage='List of Articles' /></Typography.Text>}>
          <Tabs.TabPane tab="All" key={0}><ArticleListPerCategory category={undefined} /></Tabs.TabPane>
          {categories.map(cat => (
            <Tabs.TabPane tab={cat.name} key={cat.id}><ArticleListPerCategory category={cat} /></Tabs.TabPane>
          ))}
        </Tabs>
      </PageWidthAdapter>
    </ArticleListContainer>
  )
}
