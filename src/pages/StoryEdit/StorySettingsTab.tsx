import { Form, InputNumber } from 'antd'
import { useIntl } from 'react-intl'

type StorySettingsTabProps = { story: any }

export default function StorySettingsTab ({ story }: StorySettingsTabProps) {
  const intl = useIntl()
  return (
    <Form>
      <Form.Item
        label={intl.formatMessage({ defaultMessage: 'Price' })}
        name='price'
      >
        <InputNumber addonAfter="Coins" />
      </Form.Item>
    </Form>
  )
}
