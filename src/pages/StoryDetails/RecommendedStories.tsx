import { slugifyContentId } from 'libs/slug'
import { DEFAULT_IMAGE } from 'libs/variables'
import Media from 'models/Media'
import { useMemo } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import StoriesService from 'services/Stories'

type StoryItemProps = {
  story: any
}
function StoryItem ({ story }: StoryItemProps) {
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

  const cover = new Media(story.cover)

  return (
    <Link to={`/stories/${slugifyContentId(story)}`} className='flex gap-2 p-2 rounded-lg shadow bg-white'>
      <div className='w-1/4'>
        <div className='aspect-w-2 aspect-h-3 rounded-lg overflow-hidden shadow'>
          <img src={cover.md?.url || DEFAULT_IMAGE} className='object-cover' />
        </div>
      </div>
      <div className='w-3/4'>
        <div className='text-sm font-black line-clamp-1'>{story.title}</div>
        <div className='text-xs line-clamp-1 text-slate-500'>{authors}</div>
        <div className='text-xs pt-2 font-bold text-slate-600'><span>{story.meta?.numPublishedChapters}</span> <span>bab cerita</span></div>
      </div>
    </Link>
  )
}

export default function RecommendedStories () {
  const { data } = useQuery('stories[recommended]', () => StoriesService.findMany({ limit: 5 }))
  const stories: any[] = data?.data || []

  return (
    <div>
      <div className='text-slate-500 font-bold text-lg mb-4'>Cerita lainnya</div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {stories.map(story => <StoryItem key={story.id} story={story} />)}
      </div>
    </div>
  )
}
