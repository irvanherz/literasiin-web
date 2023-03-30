import { Modal } from 'antd'
import StoryShareSegment from 'components/StoryShareSegment'
import { cloneElement, ReactElement, useState } from 'react'
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
      <StyledModal
        open={open}
        title="Share This Story"
        centered
        footer={null}
        onCancel={handleClose}
        closable={false}
      >
        <StoryShareSegment story={story} />
      </StyledModal>
    </>
  )
}
