import { Card, Modal, Space } from 'antd'
import AudioMediaPickerInput from 'components/AudioMediaPicker/AudioMediaPickerInput'
import useCustomComponent from 'hooks/useCustomComponent'
import { useState } from 'react'

type StorytellingAudioMediaInputProps = {
  value?: any
  defaultValue?: any
  onChange?: (v: any) => void
}

export default function StorytellingAudioMediaInput ({ value, defaultValue, onChange }: StorytellingAudioMediaInputProps) {
  const [open, setOpen] = useState(false)
  const [computedValue, triggerValueChange] = useCustomComponent({ value, defaultValue, onChange })

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
        {computedValue
          ? (
            <Card size='small' hoverable onClick={handleChange}>
              <Card.Meta
                title={computedValue?.name}
                description="Desc"
              />
            </Card>
            )
          : (
            <Card size='small' hoverable onClick={handleChange}>
              <Card.Meta
                title="No media selected"
                description="Click here to select or upload your media"
              />
            </Card>
            )
        }
      </Space>

      <Modal
        open={open}
        onCancel={handleClose}
        okText="Select"
        onOk={handleConfirmSelect}
      >
        <AudioMediaPickerInput
          filters={{ type: 'audio', tag: 'storytelling-audio' }}
          value={selected}
          onChange={setSelected}
        />
      </Modal>
    </>

  )
}
