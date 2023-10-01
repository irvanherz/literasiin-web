/* eslint-disable no-unused-vars */
/* eslint-disable no-unreachable */
import { theme } from 'antd'
import { DEFAULT_IMAGE } from 'libs/variables'
import { Link } from 'react-router-dom'
import Slider, { Settings } from 'react-slick'
import 'slick-carousel/slick/slick.css'

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid'
import image2 from './images/image2.png'
import image3 from './images/image3.png'

const CAROUSEL_SETTINGS: Settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  arrows: true,
  className: 'kbs-slider',
  prevArrow: <div><button className='btn btn-circle'><ArrowLeftIcon className='w-4' /></button></div>,
  nextArrow: <div><button className='btn btn-circle'><ArrowRightIcon className='w-4' /></button></div>,
  responsive: [
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 1
      }
    },
    {
      breakpoint: 920,
      settings: {
        slidesToShow: 3
      }
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4
      }
    }
  ]
}

type KbsProps = {
  config: any
}

export default function Kbs ({ config }: KbsProps) {
  const { token } = theme.useToken()
  const kbs: any[] = config?.kbs || []

  return (
    <div className='py-8'>
      <div className='container flex flex-col md:flex-row'>
        <div className='flex-1 text-center md:text-left'>
          <div className='font-black text-2xl pb-4'>Bagaimana kami <span className='text-emerald-600'>membantumu?</span></div>
          <div><img src={image3} className='max-w-[300px] m-auto' /></div>
        </div>
        <div className='flex-1'>
          <div className='text-2xl font-black pb-4'>Temukan yang lain</div>
          <div className='space-y-4'>
            <div className='flex items-center space-x-4 font-semibold'>
              <div className='flex-none'>
                <div className='rounded-full p-1 bg-white shadow-inner'>
                  <img src={`${process.env.PUBLIC_URL}/assets/images/home/icon1.svg`} className='w-8' />
                </div>
              </div>
              <div className='flex-1'>Buat Akun terlebih dahulu untuk memulai menulis, membaca dan menerbitkan buku</div>
            </div>
            <div className='flex items-center space-x-4 font-semibold'>
              <div className='flex-none'>
                <div className='rounded-full p-1 bg-white shadow-inner'>
                  <img src={`${process.env.PUBLIC_URL}/assets/images/home/icon2.svg`} className='w-8' />
                </div>
              </div>
              <div className='flex-1'>Menulis cerita hingga menerbitkan buku dengan mudah</div>
            </div>
            <div className='flex items-center space-x-4 font-semibold'>
              <div className='flex-none'>
                <div className='rounded-full p-1 bg-white shadow-inner'>
                  <img src={`${process.env.PUBLIC_URL}/assets/images/home/icon3.svg`} className='w-8' />
                </div>
              </div>
              <div className='flex-1'>Saat tulisanmu terupload,pembaca dapat membeli dan memberikan tip untuk karyamu dan karyamu akan di bukukan.</div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className='container mt-4 -mb-12'>
          <Slider {...CAROUSEL_SETTINGS}>
            {kbs.map(kb => (
              <div key={kb.id} className='px-2'>
                <Link to={kb?.url || '#'}>
                  <div className='relative aspect-w-3 aspect-h-4 rounded-md overflow-hidden shadow-md'>
                    {kb?.type === 'image'
                      ? <img src={kb?.imageUrl || DEFAULT_IMAGE} />
                      : <div className='kb-card-content'><div dangerouslySetInnerHTML={{ __html: kb?.title || '?' }} /></div>
                    }
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
        <div className='bg-yellow-100 h-16 border-t'></div>
      </div>
      <div className='bg-yellow-100 pb-8 border-b'>
        <div className='container flex items-center'>
          <div className='flex-1 space-y-2 text-center md:text-left'>
            <div className='text-2xl font-black'>Cari tahu lebih banyak Panduan Pengguna<br/><span className='text-emerald-600'>Agar kamu semakin paham</span></div>
            <div className='text-lg font-semibold'>Yuk baca panduan Literasiin dan manfaatkan fitur-fitur yang sudah kami siapkan untukmu.</div>
            <div>
              <Link to='/hc'><button className='btn btn-primary btn-sm'>Baca Sekarang</button></Link>
            </div>
          </div>
          <div className='flex-1 hidden md:block'>
            <img src={image2} className='block mb-[-72px]' />
          </div>
        </div>
      </div>
    </div>
  )
}
