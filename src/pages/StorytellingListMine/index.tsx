import Layout from 'components/Layout'
import RouteGuard from 'components/RouteGuard'
import analytics from 'libs/analytics'
import { ReactElement, cloneElement, useCallback, useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet'
// import PendingInvitationSection from './PendingInvitationSection'
import { PlusIcon } from '@heroicons/react/24/solid'
import { message } from 'antd'
import classNames from 'classnames'
import PageHeader from 'components/PageHeader'
import useStorytellingCreate from 'hooks/useStorytellingCreate'
import { slugifyContentId } from 'libs/slug'
import { debounce } from 'lodash'
import { useNavigate } from 'react-router-dom'
import StorytellingList from './StorytellingList'

type StoryCreateButtonProps = {
  children: ReactElement
}
function StoryCreateButton({ children }:StoryCreateButtonProps) {
  const executor = useStorytellingCreate()
  const navigate = useNavigate()

  const handleClick = async () => {
    try {
      const result = await executor.mutateAsync({ title: 'Untitled' })
      navigate(`/storytellings/${slugifyContentId(result.data)}/edit`)
    } catch (err) {
      message.error('Terjadi kesalahan')
    }
  }
  return cloneElement(children, { onClick: handleClick, disabled: executor.isLoading })
}

export default function StorytellingListMine () {
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
      title: 'My Storytellings',
      url: window.location.href
    })
  }, [])

  return (
    <RouteGuard require='authenticated'>
      <Layout.Default
        beforeContent={
          <PageHeader
            title='Storytellingku'
            description='Daftar audiobook storytelling saya'
            extra={
              <StoryCreateButton>
                <button className='btn btn-sm'><PlusIcon className='w-4' /><span className='hidden md:inline'>Buat Storytelling Baru</span></button>
              </StoryCreateButton>
            }
          />
        }
      >
        <div className='space-y-2 pb-4'>
          <div className='container gap-2 py-2 flex flex-wrap items-center'>
            <button className={classNames('flex-1 md:flex-none btn btn-sm', currentTab === 0 && 'btn-primary')} onClick={() => setCurrentTab(0)}>Semua</button>
            <button className={classNames('flex-1 md:flex-none btn btn-sm', currentTab === 1 && 'btn-primary')} onClick={() => setCurrentTab(1)}>Sudah Terbit</button>
            <input type="text" className="w-full md:flex-1 rounded-md input input-bordered input-sm min-w-0" placeholder='Cari cerita...' value={search} onChange={e => setSearch(e.target.value)}/>
          </div>
          <div className='container'>
            <StorytellingList filter={filter} />
          </div>
        </div>
        <Helmet>
          <title>Storytellingku - Literasiin</title>
        </Helmet>
      </Layout.Default>
    </RouteGuard>

  )
}
