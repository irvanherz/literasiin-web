import { message } from 'antd'
import { cloneElement, ReactElement } from 'react'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import PublicationsService from 'services/Publications'

type PublicationCreateButtonProps = {
  children: ReactElement
}
export default function PublicationCreateButton ({ children }: PublicationCreateButtonProps) {
  const navigate = useNavigate()
  const creator = useMutation((payload: any) => PublicationsService.create(payload))
  const handleClick = () => {
    creator.mutate({ title: 'Untitled' }, {
      onSuccess: (data) => {
        const pubId = data.data?.id
        navigate(`/publications/${pubId}/edit`)
      },
      onError: (err: any) => {
        message.error(err?.message)
      }
    })
  }
  return cloneElement(children, { onClick: handleClick, loading: creator.isLoading })
}
