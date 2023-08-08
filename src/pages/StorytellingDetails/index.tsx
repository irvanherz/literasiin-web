import { Typography } from 'antd'
import Layout from 'components/Layout'
import { Helmet } from 'react-helmet'
import Episodes from './Episodes'
import Header from './Header'

export default function StorytellingDetails () {
  return (
    <Layout.Default>
      <Layout.Scaffold
        title={
          <Header storytelling={{}} />
        }
        bodyStyle={{ padding: '16px 0' }}
        extra={<Typography.Title level={3}>Episodes</Typography.Title>}
      >
        <Episodes />
      </Layout.Scaffold>
      <Helmet>
        <title>Storytelling - Literasiin</title>
      </Helmet>
    </Layout.Default>
  )
}
