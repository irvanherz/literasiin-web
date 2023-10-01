/* eslint-disable no-unused-vars */
import { ArrowUpTrayIcon } from '@heroicons/react/24/solid'
import { message } from 'antd'
import classNames from 'classnames'
import useMediaListInfinite from 'hooks/useMediaListInfinite'
import { DEFAULT_IMAGE } from 'libs/variables'
import Media from 'models/Media'
import { ReactElement, cloneElement, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useMutation } from 'react-query'
import MediaService from 'services/Media'
import ImageCropper, { useImageCropperState } from './ImageCropper'

type ImageType = 'story-cover' | 'storytelling-cover' | 'article-image' | 'photo' | 'asset'

type MediaItemProps = {
  media: any
  imageType: ImageType
  active?: boolean
  onClick?: (media: any) => void
}
function MediaItem({ media, imageType, active, onClick }:MediaItemProps) {
  const image = new Media(media)

  const handleClick = () => onClick?.(media)

  const aspectClassNames = useMemo(() => {
    return ({
      'story-cover': 'aspect-w-2 aspect-h-3',
      'storytelling-cover': 'aspect-1',
      'article-image': 'aspect-w-2 aspect-h-1',
      photo: 'aspect-1',
      asset: 'aspect-1'
    })[imageType]
  }, [imageType])

  return (
    <button
      type='button'
      className={classNames(aspectClassNames, 'shadow-md rounded-md overflow-hidden border-4', active ? 'border-emerald-500' : 'border-white hover:border-slate-300')}
      onClick={handleClick}
    >
      <img src={image.md?.url || DEFAULT_IMAGE} className='object-cover' />
    </button>
  )
}

type UploadButtonProps = {
  imageType: ImageType
  afterUploaded: (media: any) => void
}

function UploadButton({ imageType, afterUploaded }:UploadButtonProps) {
  const [medias, setMedias] = useState<any[]>([])
  const uploader = useMutation<any, any>((img) => MediaService.uploadImage(img, imageType))
  const inputRef = useRef<HTMLInputElement>(null)
  const cropper = useImageCropperState()

  const cropperAspect = useMemo(() => {
    return ({
      'story-cover': 2 / 3,
      'storytelling-cover': 1,
      'article-image': 2 / 1,
      photo: 1,
      asset: 0
    })[imageType]
  }, [imageType])

  const handleFileSelected = async (file: File) => {
    try {
      const image = await URL.createObjectURL(file)
      const cropped = imageType === 'asset' ? image : await cropper.crop(image, cropperAspect)
      const data = await uploader.mutateAsync(cropped)
      setMedias([...medias, data.data])
      afterUploaded(data.data)
    } catch (err: any) {
      message.error(err?.message)
    }
  }

  return (
    <>
      <button
        type='button'
        className='btn btn-sm btn-primary'
        onClick={() => inputRef.current?.click()}
      >
        <ArrowUpTrayIcon className='w-4' /> Upload
      </button>
      <input
        type='file'
        className='hidden'
        ref={inputRef}
        onChange={e => e.target.files?.[0] && handleFileSelected(e.target.files?.[0])}
      />
      <ImageCropper state={cropper} />
    </>
  )
}

type ImagePickerProps = {
  children: ReactElement
  onSelected?: (media: any) => void
  imageType: ImageType
}

export default function ImagePicker({ imageType, children, onSelected }: ImagePickerProps) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<any>(null)

  const { data, hasNextPage, fetchNextPage, refetch } = useMediaListInfinite({ type: 'image', tag: imageType })
  const medias: any[] = (data?.pages || []).reduce((a, c) => ([...a, ...c.data]), [] as any[])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleSelect = () => {
    onSelected?.(selected)
    handleClose()
  }

  return (
    <>
      {cloneElement(children, { onClick: handleOpen })}
      {open && createPortal(
        <dialog className={classNames('modal', open && 'modal-open')}>
          <form method="dialog" className="modal-box p-0 max-w-[800px] h-full max-h-[calc(100vh-32px)] flex flex-col">
            <div className='border-b flex-none font-black flex gap-2 p-4'>
              <div className='flex-1'>
                <input className='input input-bordered input-sm w-full' placeholder='Cari gambar' />
              </div>
              <div className='flex-none'>
                <UploadButton
                  imageType={imageType}
                  afterUploaded={() => refetch()}
                />
              </div>
            </div>
            <div className={classNames('overflow-y-scroll flex-1 adaptive-scroll')}>
              <div className='p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {medias.map(media => (
                  <MediaItem
                    key={media.id}
                    imageType={imageType}
                    active={selected?.id === media.id}
                    media={media}
                    onClick={media => setSelected(selected?.id === media.id ? null : media)}
                  />
                ))}
              </div>
            </div>
            <div className='border-t p-4 space-x-2 flex-none text-right'>
              <button type='button' className='btn btn-sm' onClick={handleClose}>Batal</button>
              <button type='button' className='btn btn-sm btn-primary' disabled={!selected} onClick={handleSelect}>Pilih</button>
            </div>
          </form>
          <form method="dialog" className="modal-backdrop">
            <button type='button' onClick={handleClose}>close</button>
          </form>
        </dialog>,
        document.body
      )}
    </>
  )
}
