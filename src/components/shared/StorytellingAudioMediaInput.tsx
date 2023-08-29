import { CustomerServiceOutlined } from '@ant-design/icons'
import { Avatar, Button, Card, Modal, Space } from 'antd'
import AudioMediaPickerInput from 'components/AudioMediaPicker/AudioMediaPickerInput'
import useCustomComponent from 'hooks/useCustomComponent'
import { formatAudioDuration } from 'libs/common'
import { AudioMedia } from 'models/Media'
import { useState } from 'react'

type EmptyMediaCardProps = {
  onClick: any
}
function EmptyMediaCard ({ onClick }:EmptyMediaCardProps) {
  return (
    <Space direction='vertical' style={{ width: '100%', textAlign: 'center' }}>
      <Card size='small'>
        <Card.Meta
          title="No media selected"
          description="Please select media or upload media by clicking button below"
        />
      </Card>
      <Button onClick={onClick} style={{ width: '100%' }}>Click here to Select File</Button>
    </Space>

  )
}

type SelectedMediaCardProps = {
  media: any
  onClick: any
}
function SelectedMediaCard ({ media, onClick }:SelectedMediaCardProps) {
  const med = new AudioMedia(media)
  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      <Card size='small'>
        <Card.Meta
          avatar={<Avatar icon={<CustomerServiceOutlined />} size={48} shape='square' />}
          title={media?.name}
          description={formatAudioDuration(med.duration!)}
        />
      </Card>
      <Button onClick={onClick} style={{ width: '100%' }}>Click here to Change File</Button>
    </Space>
  )
}

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
      <Space direction='vertical' style={{ width: '100%' }}>
        {computedValue
          ? <SelectedMediaCard media={computedValue} onClick={handleChange} />
          : <EmptyMediaCard onClick={handleChange} />
        }
      </Space>
      <Modal
        width={768}
        centered
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
