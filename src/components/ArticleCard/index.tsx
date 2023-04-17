import { Card, Typography } from 'antd'
import ArticleImage from 'components/ArticleImage'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledCard = styled(Card)`
width: 100%;
height: 100%;
overflow: hidden;
`

type ArticleCardProps = {
  article: any
}
export default function ArticleCard ({ article }: ArticleCardProps) {
  return (
    <Link to={`/articles/${article.id}`}>
      <StyledCard
        size='small'
        cover={
          <ArticleImage article={article} style={{ borderRadius: 10 }}/>
        }
      >
        <Card.Meta
          title={article.title}
          description={<Typography.Paragraph ellipsis={{ rows: 2 }}>{article.description}</Typography.Paragraph>}
        />
      </StyledCard>
    </Link>
  )
}
