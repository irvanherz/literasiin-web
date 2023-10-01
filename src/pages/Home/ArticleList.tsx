/* eslint-disable no-unused-vars */
import { ChatBubbleBottomCenterIcon } from '@heroicons/react/24/solid'
import { theme } from 'antd'
import classNames from 'classnames'
import RenderTimeFromNow from 'components/shared/RenderTimeFromNow'
import useArticlesInfinite from 'hooks/useArticlesInfinite'
import { slugifyContentId } from 'libs/slug'
import { DEFAULT_IMAGE } from 'libs/variables'
import Media from 'models/Media'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import ArticlesService from 'services/Articles'

function CategorySkeletons() {
  return (
    <div className="flex space-x-2 overflow-x-scroll adaptive-scroll">
      {[0, 1, 2].map(key => (
        <div key={key} className='h-8 w-20 bg-slate-400 animate-pulse rounded-lg' />
      ))}
    </div>
  )
}

function Skeletons() {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      {[0, 1, 2, 3, 4, 5, 6, 7].map(key => (
        <div key={key} className='card bg-white flex flex-col shadow-md'>
          <div className='flex-1 p-3 border-b'>
            <div className='relative overflow-hidden rounded-lg aspect-w-2 aspect-h-1'>
              <div className='absolute left-0 top-0 w-full h-full animate-pulse bg-slate-400' />
            </div>
            <div className='text-black pt-2 space-y-2'>
              <div className='w-1/2 h-4 rounded-lg animate-pulse bg-slate-400' />
              <div className='w-full h-4 rounded-lg animate-pulse bg-slate-400' />
            </div>
          </div>
          <div className='flex-none flex items-center p-3 text-black'>
            <div className='flex-1 space-y-2'>
              <div className='w-1/3 h-4 rounded-lg animate-pulse bg-slate-400' />
              <div className='w-1/2 h-4 rounded-lg animate-pulse bg-slate-400' />
            </div>
            <div className='flex-none'><div className='w-8 h-8 rounded-full animate-pulse bg-slate-400' /></div>
          </div>
        </div>
      ))}
    </div>
  )
}

type ArticleCardProps = {
  article: any
}

function ArticleCard({ article }:ArticleCardProps) {
  const image = new Media(article?.image)

  return (
    <Link to={`/articles/${slugifyContentId(article)}`} className='card bg-white flex flex-col border shadow-sm'>
      <div className='flex-1 p-3 border-b'>
        <div className='relative overflow-hidden rounded-lg aspect-w-2 aspect-h-1'>
          <img src={image.md?.url || DEFAULT_IMAGE} className='absolute left-0 top-0 w-full h-full object-cover' />
        </div>
        <div className='text-black pt-2 space-y-2'>
          <div className='font-bold line-clamp-2'>{article.title}</div>
          <div className='line-clamp-2 text-slate-600'>{article.description}</div>
        </div>
      </div>
      <div className='flex-none flex items-center p-3 text-black'>
        <div className='flex-1'>
          <div className='font-bold line-clamp-1'>{article.user?.fullName}</div>
          <div className='text-sm text-slate-500'><RenderTimeFromNow timestamp={article.createdAt} /></div>
        </div>
        <div className='flex-none'>
          <Link to={`/articles/${slugifyContentId(article)}#comment`}>
            <button className='btn btn-circle btn-sm'><ChatBubbleBottomCenterIcon className='w-4'/></button>
          </Link>
        </div>
      </div>
    </Link>
  )
}

function ArticleListEmpty() {
  return (
    <div className="text-center py-8">
      <div className="inline-flex rounded-full bg-yellow-100 p-2">
        <div className="rounded-full stroke-yellow-600 bg-yellow-200 p-2">
          <svg className="w-8 h-8" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.0002 9.33337V14M14.0002 18.6667H14.0118M25.6668 14C25.6668 20.4434 20.4435 25.6667 14.0002 25.6667C7.55684 25.6667 2.3335 20.4434 2.3335 14C2.3335 7.55672 7.55684 2.33337 14.0002 2.33337C20.4435 2.33337 25.6668 7.55672 25.6668 14Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
        </div>
      </div>
      <h1 className="mt-4 font-bold text-slate-800 text-2xl">Tidak Ada Artikel</h1>
      <p className="text-slate-600 mt-2 text-base">Belum ada yang menulis artikel di kategori ini.</p>
    </div>
  )
}

type ArticleListPerCategoryProps = {
  categoryId: any
}

function ArticleListByCategory ({ categoryId }: ArticleListPerCategoryProps) {
  const { isFetching, data, fetchNextPage, hasNextPage, isFetchingNextPage } = useArticlesInfinite({ categoryId: categoryId || undefined, limit: 12 })
  const articles: any[] = data?.pages.reduce<any>((a, c) => [...a, ...c?.data], []) || []

  if (!articles.length && !isFetching) {
    return (
      <div className='space-y-8'>
        <ArticleListEmpty />
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
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {articles.map(article => <ArticleCard key={article.id} article={article} />)}
        </div>
        <div className='text-center'>
          {hasNextPage && <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage} className='btn btn-sm btn-primary'>Muat Lebih Banyak</button>}
        </div>
      </div>
    )
  }
}

export default function ArticleList () {
  const { token } = theme.useToken()
  const { data, isLoading } = useQuery('articles.categories[]', () => ArticlesService.Categories.findMany())
  const categories: any[] = data?.data || []
  const [currentCategoryId, setCurrentCategoryId] = useState(0)

  return (
    <div className='border-b py-8'>
      <div className=''>
        <div className='container'>
          {(isLoading && !categories.length)
            ? (
              <CategorySkeletons />
              )
            : (
              <div className="flex space-x-2 overflow-x-scroll adaptive-scroll">
                <button
                  key={0}
                  className={classNames('btn btn-sm', currentCategoryId === 0 && 'btn-primary')}
                  onClick={() => setCurrentCategoryId(0)}
                >
                  Semua Artikel
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
              )
        }
        </div>
      </div>
      <div className='container py-2'>
        <ArticleListByCategory categoryId={currentCategoryId} />
      </div>
    </div>
  )
}
