import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import { message } from 'antd'
import { copyToClipboard, countWords } from 'libs/common'
import { useState } from 'react'
import { useMutation } from 'react-query'
import RobotsService from 'services/Robots'

export default function Autofix() {
  const [text, setText] = useState('')
  const [result, setResult] = useState<any>(null)
  const canProcess = countWords(text) >= 10
  const executor = useMutation<any, any, any>(payload => RobotsService.autofix(payload))

  const handleProcess = () => {
    executor.mutate({ text }, {
      onSuccess: (result) => {
        setResult(result.data)
      }
    })
  }

  const handleCopyResult = () => {
    copyToClipboard(result)
    message.success('Teks sudah disalin ke papan klip')
  }

  const handleReset = () => setResult(null)

  return (
    <div className="space-y-4">
      <div>
        <div className='font-black text-lg'>Perbaiki Teks</div>
        <div className='text-slate-500'>Masukkan teks yang ingin kamu perbaiki. LiterasiAI akan melakukan analisa dan memperbaiki teks kamu sehingga mengikuti kaidah penulisan yang benar.</div>
      </div>
      <div>
        {result !== null && (
          <div className='space-y-2'>
            <div className='border rounded-lg p-4 space-y-2'>
              <div className='font-bold text-sm text-slate-500'>Paragraf asli</div>
              <div>{text}</div>
            </div>
            <div className='border rounded-lg'>
              <div className='border-b p-4 space-y-2'>
                <div className='font-bold text-sm text-slate-500'>Paragraf hasil perbaikan</div>
                <div>
                  <textarea
                    readOnly
                    className='textarea textarea-sm textarea-bordered w-full shadow-sm min-h-[200px] leading-normal py-2'
                    value={result}
                  />
                </div>
              </div>
            </div>
            <div className='space-x-2'>
              <button className='btn btn-sm btn-primary' onClick={handleCopyResult}>Salin Hasil</button>
              <button className='btn btn-sm' onClick={handleReset}>Ganti Teks</button>
            </div>
          </div>
        )}
        {result === null && (
          <div className='space-y-4'>
            <div>
              <textarea
                className="textarea textarea-bordered textarea-sm w-full leading-normal py-2"
                placeholder="Pada suatu hari..."
                value={text}
                onChange={e => setText(e.target.value)}
              />
            </div>
            {!canProcess && <div className='font-bold text-sm text-red-700'>Dibutuhkan minimal 10 kata untuk memproses</div>}
            <div>
              <button
                className="btn btn-sm btn-primary"
                disabled={!canProcess}
                onClick={handleProcess}
              >
                <PaperAirplaneIcon className="w-4"/> Perbaiki Teks
              </button>
            </div>
          </div>
        )}
        {executor.isLoading && (
          <div className='fixed left-0 top-0 w-full h-full z-50 bg-black bg-opacity-90 text-white flex items-center'>
            <div className='w-full p-4 text-center'>
              <div>
                <span className="loading loading-spinner loading-md"></span>
              </div>
              <div className='font-black'>Tunggu Sebentar</div>
              <div className='text-sm'>LiterasiAI sedang memproses permintaan kamu</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
