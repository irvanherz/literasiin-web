import { DEFAULT_IMAGE } from 'libs/variables'
import Media from 'models/Media'
import { Link } from 'react-router-dom'

type WriterProps = { writer: any }
function Writer ({ writer }: WriterProps) {
  const avatar = new Media(writer?.photo)
  return (
    <Link to={`/users/${writer.username}`} className='flex items-center p-4 gap-2'>
      <div className='w-10'>
        <div className='overflow-hidden rounded-sm aspect-1'>
          <img src={avatar.md?.url || DEFAULT_IMAGE} className='object-cover' />
        </div>
      </div>
      <div className='flex-1'>
        <div className='font-bold'>{writer.fullName}</div>
        <div className='text-sm text-slate-500'>{writer.bio}</div>
      </div>
    </Link>
  )
}

type WritersProps = {
  story: any
}

export default function Writers ({ story }: WritersProps) {
  const writers: any[] = story?.writers || []
  return (
    <div className='rounded-lg bg-white shadow'>
      <div className='font-black text-slate-500 px-4 pt-4'>Penulis</div>
      <div className='divide-y'>
        {writers.map(writer => <Writer key={writer.id} writer={writer} />)}
      </div>
    </div>
  )
}
