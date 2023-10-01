import useStorytellings from 'hooks/useStorytellings'
import { slugifyContentId } from 'libs/slug'
import { DEFAULT_IMAGE } from 'libs/variables'
import Media from 'models/Media'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'

type StorytellingCardProps = {
  storytelling: any
}

function StorytellingCard({ storytelling }:StorytellingCardProps) {
  const authors = useMemo(() => {
    const writers: any[] = storytelling?.authors || []
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
  }, [storytelling?.authors])

  const image = new Media(storytelling?.cover)

  return (
    <Link to={`/storytellings/${slugifyContentId(storytelling)}`} className='card space-y-2'>
      <div className='relative border border-slate-200 overflow-hidden rounded-lg aspect-1'>
        <img src={image.md?.url || DEFAULT_IMAGE} className='absolute left-0 top-0 w-full h-full object-cover' />
      </div>
      <div className='text-center'>
        <div className='font-bold'>{storytelling.title}</div>
        <div className='overflow-hidden text-ellipsis whitespace-nowrap text-slate-600'>{authors}</div>
      </div>
    </Link>
  )
}

export default function StorytellingList () {
  const { data } = useStorytellings({ limit: 20 })
  const storytellings: any[] = data?.data || []

  return storytellings.length
    ? (
      <div className='bg-yellow-100 py-8 border-b'>
        <div className='container space-y-4'>
          <div>
            <div className='font-black text-2xl'>Tidak Ada Waktu Membaca?</div>
            <div>Pasang earphone. Ada koleksi cerita yang bisa kamu dengarkan sambil bersantai.</div>
          </div>
          <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4'>
            {storytellings.map(st => <StorytellingCard key={st.id} storytelling={st} />)}
          </div>
        </div>
      </div>
      )
    : null
}
