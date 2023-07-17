import { PlayCircleFilled } from '@ant-design/icons'
import { Avatar, Button, List } from 'antd'

export default function PopularStorytellers () {
  return (
    <List
      bordered
      dataSource={[1, 1, 1, 1, 1, 1]}
      renderItem={i => (
        <List.Item extra={<Button type="primary" shape="circle" icon={<PlayCircleFilled />} />}>
          <List.Item.Meta
            avatar={<Avatar size='default' shape='square'/>}
            title="Judul"
            description="Blah blah blas"
          />
        </List.Item>
      )}
    />
  )
}
