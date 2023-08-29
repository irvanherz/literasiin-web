import { Form, message, Modal } from 'antd'
import StorytellingEpisodeForm from 'components/shared/StorytellingEpisodeForm'
import useStorytellingEpisodeUpdate from 'hooks/useStorytellingEpisodeUpdate'
import { cloneElement, ReactElement, useEffect, useMemo, useState } from 'react'

type EditStorytellingEpisodeButtonProps = {
  storytelling: any
  episode: any
  afterUpdated?: () => void
  children: ReactElement
}

export default function EditStorytellingEpisodeButton ({ storytelling, episode, children, afterUpdated }: EditStorytellingEpisodeButtonProps) {
  const [open, setOpen] = useState(false)
  const [form] = Form.useForm()
  const updater = useStorytellingEpisodeUpdate(episode?.id)

  const handleOpen = () => setOpen(true)
  const handleCancel = () => setOpen(false)

  const initialValues = useMemo(() => ({ ...episode }), [episode])

  useEffect(() => {
    form.resetFields()
  }, [episode, open])

  const handleFinish = async (values: any) => {
    const payload = { ...values }
    payload.mediaId = payload.media?.id
    if (payload.media) delete payload.media
    try {
      await updater.mutateAsync(payload)
      afterUpdated?.()
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
        title="Update Episode"
        centered
        open={open}
        onCancel={handleCancel}
        onOk={form.submit}
        confirmLoading={updater.isLoading}
        afterClose={form.resetFields}
      >
        <Form
          form={form}
          initialValues={initialValues}
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
