import { Form } from 'antd'
import classNames from 'classnames'
import Layout from 'components/Layout'
import PageHeader from 'components/PageHeader'
import RouteGuard from 'components/RouteGuard'
import analytics from 'libs/analytics'
import { contentIdFromSlug, slugifyContentId } from 'libs/slug'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useQuery } from 'react-query'
import { Link, useParams } from 'react-router-dom'
import StoriesService from 'services/Stories'
import StoryChaptersTab from './StoryChaptersTab'
import StoryDetailsEditTab from './StoryDetailsEditTab'
import StoryWritersEditTab from './StoryWritersEditTab'

export default function StoryEdit () {
  const params = useParams()
  const storyId = contentIdFromSlug(params?.storyId || '')
  const sectionId = params?.sectionId || 'details'
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
      <Layout.Default
        beforeContent={
          <PageHeader
            title="Edit Cerita"
            description="Edit cerita kamu"
          />
        }
      >
        <div className='bg-slate-50 border-b'>
          <div className="container">
            <ul className="menu menu-sm font-bold menu-horizontal px-0 py-2 space-x-2">
              <li><Link replace to={`/stories/${slugifyContentId(story)}/edit/details`} className={classNames(sectionId === 'details' && 'active')}>Detail Cerita</Link></li>
              <li><Link replace to={`/stories/${slugifyContentId(story)}/edit/chapters`} className={classNames(sectionId === 'chapters' && 'active')}>Daftar Bab</Link></li>
              <li><Link replace to={`/stories/${slugifyContentId(story)}/edit/writers`} className={classNames(sectionId === 'writers' && 'active')}>Daftar Penulis</Link></li>
            </ul>
          </div>
        </div>
        <div className="container py-4">
          <div>
            {sectionId === 'details' && <StoryDetailsEditTab story={story} />}
            {sectionId === 'chapters' && <StoryChaptersTab story={story} />}
            {sectionId === 'writers' && <StoryWritersEditTab story={story} />}
          </div>
        </div>
        <Helmet>
          <title>Edit Story - Literasiin</title>
        </Helmet>
      </Layout.Default>
    </RouteGuard>
  )
}
