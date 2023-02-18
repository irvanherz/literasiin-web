import { UserOutlined } from '@ant-design/icons'
import { Button, Dropdown, List, MenuProps, Space } from 'antd'
import StoryCover from 'components/StoryCover'
import { DEFAULT_IMAGE } from 'libs/variables'
import moment from 'moment-timezone'
import { Link } from 'react-router-dom'

const items: MenuProps['items'] = [
  {
    label: '1st menu item',
    key: '1',
    icon: <UserOutlined />
  },
  {
    label: '2nd menu item',
    key: '2',
    icon: <UserOutlined />
  },
  {
    label: '3rd menu item',
    key: '3',
    icon: <UserOutlined />,
    danger: true
  },
  {
    label: '4rd menu item',
    key: '4',
    icon: <UserOutlined />,
    danger: true,
    disabled: true
  }
]

type StoryListItemProps = {
  story: any
}

export default function StoryListItem ({ story }: StoryListItemProps) {
  const lastUpdateTime = moment(story.updatedAt).format('LLLL')

  return (
    <List.Item
      extra={
        <div>
          <Space>
            <Dropdown.Button menu={{ items }}>Continue Writing</Dropdown.Button>
            <Button>Share</Button>
          </Space>

        </div>
      }
    >
      <List.Item.Meta
        avatar={<StoryCover src={DEFAULT_IMAGE} />}
        title={<Link to={`/stories/${story.id}/edit`}>{story.title}</Link>}
        description={
          <Space direction='vertical'>
            <div>{story.description}</div>
            <div>Diperbarui <b>{lastUpdateTime}</b></div>
            <Space>
              <div>Views</div>
              <div>Rating</div>
              <div>Comments</div>
            </Space>
          </Space>
        }
      />
    </List.Item>
  )
}
