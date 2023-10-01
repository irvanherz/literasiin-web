/* eslint-disable no-unused-vars */
import Layout from 'components/Layout'
import PageHeader from 'components/PageHeader'
import StoryShareSegment from 'components/StoryShareSegment'
import RenderTimeFromNow from 'components/shared/RenderTimeFromNow'
import useStoryContext from 'hooks/useStoryContext'
import analytics from 'libs/analytics'
import { contentIdFromSlug } from 'libs/slug'
import { DEFAULT_IMAGE } from 'libs/variables'
import Media from 'models/Media'
import { useEffect, useMemo } from 'react'
import { Helmet } from 'react-helmet'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { useMutation, useQuery } from 'react-query'
import { Link, useParams } from 'react-router-dom'
import StoriesService from 'services/Stories'
import BookmarkButton from './BookmarkButton'
import RecommendedStories from './RecommendedStories'
import StoryChapters from './StoryChapters'
import Writers from './Writers'

const LANGUAGES = {
  id: 'Bahasa Indonesia',
  en: 'Bahasa Inggris'
}

export default function StoryDetails () {
  const params = useParams()
  const storyId = contentIdFromSlug(params?.storyId || '')
  const tracker = useMutation(() => StoriesService.Readers.track(storyId))
  const { data, isLoading, error } = useQuery<any, any, any>(`stories[${storyId}]`, () => StoriesService.findById(storyId))
  const { data: contextData, refetch: refetchContext } = useStoryContext(storyId)
  const story = data?.data
  const context = contextData?.data

  const authors = useMemo(() => {
    const writers: any[] = story?.writers || []
    return writers.reduce((a, c, i, arr) => {
      if (i === arr.length - 2) {
        a.push(<Link to={`/users/${c.username}`} className='header-author'>{c.fullName}</Link>)
        a.push(<span> and </span>)
      } else if (i !== arr.length - 1) {
        a.push(<Link to={`/users/${c.username}`} className='header-author'>{c.fullName}</Link>)
        a.push(<span>, </span>)
      } else {
        a.push(<Link to={`/users/${c.username}`} className='header-author'>{c.fullName}</Link>)
      }
      return a
    }, [])
  }, [story?.writers])

  const cover = new Media(story?.cover)

  useEffect(() => {
    tracker.mutate()
  }, [storyId])

  const documentTitle = useMemo(() => story?.title ? `${story.title} - Literasiin` : '', [story])

  useEffect(() => {
    if (documentTitle) {
      analytics.page({
        title: documentTitle,
        url: window.location.href
      })
    }
  }, [documentTitle])

  return (
    <Layout.Default
      beforeContent={
        <PageHeader
          title={
            <div className='font-bold flex flex-col md:flex-row text-base gap-4'>
              <div className='w-32 m-auto'>
                <div className='aspect-w-2 aspect-h-3 rounded-lg overflow-hidden shadow-sm'>
                  <img src={cover.md?.url || DEFAULT_IMAGE} className='object-cover' />
                </div>
              </div>
              <div className='flex-1 text-center md:text-left'>
                <div className='font-black text-2xl'>{story?.title}</div>
                <div className='font-bold pb-4'><span className='text-slate-600'>Ditulis oleh</span> <span className='font-black'>{authors}</span></div>
                <div className='text-sm'>{LANGUAGES[story?.languageId as keyof typeof LANGUAGES]}</div>
                <div className='text-sm pb-4'><span className='text-slate-600'>Kategori</span> <span className='font-bold'>{story?.category?.name || <i>Tanpa Kategori</i>}</span> &middot; <span className='text-slate-600'>Terakhir update</span> <RenderTimeFromNow timestamp={story?.updatedAt} /></div>
                <div className='inline-flex gap-1'>
                  {(story?.tags || []).map((tag: any) => <div key={tag} className="badge badge-primary shadow-sm">{tag}</div>)}
                </div>
              </div>
            </div>
          }
        />
      }
    >
      <div>
        <div className='border-b py-2 bg-slate-50'>
          <div className='container flex'>
            <div className='flex-1 inline-flex items-center'>
              <span className='font-bold'>{story?.meta?.numPublishedChapters} BAB CERITA</span>&nbsp;&nbsp;&middot;&nbsp;&nbsp;
              <span className='text-slate-600'>{story?.meta?.numReads} kali dibaca</span>&nbsp;&nbsp;&middot;&nbsp;&nbsp;
              <span className='text-slate-600'>{story?.meta?.numVotes} suka</span>
            </div>
            <div className='flex-none'>
              <BookmarkButton story={story} context={context} afterUpdated={refetchContext} />
            </div>
          </div>
        </div>
        <div className='container py-4'>
          <div className='flex flex-col md:flex-row gap-4'>
            <div className='w-full md:w-8/12 space-y-4'>
              <div className='rounded-lg bg-white p-4 shadow space-y-2'>
                <div className='font-bold text-slate-500'>Sinopsis</div>
                <div className=''><ReactMarkdown>{story?.description || ''}</ReactMarkdown></div>
              </div>
              <div className='rounded-lg bg-white p-4 shadow space-y-2'>
                <div className='font-bold text-slate-500'>Bab Cerita</div>
                <StoryChapters story={story} />
              </div>
            </div>
            <div className='w-full md:w-4/12'>
              <div className='space-y-4 md:sticky md:top-[72px]'>
                <div className='rounded-lg bg-white p-4 shadow'>
                  <StoryShareSegment story={story} />
                </div>
                <Writers story={story} />
              </div>
            </div>
          </div>
        </div>
        <div className='border-t py-4 bg-slate-50'>
          <div className='container'>
            <RecommendedStories />
          </div>
        </div>
      </div>
      <Helmet>
        <title>{documentTitle || 'Literasiin'}</title>
      </Helmet>
    </Layout.Default>
  )
}
