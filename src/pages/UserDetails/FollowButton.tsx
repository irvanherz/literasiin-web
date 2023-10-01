import { UserMinusIcon, UserPlusIcon } from '@heroicons/react/24/solid'
import { message } from 'antd'
import useCurrentUser from 'hooks/useCurrentUser'
import qs from 'qs'
import { useMutation } from 'react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import UsersService from 'services/Users'

type FollowButtonProps = {
  user: any
  context: any
  afterUpdated?: () => void
}
export default function FollowButton ({ user, context, afterUpdated }: FollowButtonProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const currentUser = useCurrentUser()
  const follower = useMutation(() => UsersService.followById(user?.id))
  const unfollower = useMutation(() => UsersService.unfollowById(user?.id))
  const executor = context?.hasFollowing ? unfollower : follower

  const handleToggleFollow = () => {
    if (!currentUser) navigate('/auth/signin' + qs.stringify({ redirect: location.pathname }, { addQueryPrefix: true }))
    executor.mutate(undefined, {
      onSuccess: () => {
        afterUpdated && afterUpdated()
      },
      onError: (err:any) => {
        message.error(err?.message)
      }
    })
  }

  if (user?.id === currentUser?.id) return null

  return (
    <button
      className='btn btn-xs btn-primary'
      onClick={handleToggleFollow}
      disabled={follower.isLoading}
    >
      {context?.hasFollowing ? <UserMinusIcon className='w-4' /> : <UserPlusIcon className='w-4' />}
      {context?.hasFollowing ? 'Berhenti Ikuti' : 'Mengikuti'}
    </button>
  )
}
