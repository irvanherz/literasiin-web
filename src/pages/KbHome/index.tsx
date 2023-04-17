import { Avatar, Card, List, Space, Typography } from 'antd'
import Layout from 'components/Layout'
import { DEFAULT_IMAGE } from 'libs/variables'
import Media from 'models/Media'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import KbsService from 'services/Kbs'
import styled from 'styled-components'

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
    <StyledKbCategoryCard style={{ textAlign: 'center' }}>
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

const StyledList = styled(List)`
.ant-col {
  height: 100%;
}
`

export default function KbHome () {
  // const navigate = useNavigate()
  const { data } = useQuery<any, any, any>('kbs.categories[]', () => KbsService.Categories.findMany())
  const categories: any[] = data?.data || []

  // const handleSearch = (search: string) => navigate(`/hc${qs.stringify({ search }, { addQueryPrefix: true })}`)

  return (
    <Layout.Default>
      <Layout.Scaffold
        headerStyle={{ textAlign: 'center' }}
        title={
          <Space direction='vertical' style={{ width: '100%' }}>
            <Typography.Title style={{ margin: 0 }}>Help Center</Typography.Title>
            <Typography.Text>Explore help content</Typography.Text>
            {/* <div>
              <Input.Search allowClear placeholder='Search help...' style={{ maxWidth: 500 }} onSearch={handleSearch}/>
            </div> */}
          </Space>
        }
        bodyStyle={{ padding: '24px 0' }}
      >
        <StyledList
          grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 4 }}
          dataSource={categories}
          renderItem={(category: any) => (
            <List.Item style={{ height: '100%' }}>
              <Link to={`/hc/${category.id}`}>
                <KbCategoryCard category={category} />
              </Link>
            </List.Item>
          )}
        />
      </Layout.Scaffold>
    </Layout.Default>
  )
}
