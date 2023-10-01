import { ArrowRightIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'

export default function AiSection () {
  return (
    <div className='rounded-lg flex items-center p-4 bg-emerald-600 text-white flex-col sm:flex-row gap-4 shadow-md'>
      <div className='flex-1'>
        <div className='font-black text-xl'>Tidak Punya Ide?</div>
        <p className='mt-2'>Literasiin punya robot untuk membuatkanmu ide cerita yang menarik.</p>
      </div>
      <div className='flex-none'>
        <Link to='/literasi-ai/story-ideas'>
          <button className='btn btn-sm'>Coba Sekarang <ArrowRightIcon className='w-4' /></button>
        </Link>
      </div>
    </div>
  )
}
