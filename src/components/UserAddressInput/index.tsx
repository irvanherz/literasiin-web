import { PlusOutlined } from '@ant-design/icons'
import { Button, Divider, Select, SelectProps } from 'antd'
import useCustomComponent from 'hooks/useCustomComponent'
import useUserAddresses from 'hooks/useUserAddresses'
import { useMemo, useState } from 'react'
import AddressCreateButton from './AddressCreateButton'

type UserAddressInputProps = SelectProps

export default function UserAddressInput ({ value, onChange, ...otherProps }:UserAddressInputProps) {
  const [open, setOpen] = useState(false)
  const [computedValue, triggerValueChange] = useCustomComponent({ value, onChange: onChange as any })
  const addressesQ = useUserAddresses({})
  const addresses = addressesQ?.data?.data || []
  const options = useMemo(() => {
    return addresses.map((addr: any) => {
      return {
        key: addr.id,
        value: addr.id,
        label: addr.address
      }
    })
  }, [addresses])

  return (
    <Select
      style={{ width: 300 }}
      open={open}
      onDropdownVisibleChange={setOpen}
      placeholder="Select address..."
      options={options}
      value={computedValue}
      onChange={triggerValueChange}
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider style={{ margin: '8px 0' }} />
          <AddressCreateButton onClick={() => setOpen(false)} afterCreated={addressesQ.refetch}>
            <Button type="text" icon={<PlusOutlined />} style={{ width: '100%', display: 'block' }}>Add new address</Button>
          </AddressCreateButton>
        </>
      )}
      {...otherProps}
      />

  )
};
