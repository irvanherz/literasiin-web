/* eslint-disable no-unreachable */
import { EyeIcon } from '@heroicons/react/24/solid'
import ArticleShareSegment from 'components/ArticleShareSegment'
import Layout from 'components/Layout'
import RenderTimeFromNow from 'components/shared/RenderTimeFromNow'
import useArticle from 'hooks/useArticle'
import useArticleContext from 'hooks/useArticleContext'
import analytics from 'libs/analytics'
import { contentIdFromSlug } from 'libs/slug'
import { DEFAULT_IMAGE, DEFAULT_PHOTO } from 'libs/variables'
import Media from 'models/Media'
import { useEffect } from 'react'
import { useMutation } from 'react-query'
import { useLocation, useParams } from 'react-router-dom'
import { Element, scroller } from 'react-scroll'
import ArticlesService from 'services/Articles'
import ArticleBookmarkButton from './ArticleBookmarkButton'
import ArticleComments from './ArticleComments'
import ArticleVoteButton from './ArticleVoteButton'

function Skeleton() {
  return (
    <Layout.Default className='bg-white'>
      <div>
        <div className="space-y-4 py-4">
          <div className='max-w-[920px] p-4 m-auto'>
            <div className='aspect-w-2 aspect-h-1 rounded-md overflow-hidden shadow-lg animate-pulse bg-slate-400'></div>
          </div>
          <div className='max-w-[920px] p-4 m-auto space-y-4'>
            <div className='font-black text-2xl rounded-lg animate-pulse bg-slate-400 w-48'>&nbsp;</div>
            <div className='text-slate-500 rounded-lg animate-pulse bg-slate-400 w-full'>&nbsp;</div>
            <div className='border-y py-4'>
              <div className='flex items-center gap-4'>
                <div className='w-12'>
                  <div className='aspect-1 rounded shadow overflow-hidden animate-pulse bg-slate-400'></div>
                </div>
                <div className='flex-1'>
                  <div className='text-slate-500 text-sm animate-pulse bg-slate-400 rounded-lg w-16 h-4 mb-2'>&nbsp;</div>
                  <div className='font-black animate-pulse bg-slate-400 rounded-lg w-32 h-6'>&nbsp;</div>
                </div>
                <div className='flex-none text-sm text-slate-500 w-16 h-4 animate-pulse bg-slate-400 rounded-lg'></div>
              </div>
            </div>
            <div>
              <div className='text-slate-500 rounded-lg animate-pulse bg-slate-400 w-3/4 mb-2'>&nbsp;</div>
              <div className='text-slate-500 rounded-lg animate-pulse bg-slate-400 w-full mb-2'>&nbsp;</div>
              <div className='text-slate-500 rounded-lg animate-pulse bg-slate-400 w-full mb-2'>&nbsp;</div>
              <div className='text-slate-500 rounded-lg animate-pulse bg-slate-400 w-full mb-2'>&nbsp;</div>
              <div className='text-slate-500 rounded-lg animate-pulse bg-slate-400 w-1/4 mb-2'>&nbsp;</div>
            </div>
          </div>
        </div>
      </div>
    </Layout.Default>
  )
}

export default function ArticleDetails () {
  const params = useParams()
  const { hash } = useLocation()
  const articleId = contentIdFromSlug(params?.articleId || '')
  const { status, data, refetch, isLoading } = useArticle(articleId)
  const { data: contextData, refetch: refetchContext } = useArticleContext(articleId)
  const article: any = data?.data
  const context: any = contextData?.data
  const viewer = useMutation(() => ArticlesService.Readers.track(articleId))

  useEffect(() => {
    if (articleId) viewer.mutate()
  }, [articleId])

  useEffect(() => {
    analytics.page({
      title: article?.title ? `${article.title} - Literasiin` : 'Literasiin',
      url: window.location.href
    })
  }, [article])

  useEffect(() => {
    if (hash === '#comments' && status === 'success') {
      scroller.scrollTo('comments', { delay: 300 })
    }
  }, [status, hash])

  const handleAfterUpdated = () => {
    refetch()
    refetchContext()
  }

  const image = new Media(article?.image)
  const photo = new Media(article?.user?.photo)

  if (isLoading) {
    return <Skeleton />
  } else {
    return (
      <Layout.Default className='bg-white'>
        <div>
          <div className="space-y-4 py-4">
            <div className='max-w-[920px] p-4 m-auto'>
              <div className='aspect-w-2 aspect-h-1 rounded-md overflow-hidden shadow-lg'>
                <img src={image.lg?.url || DEFAULT_IMAGE} className='object-cover' />
              </div>
            </div>
            <div className='max-w-[920px] p-4 m-auto space-y-4'>
              <div className='font-black text-2xl'>{article?.title}</div>
              <div className='text-slate-500'>{article?.description}</div>
              <div className='border-y py-4'>
                <div className='flex items-center gap-4'>
                  <div className='w-12'>
                    <div className='aspect-1 rounded shadow overflow-hidden'>
                      <img src={photo.md?.url || DEFAULT_PHOTO} />
                    </div>
                  </div>
                  <div className='flex-1'>
                    <div className='text-slate-500 text-sm'>Ditulis oleh</div>
                    <div className='font-black'>{article?.user?.fullName}</div>
                  </div>
                  <div className='flex-none text-sm text-slate-500'><EyeIcon className='w-4 inline' /> {article?.meta?.numViews} tayangan</div>
                </div>
              </div>
              <div dangerouslySetInnerHTML={{ __html: article?.content }} className='text-lg'></div>
            </div>
          </div>
          <div className='bg-slate-50 border-t'>
            <div className='max-w-[920px] p-4 m-auto text-sm'>
              Diposting pada kategori <span className='font-bold'>{article?.category?.name}</span>&nbsp;&middot;&nbsp;update <span className='font-bold'><RenderTimeFromNow timestamp={article?.updatedAt} /></span>
            </div>
          </div>
          <div className='bg-slate-100 border-t'>
            <div className='max-w-[920px] p-4 m-auto'>
              <div className='flex items-center'>
                <div className='flex-1 text-slate-500 text-sm'>
                  <ArticleVoteButton article={article} context={context} afterUpdated={handleAfterUpdated} />
                </div>
                <div className='flex-none flex'>
                  <div><ArticleBookmarkButton article={article} context={context} afterUpdated={handleAfterUpdated} /></div>
                </div>
              </div>
            </div>
            <div className='max-w-[920px] p-4 m-auto border-t text-center space-y-2'>
              <div className='text-slate-700 font-bold'>Bagikan artikel</div>
              <ArticleShareSegment article={article} />
            </div>
          </div>
          <div className='py-4 bg-slate-50 border-t'>
            <div className='max-w-[920px] p-4 m-auto'>
              <Element name='comments'>
                <ArticleComments article={article} />
              </Element>
            </div>
          </div>
        </div>
      </Layout.Default>
    )
  }
}
