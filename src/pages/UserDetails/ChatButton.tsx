import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import { message } from 'antd'
import useCurrentUser from 'hooks/useCurrentUser'
import qs from 'qs'
import { useMutation } from 'react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import ChatsService from 'services/Chats'

type ChatButtonProps = {
  user: any
}
export default function ChatButton ({ user }: ChatButtonProps) {
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
  return <button className='btn btn-xs' onClick={handleChat} disabled={mutator.isLoading}><PaperAirplaneIcon className='w-4' /> Kirim Pesan</button>
}
