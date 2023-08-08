import { Form, message, Modal } from 'antd'
import StorytellingEpisodeForm from 'components/shared/StorytellingEpisodeForm'
import useStorytellingEpisodeCreate from 'hooks/useStorytellingEpisodeCreate'
import { cloneElement, ReactElement, useState } from 'react'

type AddStorytellingEpisodeButtonProps = {
  storytelling: any
  afterCreated?: () => void
  children: ReactElement
}

export default function AddStorytellingEpisodeButton ({ storytelling, children, afterCreated }: AddStorytellingEpisodeButtonProps) {
  const [open, setOpen] = useState(false)
  const [form] = Form.useForm()
  const creator = useStorytellingEpisodeCreate()

  const handleOpen = () => setOpen(true)
  const handleCancel = () => setOpen(false)

  const handleFinish = async (values: any) => {
    try {
      await creator.mutateAsync({ storytellingId: storytelling.id, ...values })
      afterCreated?.()
      setOpen(false)
    } catch (err: any) {
      message.error(err?.message || 'Something went wrong')
    }
  }

  const handleFinishFailed = () => {
    message.error('Check all fields and then try again')
  }

  return (
    <>
      {!!children && cloneElement(children, { onClick: handleOpen })}
      <Modal
        title="Create new Episode"
        centered
        open={open}
        onCancel={handleCancel}
        onOk={form.submit}
        confirmLoading={creator.isLoading}
        afterClose={form.resetFields}
      >
        <Form
          form={form}
          labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}
          onFinish={handleFinish}
          onFinishFailed={handleFinishFailed}
        >
          <StorytellingEpisodeForm />
        </Form>
      </Modal>
    </>
  )
}
