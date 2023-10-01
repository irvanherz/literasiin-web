/* eslint-disable no-unused-vars */
/* eslint-disable no-unreachable */
// import StoryCard from 'components/StoryCard'
import useStories from 'hooks/useStories'
import { slugifyContentId } from 'libs/slug'
import { DEFAULT_IMAGE } from 'libs/variables'
import Media from 'models/Media'
import { useMemo } from 'react'
import { useIntl } from 'react-intl'
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

export default function StoryList () {
  const intl = useIntl()
  const { data, isLoading } = useStories({ limit: 20 })
  const stories: any[] = data?.data || []

  return (
    <div className='bg-slate-50 border-b'>
      <div className='bg-white h-12 rounded-b-3xl shadow-lg'></div>
      <div className='container'>
        <div className='-mt-12 pb-4'>
          {(isLoading && !stories.length) && (
            <Skeletons />
          )}
          <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4'>
            {stories.map(story => <StoryCard key={story.id} story={story} />)}
          </div>
          <div className='text-center pt-4 space-y-4'>
            <div>
              <Link to='/stories/explore'><button className='btn btn-primary btn-sm'>Jelajahi Lebih Banyak Cerita</button></Link>
            </div>
            <div className='text-slate-600 text-xs md:text-sm'>Literasiin berkomitmen untuk menjadi wadah inspirasi, ide, dan konsistensi menulismu lebih menyenangkan.<br />Bersama Literasiin, mulai tulisan pertamamu sekarang!</div>
          </div>
        </div>
      </div>
    </div>
  )
}
