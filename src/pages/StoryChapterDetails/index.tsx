/* eslint-disable no-unused-vars */
import { ArrowLeftIcon, ArrowRightIcon, HomeIcon, PauseIcon, StopIcon } from '@heroicons/react/24/solid'
import Layout from 'components/Layout'
import PageHeader from 'components/PageHeader'
import StoryChapterShareSegment from 'components/StoryChapterShareSegment'
import useStory from 'hooks/useStory'
import useStoryChapter from 'hooks/useStoryChapter'
import useStoryChapterContext from 'hooks/useStoryChapterContext'
import analytics from 'libs/analytics'
import { esimateReadingTimeInMinutes } from 'libs/common'
import { contentIdFromSlug, slugifyContentId } from 'libs/slug'
import { DEFAULT_IMAGE } from 'libs/variables'
import Media from 'models/Media'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useMutation } from 'react-query'
import { Link, useParams } from 'react-router-dom'
import StoriesService from 'services/Stories'
import ChapterComments from './ChapterComments'
import RecommendedStories from './RecommendedStories'
import VoteButton from './VoteButton'
import Writers from './Writers'

type ChapterNavProps = {
  story: any
  chapter: any
  context: any
}

function ChapterNav({ story, chapter, context }: ChapterNavProps) {
  const res: any[] = []
  if (context?.prevChapter) {
    res.push(
      <Link to={`/stories/chapters/${context?.prevChapter?.id}`} className='flex-1 p-4'>
        <div><ArrowLeftIcon className='w-4 inline' /></div>
        <div className='text-sm'>{context?.prevChapter?.title}</div>
      </Link>
    )
  } else {
    res.push(
      <Link to={`/stories/${slugifyContentId(story)}`} className='flex-1 p-4'>
        <div><HomeIcon className='w-4 inline' /></div>
        <div className='text-sm'>Kembali ke daftar cerita</div>
      </Link>
    )
  }
  if (context?.nextChapter) {
    res.push(
      <Link to={`/stories/chapters/${context.nextChapter?.id}`} className='flex-1 p-4'>
        <div><ArrowRightIcon className='w-4 inline' /></div>
        <div className='text-sm'>{context.nextChapter?.title}</div>
      </Link>
    )
  } else {
    if (story?.hasCompleted) {
      res.push(
        <div className='flex-1 text-slate-500 p-4'>
          <div><StopIcon className='w-4 inline' /></div>
          <div className='text-sm'>Tamat</div>
        </div>
      )
    } else {
      res.push(
        <div className='flex-1 text-slate-500 p-4'>
          <div><PauseIcon className='w-4 inline' /></div>
          <div className='text-sm'>Bersambung...</div>
        </div>
      )
    }
  }
  return (
    <div className='flex divide-x text-center border-t'>
      {res}
    </div>
  )
}

export default function StoryChapterDetails () {
  const params = useParams()
  const chapterId = contentIdFromSlug(params?.chapterId || '')
  const { data, status, error } = useStoryChapter(chapterId, { includeStory: true })
  const viewer = useMutation(() => StoriesService.Chapters.Readers.track(chapterId))
  const chapter = data?.data
  const storyId = chapter?.storyId
  const { data: storyData } = useStory(storyId)
  const story = storyData?.data

  const { data: contextData, refetch: refetchContext } = useStoryChapterContext(chapterId)
  const context = contextData?.data

  useEffect(() => {
    if (chapterId) viewer.mutate()
  }, [chapterId])

  useEffect(() => {
    analytics.page({
      title: chapter?.title ? `${chapter.title} - Literasiin` : 'Literasiin',
      url: window.location.href
    })
  }, [chapter])

  const cover = new Media(story?.cover)

  return (
    <Layout.Default
      beforeContent={
        <PageHeader
          title={
            <div className='flex font-normal gap-4'>
              <div className='w-16'>
                <div className='aspect-w-2 aspect-h-3 overflow-hidden rounded-md shadow'>
                  <img src={cover.md?.url || DEFAULT_IMAGE} className='object-cover' />
                </div>
              </div>
              <div className='flex-1'>
                <div className='font-black'>{story?.title}</div>
                <div className='text-sm text-slate-600'>{chapter?.title}</div>
              </div>
            </div>
          }
        />
      }
    >
      <div>
        <div className='bg-slate-50 border-b'>
          <div className='container py-2 flex'>
            <div className='flex-1 inline-flex items-center'>
              <span className='font-bold'>{esimateReadingTimeInMinutes(chapter?.content)} menit membaca</span>&nbsp;&nbsp;&middot;&nbsp;&nbsp;
              <span className='text-slate-600'>{chapter?.meta?.numReads} kali dibaca</span>&nbsp;&nbsp;&middot;&nbsp;&nbsp;
              <span className='text-slate-600'>{chapter?.meta?.numVotes} suka</span>
            </div>
            <div className='flex-none'>
              <VoteButton chapter={chapter} context={context} afterUpdated={refetchContext} />
            </div>
          </div>
        </div>
        <div className='container flex flex-col md:flex-row py-4 gap-4'>
          <div className='w-full md:w-8/12 flex flex-col gap-4'>
            <div className='flex-1 rounded-lg shadow bg-white'>
              <div className='p-4 flex-1'>
                <div dangerouslySetInnerHTML={{ __html: chapter?.content || '' }} />
              </div>
              <div className='flex-none'>
                <ChapterNav story={story} chapter={chapter} context={context} />
              </div>
            </div>
            <div className='flex-1 rounded-lg shadow bg-white p-4'>
              <ChapterComments chapter={chapter} />
            </div>
          </div>
          <div className='w-full md:w-4/12 space-y-4'>
            <div className='space-y-4 md:sticky md:top-[72px]'>
              <div className='bg-white rounded-lg shadow p-4'>
                <StoryChapterShareSegment story={story} chapter={chapter} />
              </div>
              <Writers story={story} />
            </div>
          </div>
        </div>
        <div className='border-t bg-slate-50'>
          <div className='container py-4'>
            <RecommendedStories />
          </div>
        </div>
      </div>
      <Helmet>
        <title>{chapter?.title ? `${chapter.title} - Literasiin` : 'Literasiin'}</title>
      </Helmet>
    </Layout.Default>
  )
}
