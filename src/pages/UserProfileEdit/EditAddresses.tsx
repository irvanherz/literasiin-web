import { DeleteFilled } from '@ant-design/icons'
import { Button, List, message, Modal, Space } from 'antd'
import useUserAddressDelete from 'hooks/useUserAddressDelete'
import useUserAddresses from 'hooks/useUserAddresses'

type AddressItemProps = {
  address: any
  afterDeleted?: () => void
}

function AddressItem ({ address, afterDeleted }:AddressItemProps) {
  const deleter = useUserAddressDelete(address.id)
  const handleDelete = () => {
    Modal.confirm({
      centered: true,
      title: 'Confirm',
      content: 'Are you sure you want to delete this address?',
      onOk: async () => {
        try {
          await deleter.mutateAsync()
          if (afterDeleted) afterDeleted()
        } catch (err: any) {
          message.error(err?.message)
        }
      }
    })
  }
  return (
    <List.Item
      extra={
        <Space>
          {/* <Button icon={<EditFilled />} shape='circle' /> */}
          <Button danger icon={<DeleteFilled />} onClick={handleDelete}>Delete</Button>
        </Space>
      }
    >
      <List.Item.Meta
        title={address.address}
        description={address.type}
      />
    </List.Item>
  )
}

export default function EditAddresses () {
  const { data, refetch } = useUserAddresses({})
  const addresses = data?.data || []

  return (
    <List
      dataSource={addresses}
      renderItem={(address: any) => <AddressItem address={address} afterDeleted={refetch} />}
    />
  )
}
