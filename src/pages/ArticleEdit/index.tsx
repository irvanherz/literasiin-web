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
import useArticle from 'hooks/useArticle'
import useArticleCategories from 'hooks/useArticleCategories'
import useArticleUpdate from 'hooks/useArticleUpdate'
import useCustomComponent from 'hooks/useCustomComponent'
import { $getRoot, $isDecoratorNode, $isElementNode, LexicalEditor } from 'lexical'
import analytics from 'libs/analytics'
import { contentIdFromSlug } from 'libs/slug'
import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Controller, useForm } from 'react-hook-form'
import { Link, useParams } from 'react-router-dom'
import ImageInput from './ImageInput'

type CategoryInputProps = {
  value?: number
  defaultValue?: number
  onChange?:(val: number) => void
}
function CategoryInput({ value, defaultValue, onChange }: CategoryInputProps) {
  const [computedValue, triggerChange] = useCustomComponent({ value, defaultValue, onChange })
  const { data } = useArticleCategories({})
  const categories: any[] = data?.data || []

  return (
    <select
      value={computedValue}
      onChange={e => triggerChange(+e.target.value)}
      className="select select-sm select-bordered w-full"
      placeholder='Pilih kategori...'
    >
      {categories.map(cat => (
        <option key={cat.id} value={cat.id}>{cat.name}</option>
      ))}
    </select>
  )
}

export default function ArticleEdit () {
  const params = useParams()
  const articleId = contentIdFromSlug(params.articleId || '')
  const { data, refetch } = useArticle(articleId)
  const updater = useArticleUpdate(articleId)
  const article = data?.data
  const [editor, setEditor] = useState<LexicalEditor>()
  const { register, control, handleSubmit, reset, getValues, formState: { errors } } = useForm()

  useEffect(() => {
    analytics.page({
      title: 'Edit Article - Literasiin',
      url: window.location.href
    })
  }, [])

  useLayoutEffect(() => {
    if (!article || !editor) return
    reset({
      title: article?.title,
      description: article?.description,
      categoryId: article?.categoryId,
      image: article?.image
    })
    editor.update(() => {
      // In the browser you can use the native DOMParser API to parse the HTML string.
      const parser = new DOMParser()
      const dom = parser.parseFromString(article?.content || '', 'text/html')
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
  }, [article, editor])

  const handleSave = useCallback(async (type:string = 'save') => {
    try {
      const content = await new Promise((resolve) => {
        const editorState = editor!.getEditorState()
        editorState.read(() => {
          const content = $generateHtmlFromNodes(editor!)
          resolve(content)
        })
      })

      let successMessage = 'Artikel sudah tersimpan'
      const values = getValues()
      values.imageId = values.image?.id || null
      delete values.image
      values.content = content
      if (type === 'publish') {
        if (
          (values.title || '').length >= 5 &&
          (values.description || '').length >= 5 &&
          (values.content || '').length >= 50
        ) {
          values.status = 'published'
        } else {
          successMessage = 'Artikel sudah tersimpan, namun masih berstatus draft. Pastikan judul, deskripsi singkat, atau isi artikel tidak terlalu pendek.'
        }
      } else if (type === 'revert_to_draft') {
        values.status = 'draft'
      }

      await updater.mutateAsync(values)
      message.success(successMessage)
      refetch()
    } catch (err) {
      console.log(err)
      message.error('Terjadi kesalahan')
    }
  }, [editor, refetch, updater])

  return (
    <RouteGuard require='authenticated'>
      <Layout.Default
        className='bg-slate-50'
        beforeContent={
          <PageHeader
            title='Edit'
            description='Judul Artikel'
            extra={
              <div className='flex gap-2'>
                <div className="dropdown dropdown-bottom">
                  <label tabIndex={0} className='btn btn-sm'><EyeIcon className='w-4' /><span className='hidden md:inline'>Pratinjau</span></label>
                  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><Link to='/'><EyeIcon className='w-4' /> Pratinjau Artikel</Link></li>
                    <li><button disabled={updater.isLoading} onClick={() => handleSave('save')}><DocumentArrowDownIcon className='w-4' />Simpan</button></li>
                    <li><button disabled={updater.isLoading} onClick={() => handleSave('revert_to_draft')}><DocumentArrowDownIcon className='w-4' />Kembalikan ke Draf</button></li>
                  </ul>
                </div>
                <button className='btn btn-sm btn-primary' onClick={() => handleSave('publish')}><PaperAirplaneIcon className='w-4' /> <span className='hidden md:inline'>Publish</span></button>
              </div>
            }
          />
        }
        contentContainerClassName='flex flex-row'
      >
        <div className='container py-4 flex-1 flex gap-4 flex-col md:flex-row divide-0 md:divide-x'>
          <div className='w-full md:w-4/6 lg:8/12 space-y-4'>
            <div className="mb-2">
              <label className="block text-gray-700 font-semibold mb-2">Judul Bab</label>
              <div className='mb-1'>
                <input
                  type='text'
                  className={classNames('input input-sm input-bordered w-full font-bold shadow-sm', errors.title && 'input-error')}
                  placeholder="Masukkan judul artikel..."
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
                  placeholder="Masukkan deskripsi singkat tentang artikel ini..."
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
          <div className='w-full md:w-2/6 space-y-4 md:pl-4'>
            <div className='bg-white rounded-lg shadow p-4 space-y-2'>
              <div>
                <div className='text-slate-500 text-sm font-bold'>Status artikel</div>
                <div className='text-slate-800 font-black'>{(article?.status || '').toUpperCase()}</div>
              </div>
              <div>
                <div className='text-slate-500 text-sm font-bold'>Terakhir update</div>
                <div className='text-slate-800 font-black'><RenderTimeFromNow timestamp={article?.updatedAt} /></div>
              </div>
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 font-semibold mb-2">Gambar</label>
              <div className='mb-1'>
                <Controller
                  control={control}
                  name="image"
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                    fieldState: { invalid, isTouched, isDirty, error },
                    formState
                  }) => (
                    <ImageInput
                      onChange={onChange}
                      value={value}
                    />
                  )}
                />
              </div>
              <div className='font-semibold min-h-[8px]'></div>
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 font-semibold mb-2">Kategori Artikel</label>
              <div className='mb-1'>
                <Controller
                  control={control}
                  name="categoryId"
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                    fieldState: { invalid, isTouched, isDirty, error },
                    formState
                  }) => (
                    <CategoryInput
                      onChange={onChange}
                      value={value}
                    />
                  )}
                />
              </div>
              <div className='font-semibold min-h-[8px]'></div>
            </div>
          </div>
        </div>
        <Helmet>
          <title>Edit Article - Literasiin</title>
        </Helmet>
      </Layout.Default>
    </RouteGuard>
  )
}
