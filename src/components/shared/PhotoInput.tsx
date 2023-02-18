import { Avatar, Button, Modal, Space } from 'antd'
import MediaPickerInput from 'components/MediaPicker/MediaPickerInput'
import useCustomComponent from 'hooks/useCustomComponent'
import { DEFAULT_PHOTO } from 'libs/variables'
import { useState } from 'react'

type PhotoInputProps = {
  value?: any
  defaultValue?: any
  onChange?: (v: any) => void
}

export default function PhotoInput ({ value, defaultValue, onChange }: PhotoInputProps) {
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
      <Space direction='vertical'>
        <Avatar src={md?.url || DEFAULT_PHOTO} size={128}/>
        <Button size='small' onClick={handleChange}>Change</Button>
      </Space>

      <Modal
        open={open}
        onCancel={handleClose}
        okText="Select"
        onOk={handleConfirmSelect}
      >
        <MediaPickerInput
          preset='photo'
          cropProps={{ aspect: 1 }}
          filters={{ type: 'image', tag: 'photo' }}
          value={selected}
          onChange={setSelected}
        />
      </Modal>
    </>

  )
}
