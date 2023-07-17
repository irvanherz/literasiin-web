import { Card, InputNumber, Space, Switch, Typography } from 'antd'
import useCustomComponent from 'hooks/useCustomComponent'

type PriceInputProps = {
  value?: any
  defaultValue?: any
  onChange?: (v: any) => void
}
export default function PriceInput ({ value, defaultValue, onChange }:PriceInputProps) {
  const [computedValue, triggerChange] = useCustomComponent({ value, defaultValue, onChange })

  const isActive = !!(+computedValue)
  return (
    <Card type="inner" size="small">
      <Space direction='vertical' size='large' style={{ width: '100%' }}>
        <Space>
          <Typography.Text>Aktifkan monetisasi?</Typography.Text>
          <Switch checked={isActive} onChange={e => triggerChange(e ? 1 : 0)} />
        </Space>
        {(+computedValue > 0) && (
          <Space direction='vertical' style={{ width: '100%' }}>
            <Typography.Text>Masukkan harga</Typography.Text>
            <InputNumber min={1} placeholder='Input price...' addonAfter="COINS" value={computedValue} onChange={triggerChange} />
          </Space>
        )}
      </Space>
    </Card>
  )
}
