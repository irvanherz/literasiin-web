/* eslint-disable no-unused-vars */
import { Modal } from 'antd'
import classNames from 'classnames'
import ProfileShareSegment from 'components/ProfileShareSegment'
import { cloneElement, ReactElement, useState } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'

const StyledModal = styled(Modal)`
.ant-modal-title {
  text-align: center;
  padding-bottom: 16px;
}
`

type ProfileShareButtonProps = {
  user: any
  children: ReactElement
}

export default function ProfileShareButton ({ user, children }: ProfileShareButtonProps) {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      {cloneElement(children, { onClick: handleOpen })}
      {createPortal(
        <dialog className={classNames('modal', open && 'modal-open')}>
          <form method="dialog" className="modal-box max-w-[400px]">
            <ProfileShareSegment user={user} />
          </form>
          <form method="dialog" className="modal-backdrop">
            <button onClick={handleClose}>close</button>
          </form>
        </dialog>,
        document.body
      )}
    </>
  )
}
