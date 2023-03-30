import { Form, InputNumber } from 'antd'

type StorySettingsTabProps = { story: any }

export default function StorySettingsTab ({ story }: StorySettingsTabProps) {
  return (
    <Form>
      <Form.Item
        label='Price'
        name='price'
      >
        <InputNumber addonAfter="Coins" />
      </Form.Item>
    </Form>
  )
}
