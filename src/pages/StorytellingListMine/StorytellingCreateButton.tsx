import { message } from 'antd'
import useStorytellingCreate from 'hooks/useStorytellingCreate'
import { cloneElement, ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'

type StorytellingCreateButtonProps = { children: ReactElement}
export default function StorytellingCreateButton ({ children }: StorytellingCreateButtonProps) {
  const creator = useStorytellingCreate()
  const navigate = useNavigate()

  const handleCreate = () => {
    creator.mutate({ title: 'Untitled Storytelling' }, {
      onSuccess: data => {
        const storytellingId = data.data?.id
        navigate(`/storytellings/${storytellingId}/edit`)
      },
      onError: (err) => {
        message.error(err.message)
      }
    })
  }

  return cloneElement(children, { onClick: handleCreate, loading: creator.isLoading })
}
