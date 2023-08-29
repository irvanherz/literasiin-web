import { Avatar, Card, List, Space, Typography, theme } from 'antd'
import Layout from 'components/Layout'
import { slugifyContentId } from 'libs/slug'
import { DEFAULT_IMAGE } from 'libs/variables'
import Media from 'models/Media'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import KbsService from 'services/Kbs'
import styled from 'styled-components'
import KbSearchBox from './KbSearchBox'

const StyledKbCategoryCard = styled(Card)`
height: 100%;
img {
  width: 100%;
  max-width: 100px;
}
.ant-card-meta-title {
  font-weight: 900;
  margin-bottom: 0 !important;
}
`

type KbCategoryCardProps = { category: any }

function KbCategoryCard ({ category }: KbCategoryCardProps) {
  const image = new Media(category?.image)
  return (
    <StyledKbCategoryCard hoverable size='small' style={{ textAlign: 'center' }}>
      <Space direction='vertical' style={{ width: '100%' }}>
        <Avatar src={image.md?.url || DEFAULT_IMAGE} size={64} shape='square' />
        <Card.Meta
          title={category?.name}
          description={category?.description}
        />
      </Space>
    </StyledKbCategoryCard>
  )
}

const StyledList = styled(List)``

export default function KbHome () {
  // const navigate = useNavigate()
  const { token } = theme.useToken()
  const { data } = useQuery<any, any, any>('kbs.categories[]', () => KbsService.Categories.findMany())
  const categories: any[] = data?.data || []

  // const handleSearch = (search: string) => navigate(`/hc${qs.stringify({ search }, { addQueryPrefix: true })}`)

  return (
    <Layout.Default style={{ background: token.colorBgBase }}>
      <Layout.Scaffold
        headerStyle={{ textAlign: 'center', background: token.colorBgBase }}
        extraStyle={{ background: token.colorBgBase }}
        title={
          <Space direction='vertical' style={{ width: '100%' }}>
            <Typography.Title style={{ margin: 0 }}>Help Center</Typography.Title>
            <Typography.Text>Explore help content</Typography.Text>
          </Space>
        }
        bodyStyle={{ padding: '24px 0' }}
        extra={
          <div style={{ maxWidth: 400, margin: 'auto' }}>
            <KbSearchBox />
          </div>
        }
      >
        <StyledList
          grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 4 }}
          dataSource={categories}
          renderItem={(category: any) => (
            <List.Item style={{ height: '100%' }}>
              <Link to={`/hc/${slugifyContentId(category, 'name')}`}>
                <KbCategoryCard category={category} />
              </Link>
            </List.Item>
          )}
        />
      </Layout.Scaffold>
    </Layout.Default>
  )
}
