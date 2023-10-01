/* eslint-disable no-unreachable */
import { Link } from 'react-router-dom'

import useCurrentUser from 'hooks/useCurrentUser'
import image1 from './images/image1.png'

export default function Header () {
  const currentUser = useCurrentUser()
  return (
    <div className='bg-white relative bg-cover bg-bottom' style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/bg-1.jpg)` }}>
      <div className='container flex py-8'>
        <div className='w-full md:w-3/4 space-y-4 text-center md:text-left self-center'>
          <div className='text-2xl md:text-4xl font-black text-slate-800'>Portal <span className='text-emerald-600'>Menulis</span> dan Menerbitkan <span className='text-emerald-600'>Buku</span> Jadi Lebih <span className='text-emerald-600'>Menyenangkan!</span></div>
          <div className='text-base font-medium md:text-lg md:font-semibold text-slate-700'>Mau bangun ceritamu lebih menarik? Tapi bingung gimana caranya? Yuk tulis, temukan banyak pembaca dan temukan banyak penerbit.</div>
          {!currentUser && (
            <div className='space-x-2'>
              <Link className='btn btn-sm btn-primary' to='/auth/signup'>Daftar</Link>
              <Link className='btn btn-sm' to='/auth/signin'>Masuk</Link>
            </div>
          )}
        </div>
        <div className='w-0 md:w-4/12 lg:4/12 xl:4/12'>
          <img src={image1} className='w-full' />
        </div>
      </div>
    </div>
  )
}
