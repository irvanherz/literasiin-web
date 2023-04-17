import { Button, Modal, Space } from 'antd'
import MediaPickerInput from 'components/MediaPicker/MediaPickerInput'
import StoryCover from 'components/StoryCover'
import useCustomComponent from 'hooks/useCustomComponent'
import { DEFAULT_IMAGE } from 'libs/variables'
import { useState } from 'react'

type StoryCoverInputProps = {
  value?: any
  defaultValue?: any
  onChange?: (v: any) => void
}

export default function StoryCoverInput ({ value, defaultValue, onChange }: StoryCoverInputProps) {
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
        <StoryCover src={md?.url || DEFAULT_IMAGE} />
        <Button size='small' onClick={handleChange}>Change</Button>
      </Space>

      <Modal
        open={open}
        onCancel={handleClose}
        okText="Select"
        onOk={handleConfirmSelect}
      >
        <MediaPickerInput
          preset='story-cover'
          cropProps={{ aspect: 1 / 1.5 }}
          filters={{ type: 'image', tag: 'story-cover' }}
          value={selected}
          onChange={setSelected}
        />
      </Modal>
    </>

  )
}
