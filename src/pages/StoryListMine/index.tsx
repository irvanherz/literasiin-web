/* eslint-disable no-unused-vars */
import { ArrowRightIcon, PlusIcon } from '@heroicons/react/24/solid'
import classNames from 'classnames'
import Layout from 'components/Layout'
import PageHeader from 'components/PageHeader'
import RouteGuard from 'components/RouteGuard'
import analytics from 'libs/analytics'
import { debounce } from 'lodash'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import PendingInvitationSection from './PendingInvitationSection'
import StoryCreateButton from './StoryCreateButton'
import StoryListAny from './StoryListAny'

export default function StoryListMine () {
  const [currentTab, setCurrentTab] = useState(0)
  const [search, setSearch] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const filter = useMemo(() => ({
    search: searchQuery,
    status: currentTab === 0 ? 'any' : 'published'
  }), [currentTab, searchQuery])

  useEffect(() => {
    setSearchQueryDebounced(search)
  }, [search])

  const setSearchQueryDebounced = useCallback(
    debounce(q => setSearchQuery(q), 300),
    []
  )

  useEffect(() => {
    analytics.page({
      title: 'My Stories',
      url: window.location.href
    })
  }, [])
  return (
    <RouteGuard require='authenticated'>
      <Layout.Default
        beforeContent={
          <PageHeader
            title='Ceritaku'
            description='Lihat dan atur semua cerita yang sudah kamu buat'
            extra={
              <StoryCreateButton>
                <button className='btn btn-sm'><PlusIcon className='w-4' /><span className='hidden md:inline'>Buat Cerita Baru</span></button>
              </StoryCreateButton>
            }
          />
        }
        afterContent={
          <div className='bg-emerald-600'>
            <div className="container">
              <div className='flex items-center py-4 text-white flex-col sm:flex-row gap-4'>
                <div className='flex-1'>
                  <div className='font-black text-lg md:text-lg'>Pengen nulis cerita baru, tapi tidak punya ide?</div>
                  <p className='mt-2'>Literasiin punya robot untuk membuatkanmu ide cerita yang menarik.</p>
                </div>
                <div className='flex-none'>
                  <Link to='/literasi-ai/story-ideas'>
                    <button className='btn btn-sm'>Coba Sekarang <ArrowRightIcon className='w-4' /></button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        }
        afterContentContainerClassName='relative md:sticky bottom-auto md:bottom-0'
      >
        {/* <Layout.Scaffold
          title={<FormattedMessage defaultMessage="My Stories" />}
          description={<FormattedMessage defaultMessage="List of all my stories" />}
          actions={[
            <StoryCreateButton key='crt'>
              <button className='btn btn-primary btn-sm'>Buat Cerita Baru</button>
            </StoryCreateButton>
          ]}
        > */}
        <div className='space-y-2 pb-4'>
          <div className='container gap-2 py-2 flex flex-wrap items-center'>
            <button className={classNames('flex-1 md:flex-none btn btn-sm', currentTab === 0 && 'btn-primary')} onClick={() => setCurrentTab(0)}>Semua</button>
            <button className={classNames('flex-1 md:flex-none btn btn-sm', currentTab === 1 && 'btn-primary')} onClick={() => setCurrentTab(1)}>Sudah Terbit</button>
            <input type="text" className="w-full md:flex-1 rounded-md input input-bordered input-sm min-w-0" placeholder='Cari cerita...' value={search} onChange={e => setSearch(e.target.value)}/>
          </div>
          <div className='container'>
            <PendingInvitationSection />
            <StoryListAny filter={filter} />
            {/* {currentTab === 0 && <StoryListAny />}
            {currentTab === 1 && <StoryListPublished />} */}
          </div>
        </div>
        {/* </Layout.Scaffold> */}
        <Helmet>
          <title>My Stories - Literasiin</title>
        </Helmet>
      </Layout.Default>
    </RouteGuard>

  )
}
