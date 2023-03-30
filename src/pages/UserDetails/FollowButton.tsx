import { UserAddOutlined, UserDeleteOutlined } from '@ant-design/icons'
import { Button, message } from 'antd'
import useCurrentUser from 'hooks/useCurrentUser'
import { useMutation } from 'react-query'
import UsersService from 'services/Users'

type FollowButtonProps = {
  user: any
  context: any
  afterUpdated?: () => void
}
export default function FollowButton ({ user, context, afterUpdated }: FollowButtonProps) {
  const currentUser = useCurrentUser()
  const follower = useMutation(() => UsersService.followById(user?.id))
  const unfollower = useMutation(() => UsersService.unfollowById(user?.id))

  const handleFollow = () => {
    follower.mutate(undefined, {
      onSuccess: () => {
        afterUpdated && afterUpdated()
      },
      onError: (err:any) => {
        message.error(err?.message)
      }
    })
  }

  const handleUnfollow = () => {
    unfollower.mutate(undefined, {
      onSuccess: () => {
        afterUpdated && afterUpdated()
      },
      onError: (err:any) => {
        message.error(err?.message)
      }
    })
  }
  if (user?.id === currentUser?.id) return null
  if (context?.hasFollowing) {
    return <Button size='small' onClick={handleUnfollow} loading={unfollower.isLoading} icon={<UserDeleteOutlined />}>Unfollow</Button>
  } else {
    return <Button size='small' onClick={handleFollow} loading={follower.isLoading} icon={<UserAddOutlined />}>Follow</Button>
  }
}
