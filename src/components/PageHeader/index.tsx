import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import classNames from 'classnames'
import { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

type PageHeaderProps = {
  title: ReactNode
  description?: ReactNode
  extra?: ReactNode
  className?: string
}
export default function PageHeader({ title, description, extra, className }:PageHeaderProps) {
  const navigate = useNavigate()

  const handleBack = () => navigate(-1)

  return (
    <div className={classNames('bg-white border-b', className)}>
      <div className="container py-2 flex items-center gap-4">
        <div className='flex-1 flex items-start relative'>
          <div className='flex-none md:absolute md:left-0 transform md:-translate-x-full pr-2'>
            <button className='btn btn-ghost btn-sm btn-circle' onClick={handleBack}><ArrowLeftIcon className='w-4' /></button>
          </div>
          <div className='flex-1'>
            <div className='font-black text-lg md:text-lg'>{title}</div>
            <p className='line-clamp-1'>{description}</p>
          </div>
        </div>
        <div className='flex-none'>
          {extra}
        </div>
      </div>
    </div>
  )
}
