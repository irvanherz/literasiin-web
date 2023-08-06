import { Form, Tabs } from 'antd'
import Layout from 'components/Layout'
import RouteGuard from 'components/RouteGuard'
import analytics from 'libs/analytics'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import StoriesService from 'services/Stories'
import StoryDetailsEditTab from './StoryDetailsEditTab'
import StoryWritersEditTab from './StoryWritersEditTab'

export default function StoryEdit () {
  const params = useParams()
  const storyId = +(params.storyId || 0)
  const [form] = Form.useForm()
  const { data } = useQuery(`stories[${storyId}]`, () => StoriesService.findById(storyId), { enabled: !!storyId })
  const story = data?.data

  const initialValues = story

  useEffect(() => {
    form.resetFields()
  }, [initialValues])

  useEffect(() => {
    analytics.page({
      title: 'Edit Story',
      url: window.location.href
    })
  }, [])

  return (
    <RouteGuard require='authenticated'>
      <Layout.Default>
        <Layout.Scaffold
          title="Edit Story"
          description="Update information about your story below"
          bodyStyle={{ padding: '16px 0' }}
        >
          <Tabs
            items={[
              { key: 'edit', label: 'Edit Details', children: <StoryDetailsEditTab story={story} /> },
              { key: 'writers', label: 'Writers', children: <StoryWritersEditTab story={story} /> }
              // { key: 'settings', label: 'Settings', children: <StorySettingsTab story={story} /> }
            ]}
          />
        </Layout.Scaffold>
        <Helmet>
          <title>Edit Story - Literasiin</title>
        </Helmet>
      </Layout.Default>
    </RouteGuard>
  )
}
