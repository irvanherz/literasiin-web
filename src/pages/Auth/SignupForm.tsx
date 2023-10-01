/* eslint-disable prefer-promise-reject-errors */
import { InformationCircleIcon } from '@heroicons/react/24/solid'
import classNames from 'classnames'
import UsernameInput from 'components/shared/UsernameInput'
import { Controller, useFormContext } from 'react-hook-form'

export default function SignupForm () {
  const { register, watch, control, formState: { errors } } = useFormContext()

  return (
    <form>
      <div className="mb-2">
        <label className="block text-gray-700 font-semibold mb-2">Email</label>
        <div className='mb-1'>
          <input
            type='text'
            className={classNames('input input-sm input-bordered w-full font-bold shadow-sm', errors.email && 'input-error')}
            placeholder="Masukkan email..."
            {...register('email', { required: { value: true, message: 'Email tidak boleh kosong' } })}
          />
        </div>
        <div className='font-semibold min-h-[8px]'>
          {errors.email && <p className='text-error flex items-center gap-1'><InformationCircleIcon className='w-4 inline'/> <span>{errors.email.message?.toString()}</span></p>}
        </div>
      </div>
      <div className="mb-2">
        <label className="block text-gray-700 font-semibold mb-2">Username</label>
        <div className='mb-1'>
          <Controller
            control={control}
            name="username"
            rules={{ required: { value: true, message: 'Username tidak boleh kosong' } }}
            render={({
              field: { onChange, onBlur, value, name, ref },
              fieldState: { invalid, isTouched, isDirty, error },
              formState
            }) => (
              <UsernameInput
                className={classNames('input input-sm input-bordered w-full font-bold shadow-sm', errors.username && 'input-error')}
                placeholder="Masukkan username..."
                maxLength={255}
                onBlur={onBlur} // notify when input is touched
                onChange={onChange}
                value={value}
              />
            )}
          />
        </div>
        <div className='font-semibold min-h-[8px]'>
          {errors.username && <p className='text-error flex items-center gap-1'><InformationCircleIcon className='w-4 inline'/> <span>{errors.username.message?.toString()}</span></p>}
        </div>
      </div>
      <div className="mb-2">
        <label className="block text-gray-700 font-semibold mb-2">Nama lengkap</label>
        <div className='mb-1'>
          <input
            type='text'
            className={classNames('input input-sm input-bordered w-full font-bold shadow-sm', errors.fullName && 'input-error')}
            placeholder="Masukkan nama lengkap..."
            {...register('fullName', { required: { value: true, message: 'Nama lengkap tidak boleh kosong' } })}
          />
        </div>
        <div className='font-semibold min-h-[8px]'>
          {errors.fullName && <p className='text-error flex items-center gap-1'><InformationCircleIcon className='w-4 inline'/> <span>{errors.fullName.message?.toString()}</span></p>}
        </div>
      </div>
      <div className="mb-2">
        <label className="block text-gray-700 font-semibold mb-2">Kata sandi</label>
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
      <div className="mb-2">
        <label className="block text-gray-700 font-semibold mb-2">Konfirmasi kata sandi</label>
        <div className='mb-1'>
          <input
            type='password'
            className={classNames('input input-sm input-bordered w-full font-bold shadow-sm', errors.passwordConfirmation && 'input-error')}
            placeholder="Masukkan kembali kata sandi..."
            {...register('passwordConfirmation', { required: { value: true, message: 'Konfirmasi kata sandi kamu' }, validate: (val: string) => watch('password') === val ? true : 'Kata sandi tidak sama' })}
          />
        </div>
        <div className='font-semibold min-h-[8px]'>
          {errors.passwordConfirmation && <p className='text-error flex items-center gap-1'><InformationCircleIcon className='w-4 inline'/> <span>{errors.passwordConfirmation.message?.toString()}</span></p>}
        </div>
      </div>
    </form>
  )
}
