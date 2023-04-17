import { UserAddOutlined, UserDeleteOutlined } from '@ant-design/icons'
import { Button, message } from 'antd'
import useCurrentUser from 'hooks/useCurrentUser'
import qs from 'qs'
import { useIntl } from 'react-intl'
import { useMutation } from 'react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import UsersService from 'services/Users'

type FollowButtonProps = {
  user: any
  context: any
  afterUpdated?: () => void
}
export default function FollowButton ({ user, context, afterUpdated }: FollowButtonProps) {
  const intl = useIntl()
  const navigate = useNavigate()
  const location = useLocation()
  const currentUser = useCurrentUser()
  const follower = useMutation(() => UsersService.followById(user?.id))
  const unfollower = useMutation(() => UsersService.unfollowById(user?.id))

  const handleFollow = () => {
    if (!currentUser) navigate('/auth/signin' + qs.stringify({ redirect: location.pathname }, { addQueryPrefix: true }))
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
    return <Button size='small' onClick={handleUnfollow} loading={unfollower.isLoading} icon={<UserDeleteOutlined />}>{intl.formatMessage({ defaultMessage: 'Unfollow' })}</Button>
  } else {
    return <Button size='small' onClick={handleFollow} loading={follower.isLoading} icon={<UserAddOutlined />}>{intl.formatMessage({ defaultMessage: 'Follow' })}</Button>
  }
}
