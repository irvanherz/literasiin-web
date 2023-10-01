import classNames from 'classnames'
import Layout from 'components/Layout'
import PageHeader from 'components/PageHeader'
import RouteGuard from 'components/RouteGuard'
import { Helmet } from 'react-helmet'
import { Link, useParams } from 'react-router-dom'

type StoryEditLayoutProps = {
  children: any
  story: any
}

export default function StoryEditLayout({ children, story }:StoryEditLayoutProps) {
  const params = useParams()
  const storyIdSlug = params?.storyId || ''
  const sectionId = params?.sectionId || 'details'

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
        <div>
          <div className='bg-slate-50 border-b'>
            <div className="container">
              <ul className="menu menu-sm font-bold menu-horizontal px-0 py-2 space-x-2">
                <li><Link replace to={`/stories/${storyIdSlug}/edit/details`} className={classNames(sectionId === 'details' && 'active')}>Detail Cerita</Link></li>
                <li><Link replace to={`/stories/${storyIdSlug}/edit/chapters`} className={classNames(sectionId === 'chapters' && 'active')}>Daftar Bab</Link></li>
                <li><Link replace to={`/stories/${storyIdSlug}/edit/writers`} className={classNames(sectionId === 'writers' && 'active')}>Daftar Penulis</Link></li>
              </ul>
            </div>
          </div>
          <div className="container py-4">
            {children}
          </div>
        </div>
        <Helmet>
          <title>Edit Story - Literasiin</title>
        </Helmet>
      </Layout.Default>
    </RouteGuard>
  )
}
