import { Input, message, Modal } from 'antd'
import useCurrentUser from 'hooks/useCurrentUser'
import { cloneElement, useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import UsersService from 'services/Users'

type BioEditButtonProps = {
  children: any,
  user: any
  afterUpdated?: () => void
}

export default function BioEditButton ({ children, user, afterUpdated }: BioEditButtonProps) {
  const currentUser = useCurrentUser()
  const userId = user?.id
  const updater = useMutation(`users[${userId}]`, (bio: string) => UsersService.updateById(userId, { bio }))
  const [open, setOpen] = useState(false)
  const [bio, setBio] = useState('')

  const canEdit = !!currentUser && currentUser?.id === user?.id

  useEffect(() => {
    setBio(user?.bio)
  }, [user])

  const handleUpdate = () => {
    updater.mutate(bio, {
      onSuccess: () => {
        if (afterUpdated) afterUpdated()
        handleClose()
      },
      onError: (err: any) => {
        message.error(err?.message)
      }
    })
  }

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return canEdit
    ? (
      <>
        {cloneElement(children, { onClick: handleOpen })}
        <Modal
          title="Edit Bio"
          centered
          open={open}
          onOk={handleUpdate}
          onCancel={handleClose}
          confirmLoading={updater.isLoading}
    >
          <Input
            value={bio}
            maxLength={255}
            onChange={e => setBio(e.target.value)}
            placeholder="Write something about you..."
            bordered={false}
        />
        </Modal>
      </>
      )
    : null
}
