import { Button, Modal, Space } from 'antd'
import MediaPickerInput from 'components/MediaPicker/MediaPickerInput'
import StorytellingCover from 'components/StorytellingCover'
import useCustomComponent from 'hooks/useCustomComponent'
import { DEFAULT_IMAGE } from 'libs/variables'
import { useState } from 'react'

type StorytellingCoverInputProps = {
  value?: any
  defaultValue?: any
  onChange?: (v: any) => void
}

export default function StorytellingCoverInput ({ value, defaultValue, onChange }: StorytellingCoverInputProps) {
  const [open, setOpen] = useState(false)
  const [computedValue, triggerValueChange] = useCustomComponent({ value, defaultValue, onChange })
  const md = computedValue?.meta?.objects?.find((object: any) => object.id === 'md')

  const [selected, setSelected] = useState(computedValue)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleChange = () => {
    handleOpen()
  }

  const handleConfirmSelect = () => {
    triggerValueChange(selected)
    handleClose()
  }

  return (
    <>
      <Space direction='vertical' style={{ width: '100%', textAlign: 'center' }}>
        <StorytellingCover src={md?.url || DEFAULT_IMAGE} style={{ borderRadius: 8 }} />
        <Button style={{ width: '100%' }} onClick={handleChange}>Change</Button>
      </Space>

      <Modal
        open={open}
        onCancel={handleClose}
        okText="Select"
        onOk={handleConfirmSelect}
      >
        <MediaPickerInput
          preset='storytelling-cover'
          cropProps={{ aspect: 1 }}
          filters={{ type: 'image', tag: 'storytelling-cover' }}
          value={selected}
          onChange={setSelected}
        />
      </Modal>
    </>

  )
}
