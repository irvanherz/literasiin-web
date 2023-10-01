/* eslint-disable no-unused-vars */
import { DocumentArrowDownIcon, EyeIcon, PaperAirplaneIcon } from '@heroicons/react/24/solid'
import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html'
import { message } from 'antd'
import classNames from 'classnames'
import Layout from 'components/Layout'
import StoryEditor from 'components/LexicalEditor/StoryEditor'
import PageHeader from 'components/PageHeader'
import RouteGuard from 'components/RouteGuard'
import RenderTimeFromNow from 'components/shared/RenderTimeFromNow'
import useStoryChapter from 'hooks/useStoryChapter'
import useStoryChapterUpdate from 'hooks/useStoryChapterUpdate'
import { $getRoot, $isDecoratorNode, $isElementNode, LexicalEditor } from 'lexical'
import analytics from 'libs/analytics'
import { contentIdFromSlug, slugifyContentId } from 'libs/slug'
import { DEFAULT_IMAGE } from 'libs/variables'
import Media from 'models/Media'
import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useParams } from 'react-router-dom'

export default function StoryChapterEdit () {
  const params = useParams()
  const chapterId = contentIdFromSlug(params.chapterId || '')
  const updater = useStoryChapterUpdate(chapterId)
  const [autosaveMessage, setAutosaveMessage] = useState('')
  const [editor, setEditor] = useState<LexicalEditor>()
  const { register, control, handleSubmit, reset, getValues, formState: { errors } } = useForm()

  const { data, refetch } = useStoryChapter(chapterId, { includeStory: true })

  const chapter = data?.data

  const story = chapter?.story

  const cover = new Media(story?.cover)

  useEffect(() => {
    analytics.page({
      title: 'Edit Story',
      url: window.location.href
    })
  }, [chapter])

  useLayoutEffect(() => {
    if (!chapter || !editor) return
    reset({
      title: chapter?.title,
      description: chapter?.description,
      commentStatus: chapter?.commentStatus
    })
    editor.update(() => {
      // In the browser you can use the native DOMParser API to parse the HTML string.
      const parser = new DOMParser()
      const dom = parser.parseFromString(chapter?.content || '', 'text/html')
      // Once you have the DOM instance it's easy to generate LexicalNodes.
      const nodes = $generateNodesFromDOM(editor!, dom)
      // Select the root
      const root = $getRoot()
      root.clear()
      nodes.forEach((n) => {
        if ($isElementNode(n) || $isDecoratorNode(n)) {
          root.append(n)
        }
      })
    })
  }, [chapter, editor])

  const handleSave = useCallback(async (type:string = 'save') => {
    try {
      if (type === 'autosave') setAutosaveMessage('Sedang menjalankan autosave...')
      const content = await new Promise((resolve) => {
        const editorState = editor!.getEditorState()
        editorState.read(() => {
          const content = $generateHtmlFromNodes(editor!)
          resolve(content)
        })
      })

      let successMessage = 'Bab sudah tersimpan'
      const values = getValues()
      values.content = content
      if (type === 'publish') {
        if (
          (values.title || '').length >= 5 &&
          (values.description || '').length >= 5 &&
          (values.content || '').length >= 50
        ) {
          values.status = 'published'
        } else {
          successMessage = 'Bab sudah tersimpan, namun masih berstatus draft. Pastikan judul, deskripsi singkat, atau isi cerita tidak terlalu pendek.'
        }
      } else if (type === 'revert_to_draft') {
        values.status = 'draft'
      }

      await updater.mutateAsync(values)
      if (type === 'autosave') {
        setAutosaveMessage('Berhasil menyimpan cerita otomatis')
      } else {
        message.success(successMessage)
        setAutosaveMessage('')
        refetch()
      }
    } catch (err) {
      console.log(err)
      message.error('Terjadi kesalahan')
      if (type === 'autosave') setAutosaveMessage('Terjadi kesalahan saat melakukan autosave')
    }
  }, [editor, refetch, updater, autosaveMessage])

  useEffect(() => {
    const interval = setInterval(async () => {
      await handleSave('autosave')
      setTimeout(() => setAutosaveMessage(''), 5000)
    }, 60000)
    return () => clearInterval(interval) // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [[editor, refetch, updater, autosaveMessage]])

  return (
    <RouteGuard require='authenticated'>
      <Layout.Default
        beforeContent={
          <PageHeader
            title={
              <div className='flex font-normal gap-4'>
                <div className='w-16'>
                  <div className='aspect-w-2 aspect-h-3 overflow-hidden rounded-md shadow'>
                    <img src={cover.md?.url || DEFAULT_IMAGE} className='object-cover' />
                  </div>
                </div>
                <div className='flex-1'>
                  <div className='text-slate-500 text-sm'>Edit Bab Cerita</div>
                  <div className='font-black'>{story?.title || <i>Cerita tanpa judul</i>}</div>
                  <div className='text-sm text-slate-600'>{chapter?.title || <i>Bab tanpa judul</i>}</div>
                </div>
              </div>
            }
            extra={
              <div className='flex gap-2'>
                <div className="dropdown dropdown-bottom">
                  <label tabIndex={0} className='btn btn-sm'><EyeIcon className='w-4' /><span className='hidden md:inline'>Pratinjau</span></label>
                  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><Link to={`/stories/chapters/${slugifyContentId(chapter)}`}><EyeIcon className='w-4' /> Pratinjau Bab</Link></li>
                    <li><button disabled={updater.isLoading} onClick={() => handleSave('save')}><DocumentArrowDownIcon className='w-4' />Simpan</button></li>
                    <li><button disabled={updater.isLoading} onClick={() => handleSave('revert_to_draft')}><DocumentArrowDownIcon className='w-4' />Kembalikan ke Draf</button></li>
                  </ul>
                </div>
                <button
                  className='btn btn-sm btn-primary'
                  disabled={updater.isLoading}
                  onClick={() => handleSave('publish')}
                >
                  <PaperAirplaneIcon className='w-4' /> <span className='hidden md:inline'>Publish</span>
                </button>
              </div>
            }
          />
      }
      >
        {!!autosaveMessage && (
          <div className='bg-emerald-800 text-white'>
            <div className='container py-2 text-sm'>{autosaveMessage}</div>
          </div>
        )}
        <div className='container flex flex-col md:flex-row gap-4 py-4'>
          <div className='w-full md:w-8/12'>
            <div className="mb-2">
              <label className="block text-gray-700 font-semibold mb-2">Judul Bab</label>
              <div className='mb-1'>
                <input
                  type='text'
                  className={classNames('input input-sm input-bordered w-full font-bold shadow-sm', errors.title && 'input-error')}
                  placeholder="Masukkan judul bab..."
                  {...register('title')}
              />
              </div>
              <div className='font-semibold min-h-[8px]'></div>
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 font-semibold mb-2">Deskripsi Singkat</label>
              <div className='mb-1'>
                <textarea
                  className={classNames('input input-sm input-bordered w-full font-bold shadow-sm min-h-[100px] leading-normal py-2', errors.description && 'input-error')}
                  placeholder="Masukkan deskripsi singkat tentang bab ini..."
                  {...register('description')}
                />
              </div>
              <div className='font-semibold min-h-[8px]'></div>
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 font-semibold mb-2"></label>
              <div className='mb-1'>
                <StoryEditor onReady={setEditor} />
              </div>
              <div className='font-semibold min-h-[8px]'></div>
            </div>
          </div>
          <div className='w-full md:w-4/12 border-l-0 md:border-l pl-0 md:pl-4 space-y-4'>
            <div className='bg-white rounded-lg shadow p-4 space-y-2'>
              <div>
                <div className='text-slate-500 text-sm font-bold'>Status bab</div>
                <div className='text-slate-800 font-black'>{(chapter?.status || '').toUpperCase()}</div>
              </div>
              <div>
                <div className='text-slate-500 text-sm font-bold'>Terakhir update</div>
                <div className='text-slate-800 font-black'><RenderTimeFromNow timestamp={chapter?.updatedAt} /></div>
              </div>
            </div>
            <div className='bg-white rounded-lg shadow p-4 space-y-2'>
              <div>
                <div className='text-slate-700 font-bold'>Izinkan Komentar</div>
                <div className='text-slate-500 text-sm'>Anda bisa mengaktifkan atau menonaktifkan komentar sementara.</div>
                <div className='mt-2'>
                  <select
                    className="select select-sm select-bordered w-full"
                    {...register('commentStatus')}
                  >
                    <option value='enabled'>Aktifkan</option>
                    <option value='disabled'>Nonaktif</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout.Default>
    </RouteGuard>

  )
}
