import { Button, List, Modal } from 'antd'
import useCustomComponent from 'hooks/useCustomComponent'
import usePublicationAvailableCouriers from 'hooks/usePublicationAvailableCouriers'
import { useState } from 'react'

type ShippingMethodInputProps = {
  publication: any
  value?: any
  defaultValue?: any
  onChange?: (v: any) => void
}

const formatter = new Intl.NumberFormat('id-ID')

export default function ShippingMethodInput ({ publication, value, defaultValue, onChange }: ShippingMethodInputProps) {
  const [open, setOpen] = useState(false)
  const [computedValue, triggerValueChange] = useCustomComponent({ value, defaultValue, onChange })

  const { data } = usePublicationAvailableCouriers(publication?.id)
  const couriers = data?.data || []

  const handleOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  const handleSelect = (shipping: any) => {
    triggerValueChange(shipping)
    handleClose()
  }

  return (
    <>
      {!computedValue && (
        <List bordered>
          <List.Item extra={<Button onClick={handleOpen}>Pilih Kurir</Button>}>
            <List.Item.Meta
              title="Pilih Ekspedisi"
              description="Pilih jasa ekspedisi yang akan digunakan untuk mengirimkan paket Anda"
            />
          </List.Item>
        </List>
      )}
      {computedValue && (
        <List bordered>
          <List.Item extra={<Button onClick={handleOpen}>Ganti Kurir</Button>}>
            <List.Item.Meta
              title={`${computedValue.courier_name} - ${computedValue.courier_service_name}`}
              description={formatter.format(computedValue.price)}
              />
          </List.Item>
        </List>
      )}
      <Modal
        centered
        open={open}
        title="Pilih Kurir"
        onCancel={handleClose}
        footer={null}
      >
        <List
          dataSource={couriers}
          renderItem={(shipping: any) => (
            <List.Item extra={<Button type='primary' onClick={() => handleSelect(shipping)}>Pilih</Button>}>
              <List.Item.Meta
                title={`${shipping.courier_name} - ${shipping.courier_service_name}`}
                description={formatter.format(shipping.price)}
              />
            </List.Item>
          )}
        />
      </Modal>
    </>
  )
}
