/* eslint-disable no-unused-vars */
/* eslint-disable no-unreachable */
import { InformationCircleIcon } from '@heroicons/react/24/solid'
import classNames from 'classnames'
import { useFormContext } from 'react-hook-form'

export default function SigninForm () {
  const { register, formState: { errors } } = useFormContext()

  return (
    <form>
      <div className="mb-2">
        <label className="block text-gray-700 font-semibold mb-2">Username</label>
        <div className='mb-1'>
          <input
            type='text'
            className={classNames('input input-sm input-bordered w-full font-bold shadow-sm', errors.username && 'input-error')}
            placeholder="Masukkan username..."
            {...register('username', { required: { value: true, message: 'Username tidak boleh kosong' } })}
          />
        </div>
        <div className='font-semibold min-h-[8px]'>
          {errors.username && <p className='text-error flex items-center gap-1'><InformationCircleIcon className='w-4 inline'/> <span>{errors.username.message?.toString()}</span></p>}
        </div>
      </div>
      <div className="mb-2">
        <label className="block text-gray-700 font-semibold mb-2">Kata Sandi</label>
        <div className='mb-1'>
          <input
            type='password'
            className={classNames('input input-sm input-bordered w-full font-bold shadow-sm', errors.password && 'input-error')}
            placeholder="Masukkan kata sandi..."
            {...register('password', { required: { value: true, message: 'Kata sandi tidak boleh kosong' } })}
          />
        </div>
        <div className='font-semibold min-h-[8px]'>
          {errors.password && <p className='text-error flex items-center gap-1'><InformationCircleIcon className='w-4 inline'/> <span>{errors.password.message?.toString()}</span></p>}
        </div>
      </div>
    </form>
  )
}
