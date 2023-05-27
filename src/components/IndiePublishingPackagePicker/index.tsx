import { Card, List, Space, theme, Typography } from 'antd'
import useCustomComponent from 'hooks/useCustomComponent'

type IndiePublishingPackagePickerProps = {
  config: any
  value?: any
  onChange?: (value: any) => void
}

export default function IndiePublishingPackagePicker ({ value, onChange, config }: IndiePublishingPackagePickerProps) {
  const [computedValue, triggerValueChange] = useCustomComponent({ value, onChange })
  const { token } = theme.useToken()

  const indiePublishingPackages: any[] = config?.indiePublishingPackages || []

  return (
    <Space>
      {indiePublishingPackages.map((pkg: any) => (
        <Card
          key={pkg.id}
          style={computedValue === pkg.id ? { borderColor: token.colorPrimaryBorder } : undefined}
          hoverable
          onClick={() => triggerValueChange(pkg.id)}
          type='inner'
          actions={computedValue === pkg.id ? [<span key='select'>Terpilih</span>] : [<span key='select'>Pilih</span>]}
        >
          <Typography.Title style={{ lineHeight: 1, padding: 0, margin: 0 }} level={3}>{pkg.price}</Typography.Title>
          <List
            header={pkg.name}
            dataSource={pkg.features as any[]}
            renderItem={feature => (
              <List.Item>{feature}</List.Item>
            )}
          />
        </Card>
      ))}
    </Space>
  )
}
