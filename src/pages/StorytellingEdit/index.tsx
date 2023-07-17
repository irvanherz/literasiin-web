import { Form, Tabs } from 'antd'
import Layout from 'components/Layout'
import RouteGuard from 'components/RouteGuard'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import StoriesService from 'services/Stories'
import ChaptersTab from './ChaptersTab'
import StoryDetailsEditTab from './StoryDetailsEditTab'
import StoryWritersEditTab from './StoryWritersEditTab'

export default function StorytellingEdit () {
  const params = useParams()
  const storyId = +(params.storyId || 0)
  const [form] = Form.useForm()
  const { data } = useQuery(`stories[${storyId}]`, () => StoriesService.findById(storyId), { enabled: !!storyId })
  const story = data?.data

  const initialValues = story

  useEffect(() => {
    form.resetFields()
  }, [initialValues])

  return (
    <RouteGuard require='authenticated'>
      <Layout.Default>
        <Layout.Scaffold
          title="Edit Storytelling"
          description="Update information about your story below"
          bodyStyle={{ padding: '16px 0' }}
        >
          <Tabs
            items={[
              { key: 'edit', label: 'Edit Details', children: <StoryDetailsEditTab story={story} /> },
              { key: 'chapters', label: 'Edit Chapters', children: <ChaptersTab story={story} /> },
              { key: 'writers', label: 'Writers', children: <StoryWritersEditTab story={story} /> }
              // { key: 'settings', label: 'Settings', children: <StorySettingsTab story={story} /> }
            ]}
          />
        </Layout.Scaffold>
        <Helmet>
          <title>Edit Storytelling - Literasiin</title>
        </Helmet>
      </Layout.Default>
    </RouteGuard>
  )
}
