import { TagOutlined } from '@ant-design/icons'
import { Card, Space, Tag, Typography } from 'antd'
import dayjs from 'dayjs'

type SummaryProps = {
  story: any
}

export default function Summary ({ story }:SummaryProps) {
  return (
    <Card
      title="About this story"
      actions={[
        <div key='a'>
          <div>Category</div>
          <div style={{ fontWeight: 900 }}>{story?.category?.name || 'Uncategorized'}</div>
        </div>,
        <div key='b'>
          <div>Last Update</div>
          <div style={{ fontWeight: 900 }}>{dayjs(story?.createdAt).fromNow()}</div>
        </div>
      ]}
    >
      <Space direction='vertical' style={{ maxWidth: '100%' }}>
        <Typography.Paragraph>{story?.description}</Typography.Paragraph>
        <div>
          {(story?.tags || []).map((tag: any) => <Tag icon={<TagOutlined />} key={tag.name}>{tag.name}</Tag>)}
        </div>
      </Space>

    </Card>
  )
}
