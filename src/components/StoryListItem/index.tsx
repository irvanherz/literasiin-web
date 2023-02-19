import { Button, List, Space, Tag } from 'antd'
import StoryCover from 'components/StoryCover'
import dayjs from 'dayjs'
import { DEFAULT_IMAGE } from 'libs/variables'
import ContinueWritingButton from './ContinueWritingButton'

type StoryListItemProps = {
  story: any
}

export default function StoryListItem ({ story }: StoryListItemProps) {
  return (
    <List.Item
      extra={
        <div>
          <Space>
            <ContinueWritingButton story={story}>
              <Button>Continue Writing</Button>
            </ContinueWritingButton>
            <Button>Share</Button>
          </Space>

        </div>
      }
    >
      <List.Item.Meta
        style={{ alignItems: 'center' }}
        avatar={
          <div style={{ minWidth: 72 }}>
            <StoryCover src={DEFAULT_IMAGE} />
          </div>
        }
        title={
          <Space>
            <span>{story.title}</span>
            {story?.status === 'draft' && (<Tag>Draft</Tag>)}
          </Space>
        }
        description={
          <Space direction='vertical'>
            <div>{story.description}</div>
            <div>Last updated {dayjs(story?.updatedAt).fromNow()}</div>
          </Space>
        }
      />
    </List.Item>
  )
}
