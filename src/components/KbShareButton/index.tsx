import { Modal } from 'antd'
import KbShareSegment from 'components/KbShareSegment'
import { cloneElement, ReactElement, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'

const StyledModal = styled(Modal)`
.ant-modal-title {
  text-align: center;
  padding-bottom: 16px;
}
`

type KbShareButtonProps = {
  kb: any
  children: ReactElement
}

export default function KbShareButton ({ kb, children }: KbShareButtonProps) {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
    <>
      {cloneElement(children, { onClick: handleOpen })}
      <StyledModal
        open={open}
        title={<FormattedMessage defaultMessage='Share This Help'/>}
        centered
        footer={null}
        onCancel={handleClose}
        closable={false}
      >
        <KbShareSegment kb={kb} />
      </StyledModal>
    </>
  )
}
