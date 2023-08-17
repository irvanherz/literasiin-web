import { message } from 'antd'
import useArticleCreate from 'hooks/useArticleCreate'
import { slugifyContentId } from 'libs/slug'
import { cloneElement, ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'

type CreateArticleButtonProps = { children: ReactElement}
export default function CreateArticleButton ({ children }: CreateArticleButtonProps) {
  const creator = useArticleCreate()
  const navigate = useNavigate()

  const handleCreate = () => {
    creator.mutate({ title: 'Untitled Article' }, {
      onSuccess: data => {
        navigate(`/articles/${slugifyContentId(data.data)}/edit`)
      },
      onError: (err) => {
        message.error(err.message)
      }
    })
  }

  return cloneElement(children, { onClick: handleCreate, loading: creator.isLoading })
}
