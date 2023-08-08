import { message, Modal } from 'antd'
import useStorytellingEpisodeDelete from 'hooks/useStorytellingEpisodeDelete'
import { cloneElement, ReactElement } from 'react'

type DeleteStorytellingEpisodeButtonProps = {
  storytelling: any
  episode: any
  afterDeleted?: () => void
  children: ReactElement
}

export default function DeleteStorytellingEpisodeButton ({ storytelling, episode, children, afterDeleted }: DeleteStorytellingEpisodeButtonProps) {
  const deleter = useStorytellingEpisodeDelete(episode.id)

  const handleDelete = () => {
    Modal.confirm({
      title: 'Confirm',
      content: 'Are you sure you want to delete this storytelling?',
      centered: true,
      onOk: async () => {
        try {
          await deleter.mutateAsync(undefined)
          if (afterDeleted) afterDeleted()
        } catch (err: any) {
          message.error(err?.message)
        }
      }
    })
  }

  return (
    <>
      {!!children && cloneElement(children, { onClick: handleDelete, loading: deleter.isLoading })}
    </>
  )
}
