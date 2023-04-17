import { TagOutlined } from '@ant-design/icons'
import { Card, Space, Tag, Typography } from 'antd'
import RenderTimeFromNow from 'components/shared/RenderTimeFromNow'
import { FormattedMessage } from 'react-intl'

type SummaryProps = {
  story: any
}

export default function Summary ({ story }:SummaryProps) {
  return (
    <Card
      title="About this story"
      actions={[
        <div key='a'>
          <div><FormattedMessage defaultMessage='Category' /></div>
          <div style={{ fontWeight: 900 }}>{story?.category?.name || 'Uncategorized'}</div>
        </div>,
        <div key='b'>
          <div><FormattedMessage defaultMessage='Last updated' /></div>
          <div style={{ fontWeight: 900 }}><RenderTimeFromNow timestamp={story?.createdAt} /></div>
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
