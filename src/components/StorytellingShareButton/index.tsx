import { Modal } from 'antd'
import StorytellingShareSegment from 'components/StorytellingShareSegment'
import { cloneElement, ReactElement, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'

const StyledModal = styled(Modal)`
.ant-modal-title {
  text-align: center;
  padding-bottom: 16px;
}
`

type StorytellingShareButtonProps = {
  storytelling: any
  children: ReactElement
}

export default function StorytellingShareButton ({ storytelling, children }: StorytellingShareButtonProps) {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
    <>
      {cloneElement(children, { onClick: handleOpen })}
      <StyledModal
        open={open}
        title={<FormattedMessage defaultMessage='Share This Storytelling'/>}
        centered
        footer={null}
        onCancel={handleClose}
        closable={false}
      >
        <StorytellingShareSegment storytelling={storytelling} />
      </StyledModal>
    </>
  )
}
