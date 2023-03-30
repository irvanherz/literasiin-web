import { MessageOutlined } from '@ant-design/icons'
import { Button, message } from 'antd'
import useCurrentUser from 'hooks/useCurrentUser'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import ChatsService from 'services/Chats'

type ChatButtonProps = {
  user: any
}
export default function ChatButton ({ user }: ChatButtonProps) {
  const navigate = useNavigate()
  const currentUser = useCurrentUser()
  const mutator = useMutation(() => ChatsService.createRoomWith(user?.id))

  const handleChat = () => {
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
  return <Button size='small' onClick={handleChat} loading={mutator.isLoading} icon={<MessageOutlined />}>Chat</Button>
}
