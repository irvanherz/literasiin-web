/* eslint-disable no-unreachable */
import { InformationCircleIcon } from '@heroicons/react/24/solid'
import { message } from 'antd'
import classNames from 'classnames'
import TagsInput from 'components/TagsInput'
import useCustomComponent from 'hooks/useCustomComponent'
import useStoryCategories from 'hooks/useStoryCategories'
import { useEffect } from 'react'
import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import StoriesService from 'services/Stories'
import ImageInput from './ImageInput'

type CategoryInputProps = {
  value?: number
  defaultValue?: number
  onChange?:(val: number) => void
}
function CategoryInput({ value, defaultValue, onChange }: CategoryInputProps) {
  const [computedValue, triggerChange] = useCustomComponent({ value, defaultValue, onChange })
  const { data } = useStoryCategories({})
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

const LANGUAGES = [
  {
    id: 'en',
    name: 'Bahasa Inggris'
  },
  {
    id: 'id',
    name: 'Bahasa Indonesia'
  }
]

type LanguageInputProps = {
  value?: string
  defaultValue?: string
  onChange?:(val?: string) => void
}

function LanguageInput({ value, defaultValue, onChange }: LanguageInputProps) {
  const [computedValue, triggerChange] = useCustomComponent({ value, defaultValue, onChange })
  return (
    <select
      value={computedValue}
      onChange={e => triggerChange(e.target.value)}
      className="select select-sm select-bordered w-full"
      placeholder='Pilih bahasa...'
    >
      {LANGUAGES.map(lang => (
        <option key={lang.id} value={lang.id}>{lang.name}</option>
      ))}
    </select>
  )
}

type StoryDetailsEditTabProps = { story: any }
export default function StoryDetailsEditTab ({ story }: StoryDetailsEditTabProps) {
  const storyId = story?.id
  const navigate = useNavigate()
  const updater = useMutation<any, any, any>(payload => StoriesService.updateById(storyId, payload))

  const { register, control, handleSubmit, reset, formState: { errors } } = useForm()

  const initialValues = story

  useEffect(() => {
    reset({
      cover: story?.cover,
      title: story?.title,
      description: story?.description,
      categoryId: story?.categoryId,
      languageId: story?.languageId,
      tags: story?.tags
    })
  }, [initialValues])

  const handleSubmitOK: SubmitHandler<any> = (values: any) => {
    const { cover, ...payload } = values
    payload.coverId = cover?.id || null
    updater.mutate(payload, {
      onSuccess: () => {
        navigate('/stories/mine')
      },
      onError: (err: any) => {
        message.error(err?.message)
      }
    })
  }

  const handleSubmitError: SubmitErrorHandler<any> = async (values: any) => {
    message.error('Mohon periksa ulang formulir')
  }

  return (
    <form className='flex gap-4 flex-col md:flex-row'>
      <div className='w-full md:w-1/4'>
        <Controller
          control={control}
          name="cover"
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
      <div className='w-full md:w-3/4 bg-white shadow rounded-lg p-4'>
        <div className="mb-2">
          <label className="block text-gray-700 font-semibold mb-2">Judul Cerita</label>
          <div className='mb-1'>
            <input
              type='text'
              className={classNames('input input-sm input-bordered w-full font-bold shadow-sm', errors.title && 'input-error')}
              placeholder="Masukkan judul cerita..."
              {...register('title', { required: { value: true, message: 'Judul tidak boleh kosong' } })}
            />
          </div>
          <div className='font-semibold min-h-[8px]'>
            {errors.title && <p className='text-error flex items-center gap-1'><InformationCircleIcon className='w-4 inline'/> <span>{errors.title.message?.toString()}</span></p>}
          </div>
        </div>
        <div className="mb-2">
          <label className="block text-gray-700 font-semibold mb-2">Sinopsis Cerita</label>
          <div className='mb-1'>
            <textarea
              className={classNames('input input-sm input-bordered w-full font-bold shadow-sm min-h-[100px] leading-normal py-2', errors.description && 'input-error')}
              placeholder="Masukkan sinopsis cerita..."
              {...register('description', { required: { value: true, message: 'Sinopsis tidak boleh kosong' } })}
            />
          </div>
          <div className='font-semibold min-h-[8px]'>
            {errors.description && <p className='text-error flex items-center gap-1'><InformationCircleIcon className='w-4 inline'/> <span>{errors.description.message?.toString()}</span></p>}
          </div>
        </div>
        <div className='flex flex-col md:flex-row gap-0 md:gap-4'>
          <div className='flex-1'>
            <div className="mb-2">
              <label className="block text-gray-700 font-semibold mb-2">Kategori Cerita</label>
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
              <div className='font-semibold min-h-[8px]'>
                {errors.categoryId && <p className='text-error flex items-center gap-1'><InformationCircleIcon className='w-4 inline'/> <span>{errors.categoryId.message?.toString()}</span></p>}
              </div>
            </div>
          </div>
          <div className='flex-1'>
            <div className="mb-2">
              <label className="block text-gray-700 font-semibold mb-2">Bahasa</label>
              <div className='mb-1'>
                <Controller
                  control={control}
                  name="languageId"
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                    fieldState: { invalid, isTouched, isDirty, error },
                    formState
                  }) => (
                    <LanguageInput
                      onChange={onChange}
                      value={value}
                    />
                  )}
                />
              </div>
              <div className='font-semibold min-h-[8px]'>
                {errors.languageId && <p className='text-error flex items-center gap-1'><InformationCircleIcon className='w-4 inline'/> <span>{errors.languageId.message?.toString()}</span></p>}
              </div>
            </div>
          </div>
        </div>
        <div className="mb-2">
          <label className="block text-gray-700 font-semibold mb-2">Tag</label>
          <div className='mb-1'>
            <Controller
              control={control}
              name="tags"
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error },
                formState
              }) => (
                <TagsInput
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>
          <div className='font-semibold min-h-[8px]'>
            {errors.tags && <p className='text-error flex items-center gap-1'><InformationCircleIcon className='w-4 inline'/> <span>{errors.tags.message?.toString()}</span></p>}
          </div>
        </div>
        <div>
          <button
            disabled={updater.isLoading}
            className='btn btn-sm btn-primary'
            onClick={handleSubmit(handleSubmitOK, handleSubmitError)}
          >
            Update Detail Cerita
          </button>
        </div>
      </div>
    </form>
  )
}
