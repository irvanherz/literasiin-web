import Layout from 'components/Layout'
import analytics from 'libs/analytics'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function NotFound () {
  const navigate = useNavigate()
  const handleBack = () => {
    navigate(-1)
  }

  useEffect(() => {
    analytics.page({
      title: 'Not Found',
      url: window.location.href
    })
  }, [])

  return (
    <Layout.Blank>
      <div className="text-center py-16">
        <div className="inline-flex rounded-full bg-yellow-100 p-2">
          <div className="rounded-full stroke-yellow-600 bg-yellow-200 p-2">
            <svg className="w-8 h-8" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.0002 9.33337V14M14.0002 18.6667H14.0118M25.6668 14C25.6668 20.4434 20.4435 25.6667 14.0002 25.6667C7.55684 25.6667 2.3335 20.4434 2.3335 14C2.3335 7.55672 7.55684 2.33337 14.0002 2.33337C20.4435 2.33337 25.6668 7.55672 25.6668 14Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
          </div>
        </div>
        <h1 className="mt-4 font-bold text-slate-800 text-2xl">Halaman Tidak Ditemukan</h1>
        <p className="text-slate-600 mt-2 text-base">Halaman yang kamu tuju tidak ditemukan atau sudah dihapus</p>
        <div className='pt-4'>
          <button onClick={handleBack} className='btn btn-sm'>Kembali</button>
        </div>
      </div>
    </Layout.Blank>
  )
}
