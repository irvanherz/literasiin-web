import { message } from 'antd'
import useStorytellingCreate from 'hooks/useStorytellingCreate'
import { slugifyContentId } from 'libs/slug'
import { cloneElement, ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'

type StorytellingCreateButtonProps = { children: ReactElement}
export default function StorytellingCreateButton ({ children }: StorytellingCreateButtonProps) {
  const creator = useStorytellingCreate()
  const navigate = useNavigate()

  const handleCreate = () => {
    creator.mutate({ title: 'Untitled Storytelling' }, {
      onSuccess: data => {
        const storytelling = data.data
        navigate(`/storytellings/${slugifyContentId(storytelling)}/edit`)
      },
      onError: (err) => {
        message.error(err.message)
      }
    })
  }

  return cloneElement(children, { onClick: handleCreate, loading: creator.isLoading })
}
