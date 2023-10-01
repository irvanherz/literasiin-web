/* eslint-disable no-unreachable */
import { InformationCircleIcon } from '@heroicons/react/24/solid'
import { Col, Form, Input, Row } from 'antd'
import classNames from 'classnames'
import { useFormContext } from 'react-hook-form'

export default function ContactForm () {
  const { register, formState: { errors } } = useFormContext()
  return (
    <form>
      <div className='flex gap-4'>
        <div className="mb-2 flex-1">
          <label className="block text-gray-700 text-sm font-bold mb-1">Nama depan</label>
          <div className='mb-1'>
            <input
              type='text'
              className={classNames('input input-sm input-bordered w-full font-bold shadow-sm', errors.firstName && 'input-error')}
              placeholder="Nama depan"
              {...register('firstName', { required: { value: true, message: 'Nama depan harus diisi' } })}
          />
          </div>
          <div className='font-semibold'>
            {errors.firstName && <p className='text-error'><InformationCircleIcon className='w-4 inline'/> <span>{errors.firstName.message?.toString()}</span></p>}
          </div>
        </div>
        <div className="mb-2 flex-1">
          <label className="block text-gray-700 text-sm font-bold mb-1">Nama belakang</label>
          <div className='mb-1'>
            <input
              type='text'
              className={classNames('input input-sm input-bordered w-full font-bold shadow-sm', errors.lastName && 'input-error')}
              placeholder="Nama belakang"
              {...register('lastName', { required: { value: true, message: 'Nama belakang harus diisi' } })}
          />
          </div>
          <div className='font-semibold'>
            {errors.lastName && <p className='text-error'><InformationCircleIcon className='w-4 inline'/> <span>{errors.lastName.message?.toString()}</span></p>}
          </div>
        </div>
      </div>
      <div className='flex gap-4'>
        <div className="mb-2 flex-1">
          <label className="block text-gray-700 text-sm font-bold mb-1">Email</label>
          <div className='mb-1'>
            <input
              type='text'
              className={classNames('input input-sm input-bordered w-full font-bold shadow-sm', errors.email && 'input-error')}
              placeholder="Email"
              {...register('email', { required: { value: true, message: 'Email harus diisi' } })}
          />
          </div>
          <div className='font-semibold'>
            {errors.email && <p className='text-error'><InformationCircleIcon className='w-4 inline'/> <span>{errors.email.message?.toString()}</span></p>}
          </div>
        </div>
        <div className="mb-2 flex-1">
          <label className="block text-gray-700 text-sm font-bold mb-1">Telepon <span className='text-slate-500'>(opsional)</span></label>
          <div className='mb-1'>
            <input
              type='text'
              className={classNames('input input-sm input-bordered w-full font-bold shadow-sm', errors.phone && 'input-error')}
              placeholder="Telepon"
              {...register('phone', { required: false })}
          />
          </div>
          <div className='font-semibold'>
            {errors.phone && <p className='text-error'><InformationCircleIcon className='w-4 inline'/> <span>{errors.phone.message?.toString()}</span></p>}
          </div>
        </div>
      </div>
      <div className="mb-2">
        <label className="block text-gray-700 text-sm font-bold mb-1">Message</label>
        <div className='mb-1'>
          <textarea
            rows={3}
            className={classNames('input input-sm input-bordered w-full font-bold shadow-sm min-h-[100px] leading-normal py-2', errors.message && 'input-error')}
            placeholder="Tulis pesan kamu..."
            {...register('message', { required: { value: true, message: 'Pesan harus diisi' }, minLength: { value: 50, message: 'Pesan terlalu pendek (minimum 50 karakter)' } })}
          />
        </div>
        <div className='font-semibold'>
          {errors.message && <p className='text-error'><InformationCircleIcon className='w-4 inline'/> <span>{errors.message.message?.toString()}</span></p>}
        </div>
      </div>
    </form>
  )
  return (
    <Form.Provider>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            name='firstName'
            label="First Name"
            rules={[{ required: true, message: 'First name is required!' }]}
          >
            <Input placeholder="Your first name..."/>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name='lastName'
            label="Last Name"
            rules={[{ required: true, message: 'Last name is required!' }]}
            >
            <Input placeholder="Your last name..."/>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name='email'
            label="Email"
            rules={[{ required: true, message: 'Email is required!' }]}
          >
            <Input placeholder="Your email..."/>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name='phone'
            label="Phone"
            >
            <Input placeholder="Your phone..."/>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            name='message'
            label="Message"
            rules={[{ required: true, message: 'Message is required!' }]}
          >
            <Input.TextArea placeholder="Message..."/>
          </Form.Item>
        </Col>
      </Row>
    </Form.Provider>
  )
}
