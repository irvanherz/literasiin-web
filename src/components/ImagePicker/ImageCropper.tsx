import classNames from 'classnames'
import { useCallback, useState } from 'react'
import { createPortal } from 'react-dom'
import Cropper from 'react-easy-crop'
import { getCroppedImg } from './Cropper'

type ImageCropperState = {
  aspect: number
  image: string
  handler: { resolve: any, reject: any }
  crop: (image: any) => Promise<any>
}

type ImageCropperProps = {
  state: ImageCropperState
}

export default function ImageCropper({ state }: ImageCropperProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null)

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    // console.log(croppedArea, croppedAreaPixels)
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const handleClose = () => {
    state.handler.reject(new Error('Cropper is closed'))
  }

  const handleCrop = async () => {
    const croppedImg = await getCroppedImg(state.image, croppedAreaPixels)
    state.handler.resolve(croppedImg)
  }

  return (
    <>
      {state.image && createPortal(
        <dialog className={classNames('modal', state.image && 'modal-open')}>
          <form method="dialog" className="modal-box p-0 max-w-[800px] h-full max-h-[calc(100vh-32px)] flex flex-col">
            <div className='p-4 flex-none font-black'>Sesuaikan Gambar</div>
            <div className="flex-1 relative">
              <Cropper
                image={state.image}
                crop={crop}
                zoom={zoom}
                aspect={state.aspect}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>
            <div className='border-t p-4 space-x-2 flex-none text-right'>
              <button className='btn btn-sm btn-primary' onClick={handleCrop}>Upload</button>
              <button className='btn btn-sm' onClick={handleClose}>Batal</button>
            </div>
          </form>
          <form method="dialog" className="modal-backdrop">
            <button onClick={handleClose}>close</button>
          </form>
        </dialog>,
        document.body
      )}
    </>
  )
}

export function useImageCropperState() {
  const [aspect, setAspect] = useState(1)
  const [image, setImage] = useState<any>(null)
  const [handler, setHandler] = useState<any>(null)

  const crop = async (img: any, aspect = 1) => {
    return new Promise<any>((resolve, reject) => {
      setImage(img)
      setAspect(aspect)
      setHandler({
        resolve: (img: any) => {
          resolve(img)
          setImage(null)
        },
        reject: (err: any) => {
          reject(err)
          setImage(null)
        }
      })
    })
  }

  return {
    image,
    aspect,
    handler,
    crop
  }
}
