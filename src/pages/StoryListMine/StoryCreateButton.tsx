import { message } from 'antd'
import useStoryCreate from 'hooks/useStoryCreate'
import { slugifyContentId } from 'libs/slug'
import { cloneElement, ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'

type StoryCreateButtonProps = { children: ReactElement}
export default function StoryCreateButton ({ children }: StoryCreateButtonProps) {
  const creator = useStoryCreate()
  const navigate = useNavigate()

  const handleCreate = () => {
    creator.mutate({ title: 'Untitled Story' }, {
      onSuccess: data => {
        const story = data.data
        navigate(`/stories/${slugifyContentId(story)}/edit`)
      },
      onError: (err) => {
        message.error(err.message)
      }
    })
  }

  return cloneElement(children, { onClick: handleCreate, loading: creator.isLoading })
}
