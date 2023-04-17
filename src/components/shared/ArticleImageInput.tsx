import { Button, Modal, Space } from 'antd'
import ArticleImage from 'components/ArticleImage'
import MediaPickerInput from 'components/MediaPicker/MediaPickerInput'
import useCustomComponent from 'hooks/useCustomComponent'
import { DEFAULT_IMAGE } from 'libs/variables'
import { useState } from 'react'

type ArticleImageInputProps = {
  value?: any
  defaultValue?: any
  onChange?: (v: any) => void
}

export default function ArticleImageInput ({ value, defaultValue, onChange }: ArticleImageInputProps) {
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
        <ArticleImage src={md?.url || DEFAULT_IMAGE} />
        <Button size='small' onClick={handleChange}>Change</Button>
      </Space>
      <Modal
        open={open}
        onCancel={handleClose}
        okText="Select"
        onOk={handleConfirmSelect}
      >
        <MediaPickerInput
          preset='article-image'
          cropProps={{ aspect: 2 }}
          filters={{ type: 'image', tag: 'article-image' }}
          value={selected}
          onChange={setSelected}
        />
      </Modal>
    </>

  )
}
