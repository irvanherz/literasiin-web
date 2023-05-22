import { Card, Space, theme, Typography } from 'antd'
import useCustomComponent from 'hooks/useCustomComponent'

type IndiePublishingPackagePickerProps = {
  value?: any
  onChange?: (value: any) => void
}

const PACKAGES = [
  {
    id: 'silver',
    name: 'Silver Package'
  },
  {
    id: 'gold',
    name: 'Gold Package'
  },
  {
    id: 'platinum',
    name: 'Platinum Package'
  }
]
export default function IndiePublishingPackagePicker ({ value, onChange }: IndiePublishingPackagePickerProps) {
  const [computedValue, triggerValueChange] = useCustomComponent({ value, onChange })
  const { token } = theme.useToken()

  return (
    <Space>
      {PACKAGES.map((pkg: any) => (
        <Card
          key={pkg.id}
          style={computedValue === pkg.id ? { borderColor: token.colorPrimaryBorder } : undefined}
          hoverable
          onClick={() => triggerValueChange(pkg.id)}
          type='inner'
        >
          <Typography.Title style={{ lineHeight: 1, padding: 0, margin: 0 }} level={3}>{pkg.name}</Typography.Title>
        </Card>
      ))}
    </Space>
  )
}
