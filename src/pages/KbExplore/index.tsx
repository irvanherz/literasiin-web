import { Input, List, Space, Typography } from 'antd'
import Layout from 'components/Layout'
import PageWidthAdapter from 'components/PageWidthAdapter'
import { Link } from 'react-router-dom'

type KbItemProps = {
  kb: any
}

function KbItem ({ kb }: KbItemProps) {
  return (
    <Link to='/'>
      <List.Item>
        <List.Item.Meta
          title="KB"
          description="KB"
        />
      </List.Item>
    </Link>
  )
}

export default function KbExplore () {
  return (
    <Layout.Default>
      <Space direction='vertical' style={{ width: '100%' }}>
        <div style={{ background: '#bdffd7', padding: '24px 0' }}>
          <PageWidthAdapter style={{ textAlign: 'center' }}>
            <Space direction='vertical' style={{ width: '100%' }}>
              <Typography.Title style={{ margin: 0 }}>Help Center</Typography.Title>
              <Typography.Text>Explore help content</Typography.Text>
              <div>
                <Input.Search allowClear placeholder='Search help...' style={{ maxWidth: 500 }}/>
              </div>
            </Space>
          </PageWidthAdapter>
        </div>
        <div>
          <PageWidthAdapter>
            <List
              dataSource={[1, 2, 3]}
              renderItem={kb => (
                <Link to={`/hc/${1}`}>
                  <KbItem kb={kb} />
                </Link>
              )}
            />
          </PageWidthAdapter>
        </div>
      </Space>
    </Layout.Default>
  )
}
