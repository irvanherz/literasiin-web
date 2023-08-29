import { Button, Card, Input, Space, Typography } from 'antd'
import { useState } from 'react'

type StepBriefProps = {
  data: any
  onPrev: () => void
  onNext: (data: any) => void
}
export default function StepBrief ({ data, onPrev, onNext }: StepBriefProps) {
  const [brief, setBrief] = useState(data?.brief || '')

  const handleNext = () => {
    onNext({ ...data, brief })
  }

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Card>
        <Typography.Text strong>Deskripsikan Cerita</Typography.Text>
        <Typography.Paragraph>Robot akan membuatkan judul cerita, deskripsi, beserta outlinenya.</Typography.Paragraph>
        <Input.TextArea
          value={brief}
          onChange={e => setBrief(e.target.value)}
          placeholder='Cerita tentang patah hati dengan latar tempat di Jakarta...'
        />
      </Card>
      <Space>
        <Button>Back</Button>
        <Button onClick={handleNext}>Next</Button>
      </Space>
    </Space>

  )
}
