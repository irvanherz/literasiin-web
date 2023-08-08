import { Form, Tabs } from 'antd'
import Layout from 'components/Layout'
import RouteGuard from 'components/RouteGuard'
import analytics from 'libs/analytics'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import StorytellingsService from 'services/Storytellings'
import StorytellingAuthorsEditTab from './StorytellingAuthorsEditTab'
import StorytellingDetailsEditTab from './StorytellingDetailsEditTab'
import StorytellingEpisodesEditTab from './StorytellingEpisodesEditTab'

export default function StorytellingEdit () {
  const params = useParams()
  const storytellingId = +(params.storytellingId || 0)
  const [form] = Form.useForm()
  const { data } = useQuery(`storytellings[${storytellingId}]`, () => StorytellingsService.findById(storytellingId), { enabled: !!storytellingId })
  const storytelling = data?.data

  const initialValues = storytelling

  useEffect(() => {
    form.resetFields()
  }, [initialValues])

  useEffect(() => {
    analytics.page({
      title: 'Edit Storytelling',
      url: window.location.href
    })
  }, [])

  return (
    <RouteGuard require='authenticated'>
      <Layout.Default>
        <Layout.Scaffold
          title="Edit Storytelling"
          description="Update information about your storytelling below"
          bodyStyle={{ padding: '16px 0' }}
        >
          <Tabs
            items={[
              { key: 'edit', label: 'Edit Details', children: <StorytellingDetailsEditTab storytelling={storytelling} /> },
              { key: 'eppisodes', label: 'Episodes', children: <StorytellingEpisodesEditTab storytelling={storytelling} /> },
              { key: 'authors', label: 'Authors', children: <StorytellingAuthorsEditTab storytelling={storytelling} /> }
              // { key: 'settings', label: 'Settings', children: <StorytellingSettingsTab storytelling={storytelling} /> }
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
