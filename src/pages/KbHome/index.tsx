import { Card, Input, List, Space, Typography } from 'antd'
import Layout from 'components/Layout'
import PageWidthAdapter from 'components/PageWidthAdapter'
import qs from 'qs'
import { useQuery } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'
import KbsService from 'services/Kbs'

export default function KbHome () {
  const navigate = useNavigate()
  const { data } = useQuery<any, any, any>('kbs.categories[]', () => KbsService.Categories.findMany())
  const categories: any[] = data?.data || []

  const handleSearch = (search: string) => navigate(`/hc${qs.stringify({ search }, { addQueryPrefix: true })}`)

  return (
    <Layout.Default>
      <Space direction='vertical' style={{ width: '100%' }}>
        <div style={{ background: '#bdffd7', padding: '24px 0' }}>
          <PageWidthAdapter style={{ textAlign: 'center' }}>
            <Space direction='vertical' style={{ width: '100%' }}>
              <Typography.Title style={{ margin: 0 }}>Help Center</Typography.Title>
              <Typography.Text>Explore help content</Typography.Text>
              <div>
                <Input.Search allowClear placeholder='Search help...' style={{ maxWidth: 500 }} onSearch={handleSearch}/>
              </div>
            </Space>
          </PageWidthAdapter>
        </div>
        <div>
          <PageWidthAdapter>
            <List
              grid={{ gutter: 16, xs: 2, sm: 3, md: 4, lg: 4, xl: 4, xxl: 4 }}
              dataSource={categories}
              renderItem={category => (
                <List.Item>
                  <Link to={`/hc/categories/${category.id}`}>
                    <Card style={{ textAlign: 'center' }}>
                      <Card.Meta
                        title={category?.title}
                        description={category?.description}
                      />
                    </Card>
                  </Link>

                </List.Item>
              )}
            />
          </PageWidthAdapter>
        </div>
      </Space>
    </Layout.Default>
  )
}
