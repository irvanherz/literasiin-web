import { Form, message, Modal } from 'antd'
import UserAddressForm from 'components/shared/UserAddressForm'
import useUserAddressCreate from 'hooks/useUserAddressCreate'
import { cloneElement, ReactElement, useState } from 'react'

type AddressCreateButtonProps = {
  children: ReactElement
  afterCreated?: () => void
  onClick?: () => void
}

export default function AddressCreateButton ({ onClick, children, afterCreated }: AddressCreateButtonProps) {
  const [form] = Form.useForm()

  const creator = useUserAddressCreate()

  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    onClick?.()
    setOpen(true)
  }

  const handleClose = () => setOpen(false)

  const handleFinish = async (values: any) => {
    try {
      values.location = values.location.join(',')
      await creator.mutateAsync(values)
      afterCreated?.()
      handleClose()
    } catch (err: any) {
      message.error(err?.message || 'Something went wrong')
    }
  }

  return (
    <>
      {children && cloneElement(children, { onClick: handleOpen })}
      <Modal
        centered
        title="Add an address"
        okText="Submit"
        open={open}
        onOk={form.submit}
        onCancel={handleClose}
      >
        <Form
          form={form}
          wrapperCol={{ span: 24 }} labelCol={{ span: 24 }}
          onFinish={handleFinish}
        >
          <UserAddressForm />
        </Form>
      </Modal>
    </>
  )
}
