import { CommentOutlined } from '@ant-design/icons'
import { Button, Card, Typography, theme } from 'antd'
import ArticleImage from 'components/ArticleImage'
import RenderTimeFromNow from 'components/shared/RenderTimeFromNow'
import { slugifyContentId } from 'libs/slug'
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
  const { token } = theme.useToken()
  return (
    <Link to={`/articles/${slugifyContentId(article)}`}>
      <StyledCard
        size='small'
        cover={
          <div style={{ padding: token.paddingSM }}>
            <ArticleImage article={article} style={{ borderRadius: 10 }}/>
          </div>
        }
      >
        <Card.Meta
          title={article.title}
          description={<Typography.Paragraph ellipsis={{ rows: 2 }}>{article.description}</Typography.Paragraph>}
        />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <Link to={`/users/${article.user.username}`} style={{ color: token.colorText }}>
              <div style={{ fontWeight: 800 }}>{article.user?.fullName}</div>
              <div style={{ fontSize: 'small' }}><RenderTimeFromNow timestamp={article.createdAt} /></div>
            </Link>
          </div>
          <div style={{ flex: 0 }}>
            <Link to={`/articles/${slugifyContentId(article)}#comments`}>
              <Button shape='circle' type='ghost' icon={<CommentOutlined />} />
            </Link>
          </div>
        </div>
      </StyledCard>
    </Link>
  )
}
