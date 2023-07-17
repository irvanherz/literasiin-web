import { Alert, message, Modal, Space } from 'antd'
import UserIdInput from 'components/shared/UserIdInput'
import { cloneElement, ReactElement, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useMutation } from 'react-query'
import StoriesService from 'services/Stories'

type InviteWriterButtonProps = { children: ReactElement, story: any, afterCreated?: () => void }
export default function InviteWriterButton ({ children, story, afterCreated }: InviteWriterButtonProps) {
  const storyId = story?.id
  const [userId, setUserId] = useState(0)
  const [open, setOpen] = useState(false)
  const creator = useMutation(() => StoriesService.Writers.create({ storyId, userId }))

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleInvite = () => {
    creator.mutate(undefined, {
      onSuccess: (data) => {
        handleClose()
        afterCreated && afterCreated()
      },
      onError: (err: any) => {
        message.error(err?.message)
      }
    })
  }

  return (
    <>
      {cloneElement(children, { onClick: handleOpen })}
      <Modal
        open={open}
        title={<FormattedMessage defaultMessage="Invite Writer" />}
        centered
        onCancel={handleClose}
        closable={false}
        onOk={handleInvite}
        confirmLoading={creator.isLoading}
        okButtonProps={{ disabled: !userId }}
      >
        <Space direction='vertical' style={{ width: '100%' }}>
          <Alert
            message={<FormattedMessage defaultMessage="Invite your friend to join your story writing project" />}
          />
          <UserIdInput
            value={userId}
            onChange={setUserId}
          />
        </Space>

      </Modal>
    </>
  )
}
