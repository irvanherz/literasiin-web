import { message } from 'antd'
import { cloneElement, ReactElement } from 'react'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import StoriesService from 'services/Stories'

type CreateChapterButtonProps = {
  story: any
  children: ReactElement
}
export default function CreateChapterButton ({ children, story }: CreateChapterButtonProps) {
  const storyId = story?.id
  const navigate = useNavigate()
  const creator = useMutation(() => StoriesService.Chapters.create({ storyId, title: 'Untitled Chapter' }))

  const handleCreate = () => {
    creator.mutate(undefined, {
      onSuccess: (data) => {
        const chapterId = data.data?.id
        navigate(`/stories/chapters/${chapterId}/edit`)
      },
      onError: (err: any) => {
        message.error(err?.message)
      }
    })
  }

  return cloneElement(children, { onClick: handleCreate, loading: creator.isLoading })
}
