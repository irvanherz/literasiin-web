import classNames from 'classnames'
import Layout from 'components/Layout'
import RouteGuard from 'components/RouteGuard'
import useStoriesInfinite from 'hooks/useStoriesInfinite'
import useStoryCategories from 'hooks/useStoryCategories'
import analytics from 'libs/analytics'
import { slugifyContentId } from 'libs/slug'
import { DEFAULT_IMAGE } from 'libs/variables'
import Media from 'models/Media'
import { useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

function Skeletons() {
  return (
    <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4'>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(key => (
        <div className='card space-y-2 items-center' key={key}>
          <div className='w-full bg-white aspect-w-2 aspect-h-3 rounded-lg overflow-hidden'>
            <div className='animate-pulse bg-slate-400 aspect-w-2 aspect-h-3' />
          </div>
          <div className='inline animate-pulse bg-slate-400 w-11/12 h-4 rounded-lg'/>
          <div className='inline animate-pulse bg-slate-400 w-6/12 h-4 rounded-lg'/>
        </div>
      ))}
    </div>
  )
}

function StoryListEmpty() {
  return (
    <div className="text-center py-8">
      <div className="inline-flex rounded-full bg-yellow-100 p-2">
        <div className="rounded-full stroke-yellow-600 bg-yellow-200 p-2">
          <svg className="w-8 h-8" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.0002 9.33337V14M14.0002 18.6667H14.0118M25.6668 14C25.6668 20.4434 20.4435 25.6667 14.0002 25.6667C7.55684 25.6667 2.3335 20.4434 2.3335 14C2.3335 7.55672 7.55684 2.33337 14.0002 2.33337C20.4435 2.33337 25.6668 7.55672 25.6668 14Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
        </div>
      </div>
      <h1 className="mt-4 font-bold text-slate-800 text-2xl">Tidak Ada Cerita</h1>
      <p className="text-slate-600 mt-2 text-base">Belum ada yang menulis cerita di kategori ini.</p>
    </div>
  )
}

type StoryCardProps = {
  story: any
}

function StoryCard({ story }: StoryCardProps) {
  const authors = useMemo(() => {
    const writers: any[] = story?.writers || []
    return writers.reduce((a, c, i, arr) => {
      if (i === arr.length - 2) {
        a.push(<Link to={`/users/${c.username}`}>{c.fullName}</Link>)
        a.push(<span> and </span>)
      } else if (i !== arr.length - 1) {
        a.push(<Link to={`/users/${c.username}`}>{c.fullName}</Link>)
        a.push(<span>, </span>)
      } else {
        a.push(<Link to={`/users/${c.username}`}>{c.fullName}</Link>)
      }
      return a
    }, [])
  }, [story?.writers])

  const image = new Media(story?.cover)

  return (
    <Link to={`/stories/${slugifyContentId(story)}`} className='card space-y-2'>
      <div className='relative border border-slate-200 overflow-hidden rounded-lg aspect-w-2 aspect-h-3'>
        <img src={image.md?.url || DEFAULT_IMAGE} className='object-cover' />
      </div>
      <div className='text-center'>
        <div className='font-bold'>{story.title}</div>
        <div className='overflow-hidden text-ellipsis whitespace-nowrap text-slate-600'>{authors}</div>
      </div>
    </Link>
  )
}

type StoryListListByCategoryProps = {
  categoryId: any
}

function StoryListByCategory ({ categoryId }: StoryListListByCategoryProps) {
  const { isFetching, data, fetchNextPage, hasNextPage, isFetchingNextPage } = useStoriesInfinite({ categoryId: categoryId || undefined, limit: 12 })
  const stories: any[] = data?.pages.reduce<any>((a, c) => [...a, ...c?.data], []) || []

  if (!stories.length && !isFetching) {
    return (
      <div className='space-y-8'>
        <StoryListEmpty />
      </div>
    )
  } else if (isFetching) {
    return (
      <div className='space-y-8'>
        <Skeletons />
      </div>
    )
  } else {
    return (
      <div className='space-y-8'>
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4'>
          {stories.map(story => <StoryCard key={story.id} story={story} />)}
        </div>
        <div className='text-center'>
          {hasNextPage && <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage} className='btn btn-sm btn-primary'>Muat Lebih Banyak</button>}
        </div>
      </div>
    )
  }
}

export default function StoryExplore () {
  const { data: categoriesData } = useStoryCategories()
  const categories: any[] = categoriesData?.data || []
  const [currentCategoryId, setCurrentCategoryId] = useState(0)

  useEffect(() => {
    analytics.page({
      title: 'Explore Stories',
      url: window.location.href
    })
  }, [])

  return (
    <RouteGuard require='authenticated'>
      <Layout.Default>
        <div className='space-y-4 py-4'>
          <div className="container flex space-x-2 overflow-x-scroll adaptive-scroll">
            <button
              key={0}
              className={classNames('btn btn-sm', currentCategoryId === 0 && 'btn-primary')}
              onClick={() => setCurrentCategoryId(0)}
            >
              Semua Cerita
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                className={classNames('btn btn-sm', currentCategoryId === cat.id && 'btn-primary')}
                onClick={() => setCurrentCategoryId(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>
          <div className='container'>
            <StoryListByCategory categoryId={currentCategoryId} />
          </div>
        </div>
        <Helmet>
          <title>Explore Stories - Literasiin</title>
        </Helmet>
      </Layout.Default>
    </RouteGuard>

  )
}
