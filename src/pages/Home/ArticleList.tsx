import { Card, Col, Row, Tabs } from 'antd'
import ArticleImage from 'components/ArticleImage'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import ArticlesService from 'services/Articles'
import styled from 'styled-components'

const StyledCard = styled(Card)`
width: 100%;
`

type ArticleCardProps = {
  article: any
}
function ArticleCard ({ article }: ArticleCardProps) {
  return (
    <Link to={`/articles/${article.id}`}>
      <StyledCard
        size='small'
        cover={
          <ArticleImage article={article} />
        }
      >
        <Card.Meta
          title={article.title}
          description={article.description}
        />
      </StyledCard>
    </Link>
  )
}

type ArticleListPerCategoryProps = {
  category: any
}

function ArticleListPerCategory ({ category }: ArticleListPerCategoryProps) {
  const categoryId = +(category?.id || 0)
  const { data } = useQuery(`articles[cat:${categoryId}][]`, () => ArticlesService.findMany({ categoryId: categoryId || undefined }))
  const articles: any[] = data?.data || []
  return (
    <Row gutter={[16, 16]} style={{ width: '100%' }}>
      {articles.map((article) => (
        <Col key={article.id} xs={24} sm={12} md={8} lg={8} xl={8} xxl={8}>
          <ArticleCard article={article} />
        </Col>
      ))}
    </Row>
  )
}

export default function ArticleList () {
  const { data } = useQuery('articles.categories[]', () => ArticlesService.Categories.findMany())
  const categories: any[] = data?.data || []
  return (
    <Tabs tabPosition='top'>
      <Tabs.TabPane tab="All" key={0}><ArticleListPerCategory category={undefined} /></Tabs.TabPane>
      {categories.map(cat => (
        <Tabs.TabPane tab={cat.name} key={cat.id}><ArticleListPerCategory category={cat} /></Tabs.TabPane>
      ))}
    </Tabs>
  )
}
