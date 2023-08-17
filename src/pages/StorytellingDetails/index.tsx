import { Typography } from 'antd'
import Layout from 'components/Layout'
import useStorytelling from 'hooks/useStorytelling'
import { contentIdFromSlug } from 'libs/slug'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import Episodes from './Episodes'
import Header from './Header'

export default function StorytellingDetails () {
  const params = useParams()
  const storytellingId = contentIdFromSlug(params.storytellingId || '')
  const { data } = useStorytelling(storytellingId)
  const storytelling = data?.data
  return (
    <Layout.Default>
      <Layout.Scaffold
        title={
          <Header storytelling={data} />
        }
        bodyStyle={{ padding: '16px 0' }}
        extra={<Typography.Title level={3}>Episodes</Typography.Title>}
      >
        <Episodes storytelling={storytelling} />
      </Layout.Scaffold>
      <Helmet>
        <title>Storytelling - Literasiin</title>
      </Helmet>
    </Layout.Default>
  )
}
