import { EyeIcon } from '@heroicons/react/24/solid'
import { slugifyContentId } from 'libs/slug'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import StoriesService from 'services/Stories'

function StoryChaptersEmpty() {
  return (
    <div className="text-center py-8">
      <div className="inline-flex rounded-full bg-yellow-100 p-2">
        <div className="rounded-full stroke-yellow-600 bg-yellow-200 p-2">
          <svg className="w-8 h-8" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.0002 9.33337V14M14.0002 18.6667H14.0118M25.6668 14C25.6668 20.4434 20.4435 25.6667 14.0002 25.6667C7.55684 25.6667 2.3335 20.4434 2.3335 14C2.3335 7.55672 7.55684 2.33337 14.0002 2.33337C20.4435 2.33337 25.6668 7.55672 25.6668 14Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
        </div>
      </div>
      <h1 className="mt-4 font-bold text-slate-800 text-2xl">Tidak Ada Bab</h1>
      <p className="text-slate-600 mt-2 text-base">Cerita ini belum memiliki bab yang bisa dibaca. Periksa lagi nanti.</p>
    </div>
  )
}

type StoryChaptersProps = {
  story: any
}

export default function StoryChapters ({ story }:StoryChaptersProps) {
  const storyId = story?.id
  const { data } = useQuery(`stories[${storyId}].chapters`, () => StoriesService.Chapters.findMany({ storyId }), { enabled: !!storyId })
  const chapters: any[] = data?.data || []

  if (!chapters.length) {
    return (
      <StoryChaptersEmpty />
    )
  } else {
    return (
      <ul className="menu p-0 space-y-2">
        {chapters.map(chapter => (
          <li key={chapter.id}>
            <Link to={`/stories/chapters/${slugifyContentId(chapter)}`} className='flex border'>
              <span className='flex-1'>
                <div className='font-bold'>{chapter.title}</div>
                <div className='text-sm text-slate-600'>{chapter.description || <i>Tidak ada ringkasan</i>}</div>
              </span>
              <span className='flex-none'><EyeIcon className='w-4 inline' /> {chapter?.meta?.numReads || 0}</span>
            </Link>
          </li>
        ))}
      </ul>
    )
  }
}
