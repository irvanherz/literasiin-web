import { MessageOutlined } from '@ant-design/icons'
import { Button, message } from 'antd'
import useCurrentUser from 'hooks/useCurrentUser'
import qs from 'qs'
import { useIntl } from 'react-intl'
import { useMutation } from 'react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import ChatsService from 'services/Chats'

type ChatButtonProps = {
  user: any
}
export default function ChatButton ({ user }: ChatButtonProps) {
  const intl = useIntl()
  const navigate = useNavigate()
  const location = useLocation()
  const currentUser = useCurrentUser()
  const mutator = useMutation(() => ChatsService.createRoomWith(user?.id))

  const handleChat = () => {
    if (!currentUser) navigate('/auth/signin' + qs.stringify({ redirect: location.pathname }, { addQueryPrefix: true }))
    mutator.mutate(undefined, {
      onSuccess: (data) => {
        const roomId = data.data.id
        navigate(`/chats/${roomId}`)
      },
      onError: (err:any) => {
        message.error(err?.message)
      }
    })
  }

  if (user?.id === currentUser?.id) return null
  return <Button size='small' onClick={handleChat} loading={mutator.isLoading} icon={<MessageOutlined />}>{intl.formatMessage({ defaultMessage: 'Chat' })}</Button>
}
