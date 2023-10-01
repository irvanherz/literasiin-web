import { PlusIcon } from '@heroicons/react/24/solid'
import ImagePicker from 'components/ImagePicker'
import useCustomComponent from 'hooks/useCustomComponent'
import { DEFAULT_PHOTO } from 'libs/variables'
import Media from 'models/Media'

type ImageInputProps = {
  value?: any
  defaultValue?: any
  onChange?: (val: any) => void
}
export default function ImageInput({ value, defaultValue, onChange }: ImageInputProps) {
  const [computedValue, triggerChange] = useCustomComponent({ value, defaultValue, onChange })
  const image = new Media(computedValue)
  return (
    <div className="shadow-md rounded-lg overflow-hidden">
      {computedValue && (
        <div className="aspect-w-2 aspect-h-3">
          <img src={image.md?.url || DEFAULT_PHOTO} className='object-cover' />
          <div className='opacity-0 bg-black hover:bg-opacity-50 hover:opacity-100 flex items-center justify-center space-x-2'>
            <ImagePicker imageType='story-cover' onSelected={triggerChange}>
              <button type='button' className='btn btn-sm btn-primary'>Ubah</button>
            </ImagePicker>
            <button type='button' className='btn btn-sm btn-error' onClick={() => triggerChange(null)}>Hapus</button>
          </div>
        </div>
      )}
      {!computedValue && (
        <ImagePicker imageType='story-cover' onSelected={triggerChange}>
          <button type='button' className="block w-full aspect-w-2 aspect-h-3 rounded-lg border-2 border-dashed border-slate-400 text-slate-400 bg-white">
            <div className='text-center flex flex-col justify-center'>
              <div><PlusIcon className="w-6 inline-block" /></div>
              <div className="font-black text-lg">Pilih Gambar</div>
            </div>
          </button>
        </ImagePicker>
      )}
    </div>
  )
}
