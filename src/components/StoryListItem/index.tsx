import { CheckOutlined, DeleteFilled, EditFilled, EllipsisOutlined, EyeFilled, FileDoneOutlined, FileOutlined, MoreOutlined, ShareAltOutlined } from '@ant-design/icons'
import { Button, Descriptions, Dropdown, List, MenuProps, Modal, Space, Tag, Typography, message } from 'antd'
import StoryCover from 'components/StoryCover'
import StoryShareButton from 'components/StoryShareButton'
import RenderTimeFromNow from 'components/shared/RenderTimeFromNow'
import { slugifyContentId } from 'libs/slug'
import { FormattedMessage, useIntl } from 'react-intl'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import StoriesService from 'services/Stories'
import styled from 'styled-components'
import ContinueWritingButton from './ContinueWritingButton'

type StoryMetaProps = { story: any }
function StoryMeta ({ story }: StoryMetaProps) {
  return (
    <Descriptions colon={false} layout="vertical" size='small' column={{ xs: 2, sm: 4, md: 4, lg: 4, xl: 4, xxl: 4 }}>
      <Descriptions.Item label={<FormattedMessage defaultMessage='Category' />}>{story?.category?.name || <i><FormattedMessage defaultMessage='Uncategorized' /></i>}</Descriptions.Item>
      <Descriptions.Item label={<FormattedMessage defaultMessage='Reads' />}>{story?.meta?.numViews || 0}</Descriptions.Item>
      <Descriptions.Item label={<FormattedMessage defaultMessage='Votes' />}>{story?.meta?.numVotes || 0}</Descriptions.Item>
      <Descriptions.Item label={<FormattedMessage defaultMessage='Last updated' />}><RenderTimeFromNow timestamp={story?.updatedAt} /></Descriptions.Item>
    </Descriptions>
  )
}

const StyledListItem = styled(List.Item)`
@media only screen and (max-width: 500px) {
  flex-direction: column;
  .ant-list-item-meta {
    width: 100%;
  }
  .list-item-actions {
    padding-top: 16px;
  }
}
.ant-list-item-meta-avatar {
  place-self: start;
}
.ant-list-item-meta-title {
  margin-top: 0;
}
`

type StoryListItemProps = {
  story: any
  afterDeleted?: () => void
  afterUpdated?: () => void
}

export default function StoryListItem ({ story, afterUpdated, afterDeleted }: StoryListItemProps) {
  const intl = useIntl()
  const storyId = story.id
  const navigate = useNavigate()
  const updater = useMutation((payload: any) => StoriesService.updateById(storyId, payload))
  const remover = useMutation(() => StoriesService.deleteById(storyId))

  const handleView = () => navigate(`/stories/${slugifyContentId(story)}`)
  const handleEdit = () => navigate(`/stories/${slugifyContentId(story)}/edit`)
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
    if (story?.hasCompleted) {
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
      { key: 'view', icon: <EyeFilled />, label: intl.formatMessage({ defaultMessage: 'View' }), onClick: handleView },
      { key: 'edit', icon: <EditFilled />, label: intl.formatMessage({ defaultMessage: 'Edit' }), onClick: handleEdit },
      story.status === 'draft'
        ? { key: 'publish', icon: <FileDoneOutlined />, label: intl.formatMessage({ defaultMessage: 'Publish' }), onClick: handleToggleStatus }
        : { key: 'draft', icon: <FileOutlined />, label: intl.formatMessage({ defaultMessage: 'Revert to Draft' }), onClick: handleToggleStatus },
      story?.hasCompleted
        ? { key: 'mark-uncumpleted', icon: <EllipsisOutlined />, label: intl.formatMessage({ defaultMessage: 'Mark as Uncompleted' }), onClick: handleToggleHasCompleted }
        : { key: 'mark-completed', icon: <CheckOutlined />, label: intl.formatMessage({ defaultMessage: 'Mark as Completed' }), onClick: handleToggleHasCompleted },
      { key: 'edit', icon: <DeleteFilled />, label: intl.formatMessage({ defaultMessage: 'Delete' }), onClick: handleDelete }
    ]
  }

  return (
    <StyledListItem
      extra={
        <div className='list-item-actions'>
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
            <StoryCover story={story} style={{ borderRadius: 8, overflow: 'hidden' }}/>
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
          <Space direction='vertical' style={{ width: '100%' }}>
            <div>{<Typography.Paragraph ellipsis={{ rows: 2 }}>{story.description || <i>No description</i>}</Typography.Paragraph>}</div>
            <div>
              <StoryMeta story={story} />
            </div>
          </Space>
        }
      />
    </StyledListItem>
  )
}
