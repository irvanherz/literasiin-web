import { message } from 'antd'
import useArticleCreate from 'hooks/useArticleCreate'
import { cloneElement, ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'

type CreateArticleButtonProps = { children: ReactElement}
export default function CreateArticleButton ({ children }: CreateArticleButtonProps) {
  const creator = useArticleCreate()
  const navigate = useNavigate()

  const handleCreate = () => {
    creator.mutate({ title: 'Untitled Article' }, {
      onSuccess: data => {
        const articleId = data.data?.id
        navigate(`/articles/${articleId}/edit`)
      },
      onError: (err) => {
        message.error(err.message)
      }
    })
  }

  return cloneElement(children, { onClick: handleCreate, loading: creator.isLoading })
}
