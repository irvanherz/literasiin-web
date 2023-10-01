import { PlusIcon } from '@heroicons/react/24/solid'
import classNames from 'classnames'
import Layout from 'components/Layout'
import PageHeader from 'components/PageHeader'
import RouteGuard from 'components/RouteGuard'
import analytics from 'libs/analytics'
import { debounce } from 'lodash'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet'
import ArticlesAny from './ArticlesAny'
import CreateArticleButton from './CreateArticleButton'

export default function ArticleListMine () {
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
      title: 'My Article - Literasiin',
      url: window.location.href
    })
  }, [])

  return (
    <RouteGuard require='authenticated'>
      <Layout.Default
        beforeContent={
          <PageHeader
            title='Artikelku'
            description='Lihat dan atur semua artikel yang sudah kamu buat'
            extra={
              <CreateArticleButton>
                <button className='btn btn-sm'><PlusIcon className='w-4' /><span className='hidden md:inline'>Buat Artikel Baru</span></button>
              </CreateArticleButton>
            }
          />
        }
      >
        <div className='space-y-2 pb-4'>
          <div className='container gap-2 py-2 flex flex-wrap items-center'>
            <button className={classNames('flex-1 md:flex-none btn btn-sm', currentTab === 0 && 'btn-primary')} onClick={() => setCurrentTab(0)}>Semua</button>
            <button className={classNames('flex-1 md:flex-none btn btn-sm', currentTab === 1 && 'btn-primary')} onClick={() => setCurrentTab(1)}>Sudah Terbit</button>
            <input type="text" className="w-full md:flex-1 rounded-md input input-bordered input-sm min-w-0" placeholder='Cari artikel...' value={search} onChange={e => setSearch(e.target.value)}/>
          </div>
          <div className='container'>
            <ArticlesAny filter={filter} />
          </div>
        </div>
        <Helmet>
          <title>My Articles - Literasiin</title>
        </Helmet>
      </Layout.Default>
    </RouteGuard>
  )
}
