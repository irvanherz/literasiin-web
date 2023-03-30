import { CheckOutlined, DeleteFilled, EditFilled, EllipsisOutlined, EyeFilled, FileDoneOutlined, FileOutlined, MoreOutlined, ShareAltOutlined } from '@ant-design/icons'
import { Button, Dropdown, List, MenuProps, message, Modal, Space, Tag, Typography } from 'antd'
import StoryCover from 'components/StoryCover'
import StoryShareButton from 'components/StoryShareButton'
import dayjs from 'dayjs'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import StoriesService from 'services/Stories'
import ContinueWritingButton from './ContinueWritingButton'

type StoryListItemProps = {
  story: any
  afterDeleted?: () => void
  afterUpdated?: () => void
}

export default function StoryListItem ({ story, afterUpdated, afterDeleted }: StoryListItemProps) {
  const storyId = story.id
  const navigate = useNavigate()
  const updater = useMutation((payload: any) => StoriesService.updateById(storyId, payload))
  const remover = useMutation(() => StoriesService.deleteById(storyId))

  const handleView = () => navigate(`/stories/${storyId}`)
  const handleEdit = () => navigate(`/stories/${storyId}/edit`)
  const handleDelete = () => {
    Modal.confirm({
      title: 'Confirm',
      content: 'Are you sure you want to delete this story?',
      centered: true,
      onOk: async () => {
        try {
          await remover.mutateAsync()
          if (afterDeleted) afterDeleted()
        } catch (err: any) {
          message.error(err?.message)
        }
      }
    })
  }

  const handleToggleStatus = () => {
    if (story.status === 'draft') {
      updater.mutate({ status: 'published' }, {
        onSuccess: () => {
          message.success('Story published')
          afterUpdated && afterUpdated()
        },
        onError: (err: any) => {
          message.error(err?.message)
        }
      })
    } else {
      updater.mutate({ status: 'draft' }, {
        onSuccess: () => {
          message.success('Story reverted to draft')
          afterUpdated && afterUpdated()
        },
        onError: (err: any) => {
          message.error(err?.message)
        }
      })
    }
  }

  const handleToggleHasCompleted = () => {
    if (story.hasCompleted) {
      updater.mutate({ hasCompleted: false }, {
        onSuccess: () => {
          message.success('Story marked as uncompleted')
          afterUpdated && afterUpdated()
        },
        onError: (err: any) => {
          message.error(err?.message)
        }
      })
    } else {
      updater.mutate({ hasCompleted: true }, {
        onSuccess: () => {
          message.success('Story marked as completed')
          afterUpdated && afterUpdated()
        },
        onError: (err: any) => {
          message.error(err?.message)
        }
      })
    }
  }
  const menu: MenuProps = {
    items: [
      { key: 'view', icon: <EyeFilled />, label: 'View', onClick: handleView },
      { key: 'edit', icon: <EditFilled />, label: 'Edit', onClick: handleEdit },
      story.status === 'draft'
        ? { key: 'publish', icon: <FileDoneOutlined />, label: 'Publish', onClick: handleToggleStatus }
        : { key: 'draft', icon: <FileOutlined />, label: 'Revert to Draft', onClick: handleToggleStatus },
      { key: 'edit', icon: <DeleteFilled />, label: 'Delete', onClick: handleDelete },
      story.hasCompleted
        ? { key: 'mark-uncumpleted', icon: <EllipsisOutlined />, label: 'Mark as Uncompleted', onClick: handleToggleHasCompleted }
        : { key: 'mark-completed', icon: <CheckOutlined />, label: 'Mark as Completed', onClick: handleToggleHasCompleted },
      { key: 'edit', icon: <DeleteFilled />, label: 'Delete', onClick: handleDelete }
    ]
  }

  return (
    <List.Item
      extra={
        <div>
          <Space>
            <ContinueWritingButton story={story}>
              <Button shape='circle' icon={<EditFilled />} />
            </ContinueWritingButton>
            <StoryShareButton story={story}>
              <Button shape='circle' icon={<ShareAltOutlined />} />
            </StoryShareButton>
            <Dropdown
              menu={menu}
            >
              <Button shape='circle' icon={<MoreOutlined />} />
            </Dropdown>
          </Space>

        </div>
      }
    >
      <List.Item.Meta
        style={{ alignItems: 'center' }}
        avatar={
          <div style={{ minWidth: 72 }}>
            <StoryCover story={story} />
          </div>
        }
        title={
          <Space>
            <span>{story.title}</span>
            {story?.status === 'draft' && (<Tag color='red'>DRAFT</Tag>)}
            {story?.hasCompleted && (<Tag color='green'>COMPLETED</Tag>)}
          </Space>
        }
        description={
          <Space direction='vertical'>
            <div>{<Typography.Paragraph ellipsis={{ rows: 2 }}>{story.description}</Typography.Paragraph>}</div>
            <div>Last updated {dayjs(story?.updatedAt).fromNow()}</div>
          </Space>
        }
      />
    </List.Item>
  )
}
