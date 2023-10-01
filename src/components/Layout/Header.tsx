import { BellIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid'
import useAuthContext from 'hooks/useAuthContext'
import { ReactNode } from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import ProfileMenu from './ProfileMenu'

function UserMenu() {
  const auth = useAuthContext()
  return auth.status === 'authenticated'
    ? (
      <div className='space-x-2 flex items-center'>
        <Link to="/notifications" className='flex'>
          <button className='btn btn-sm btn-circle'><BellIcon className='w-4' /></button>
        </Link>
        <Link to="/chats" className='flex'>
          <button className='btn btn-sm btn-circle'><ChatBubbleLeftRightIcon className='w-4' /></button>
        </Link>
        <ProfileMenu />
      </div>
      )
    : (
      <Link to="/auth/signin">
        <button className='btn btn-sm'>
          <FormattedMessage defaultMessage="Sign in" />
        </button>
      </Link>
      )
}

type HeaderProps = {
  searchComponent?: ReactNode;
  showUserMenu?: boolean;
};

export default function Header({
  searchComponent,
  showUserMenu = true
}: HeaderProps) {
  return (
    <div className='h-16 sticky top-0 border-b py-2 backdrop-blur-sm bg-base-100/90 flex z-10'>
      <div className="container m-auto flex items-center">
        <Link to="/">
          <img
            className="w-8"
            src={`${process.env.PUBLIC_URL}/assets/images/logo.svg`}
          />
        </Link>
        <div className="flex-1">{searchComponent}</div>
        <div className="flex-none">{showUserMenu && <UserMenu />}</div>
      </div>
    </div>
  )
}
