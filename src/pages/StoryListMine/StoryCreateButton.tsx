import { message } from 'antd'
import useStoryCreate from 'hooks/useStoryCreate'
import { cloneElement, ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'

type StoryCreateButtonProps = { children: ReactElement}
export default function StoryCreateButton ({ children }: StoryCreateButtonProps) {
  const creator = useStoryCreate()
  const navigate = useNavigate()

  const handleCreate = () => {
    creator.mutate({ title: 'Untitled Story' }, {
      onSuccess: data => {
        const storyId = data.data?.id
        navigate(`/stories/${storyId}/edit`)
      },
      onError: (err) => {
        message.error(err.message)
      }
    })
  }

  return cloneElement(children, { onClick: handleCreate, loading: creator.isLoading })
}
