import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import { message } from 'antd'
import { countWords } from 'libs/common'
import { slugifyContentId } from 'libs/slug'
import { useState } from 'react'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import RobotsService from 'services/Robots'

export default function StoryIdeas() {
  const [text, setText] = useState('')
  const canProcess = countWords(text) >= 5
  const [idea, setIdea] = useState<any>(null)
  const executor = useMutation<any, any, any>(payload => RobotsService.storyIdea(payload))
  const navigate = useNavigate()
  const builder = useMutation<any, any, any>(payload => RobotsService.buildStory(payload))

  const handleProcess = () => {
    executor.mutate({ text }, {
      onSuccess: (result) => {
        setIdea(result.data)
      }
    })
  }

  const handleReset = () => setIdea(null)

  const handleBuildStory = async () => {
    try {
      const result = await builder.mutateAsync(idea)
      const story = result.data
      navigate(`/stories/${slugifyContentId(story)}/edit`)
    } catch (error) {
      message.error('Terjadi kesalahan')
    }
  }

  return (
    <div>
      {idea !== null && (
        <div className='space-y-2'>
          <div className='border rounded-lg p-4 bg-emerald-700 text-white'>
            <div className='text-slate-200 text-sm'>Ringkasan</div>
            <div>{text}</div>
          </div>
          <div className='border rounded-lg'>
            <div className='border-b p-4 space-y-2'>
              <div>
                <div className='text-slate-500 text-sm'>Judul</div>
                <div className='font-bold'>{idea.title}</div>
              </div>
              <div>
                <div className='text-slate-500 text-sm'>Sinopsis</div>
                <div>{idea.description}</div>
              </div>
            </div>
            <div className='divide-y'>
              {idea.chapters.map((chapter: any) => (
                <div key={chapter.title} className='p-4 space-y-2'>
                  <div className='font-bold'>{chapter.title}</div>
                  <ul className='list-disc pl-4 text-slate-700 text-sm'>
                    {chapter.outlines.map((outline: any) => (
                      <li key={outline}>{outline}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className='space-x-2'>
            <button className='btn btn-sm btn-primary' disabled={builder.isLoading} onClick={handleBuildStory}>Buat Cerita</button>
            <button className='btn btn-sm' onClick={handleReset}>Ganti Ringkasan</button>
          </div>
        </div>
      )}
      {idea === null && (
        <div className="space-y-4">
          <div>
            <div className='font-black text-lg'>Cari Ide Cerita</div>
            <div className='text-slate-500'>Masukkan ringkasan cerita di bawah ini. LiterasiAI akan membuatkanmu ide outline cerita berdasarkan permintaan kamu.</div>
          </div>
          <div>
            <textarea
              className="textarea textarea-bordered textarea-sm w-full leading-normal py-2"
              placeholder="Cerita superhero melawan penjahat..."
              value={text}
              onChange={e => setText(e.target.value)}
              />
          </div>
          {!canProcess && <div className='font-bold text-sm text-red-700'>Dibutuhkan minimal 5 kata untuk memproses</div>}
          <div>
            <button
              className="btn btn-sm btn-primary"
              disabled={!canProcess}
              onClick={handleProcess}
              >
              <PaperAirplaneIcon className="w-4"/> Buat Outline Cerita
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
  )
}
