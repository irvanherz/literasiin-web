import { Form, Tabs } from 'antd'
import Layout from 'components/Layout'
import PageHeader from 'components/PageHeader'
import RouteGuard from 'components/RouteGuard'
import analytics from 'libs/analytics'
import { contentIdFromSlug, slugifyContentId } from 'libs/slug'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import StorytellingsService from 'services/Storytellings'
import StorytellingDetailsEditTab from './StorytellingDetailsEditTab'
import StorytellingEpisodesEditTab from './StorytellingEpisodesEditTab'

export default function StorytellingEdit () {
  const params = useParams()
  const navigate = useNavigate()
  const storytellingId = contentIdFromSlug(params.storytellingId || '')
  const sectionId = params.sectionId || 'details'
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

  const handleChangeTab = (k: string) => navigate(`/storytellings/${slugifyContentId(storytelling)}/edit/${k}`, { replace: true })

  return (
    <RouteGuard require='authenticated'>
      <Layout.Default
        beforeContent={
          <PageHeader
            title="Edit Storytelling"
            description="Update storytelling kamu"
          />
        }
      >
        <div className='container'>
          <Tabs
            activeKey={sectionId}
            onChange={handleChangeTab}
            items={[
              { key: 'details', label: 'Edit Details', children: <StorytellingDetailsEditTab storytelling={storytelling} /> },
              { key: 'episodes', label: 'Episodes', children: <StorytellingEpisodesEditTab storytelling={storytelling} /> }
              // { key: 'authors', label: 'Authors', children: <StorytellingAuthorsEditTab storytelling={storytelling} /> }
            ]}
            />
        </div>
        <Helmet>
          <title>Edit Storytelling - Literasiin</title>
        </Helmet>
      </Layout.Default>
    </RouteGuard>
  )
}
