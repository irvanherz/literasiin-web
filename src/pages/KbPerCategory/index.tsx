import { ArrowRightOutlined } from '@ant-design/icons'
import { Avatar, Card, List, Space, Typography, theme } from 'antd'
import Layout from 'components/Layout'
import useKbCategory from 'hooks/useKbCategory'
import useKbs from 'hooks/useKbs'
import { contentIdFromSlug, slugifyContentId } from 'libs/slug'
import { DEFAULT_IMAGE } from 'libs/variables'
import Media from 'models/Media'
import { Link, useParams } from 'react-router-dom'

type KbItemProps = {
  kb: any
}

function KbItem ({ kb }: KbItemProps) {
  return (
    <Link to={`/hc/${slugifyContentId(kb.category, 'name')}/${slugifyContentId(kb)}`}>
      <List.Item extra={<ArrowRightOutlined />}>
        <List.Item.Meta
          title={kb.title}
          description={kb.description}
        />
      </List.Item>
    </Link>
  )
}

export default function KbPerCategory () {
  const { token } = theme.useToken()
  const params = useParams()
  const categoryId = contentIdFromSlug(params.categoryId || '')
  const { data: categoryData } = useKbCategory(categoryId)
  // const handleSearch = (search: string) => navigate(`/hc${qs.stringify({ search }, { addQueryPrefix: true })}`)

  const { data } = useKbs({ categoryId })
  const category = categoryData?.data
  const categoryImage = new Media(category?.image)
  const kbs = data?.data || []

  return (
    <Layout.Default style={{ background: token.colorBgBase }}>
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
        bodyStyle={{ padding: '24px 0', maxWidth: 700, margin: 'auto' }}
      >
        <Space direction='vertical' style={{ width: '100%' }}>
          <Card>
            <Card.Meta
              avatar={<Avatar shape='square' size={76} src={categoryImage?.md?.url || DEFAULT_IMAGE}/>}
              title={category?.name}
              description={category?.description}
            />
          </Card>
          <List
            bordered
            split
            dataSource={kbs}
            renderItem={kb => <KbItem kb={kb} />}
          />
        </Space>

      </Layout.Scaffold>
    </Layout.Default>
  )
}
