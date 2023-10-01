/* eslint-disable no-unused-vars */
import { Modal } from 'antd'
import classNames from 'classnames'
import StoryShareSegment from 'components/StoryShareSegment'
import { cloneElement, ReactElement, useState } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'

const StyledModal = styled(Modal)`
.ant-modal-title {
  text-align: center;
  padding-bottom: 16px;
}
`

type StoryShareButtonProps = {
  story: any
  children: ReactElement
}

export default function StoryShareButton ({ story, children }: StoryShareButtonProps) {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      {cloneElement(children, { onClick: handleOpen })}
      {createPortal(
        <dialog className={classNames('modal', open && 'modal-open')}>
          <form method="dialog" className="modal-box max-w-[400px]">
            <StoryShareSegment story={story} />
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
