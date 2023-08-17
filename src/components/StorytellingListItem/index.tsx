import { CheckOutlined, DeleteFilled, EditFilled, EllipsisOutlined, EyeFilled, FileDoneOutlined, FileOutlined, MoreOutlined, ShareAltOutlined } from '@ant-design/icons'
import { Button, Descriptions, Dropdown, List, MenuProps, message, Modal, Space, Tag, Typography } from 'antd'
import RenderTimeFromNow from 'components/shared/RenderTimeFromNow'
import StorytellingCover from 'components/StorytellingCover'
import StorytellingShareButton from 'components/StorytellingShareButton'
import { slugifyContentId } from 'libs/slug'
import { FormattedMessage, useIntl } from 'react-intl'
import { useMutation } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'
import StorytellingsService from 'services/Storytellings'
import styled from 'styled-components'

type StorytellingMetaProps = { storytelling: any }
function StorytellingMeta ({ storytelling }: StorytellingMetaProps) {
  return (
    <Descriptions colon={false} layout="vertical" size='small' column={{ xs: 3, sm: 3, md: 5, lg: 5, xl: 5, xxl: 5 }}>
      <Descriptions.Item label={<FormattedMessage defaultMessage='Episodes' />}>{storytelling?.meta?.numEpisodes ? `${storytelling?.meta?.numPublishedEpisodes || 0} of ${storytelling?.meta?.numEpisodes || 0} published` : storytelling?.meta?.numEpisodes || 0 }</Descriptions.Item>
      <Descriptions.Item label={<FormattedMessage defaultMessage='Category' />}>{storytelling?.category?.name || <i><FormattedMessage defaultMessage='Uncategorized' /></i>}</Descriptions.Item>
      <Descriptions.Item label={<FormattedMessage defaultMessage='Reads' />}>{storytelling?.meta?.numViews || 0}</Descriptions.Item>
      <Descriptions.Item label={<FormattedMessage defaultMessage='Votes' />}>{storytelling?.meta?.numVotes || 0}</Descriptions.Item>
      <Descriptions.Item label={<FormattedMessage defaultMessage='Last updated' />}><RenderTimeFromNow timestamp={storytelling?.updatedAt} /></Descriptions.Item>
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

type StorytellingListItemProps = {
  storytelling: any
  afterDeleted?: () => void
  afterUpdated?: () => void
}

export default function StorytellingListItem ({ storytelling, afterUpdated, afterDeleted }: StorytellingListItemProps) {
  const intl = useIntl()
  const storytellingId = storytelling.id
  const navigate = useNavigate()
  const updater = useMutation((payload: any) => StorytellingsService.updateById(storytellingId, payload))
  const remover = useMutation(() => StorytellingsService.deleteById(storytellingId))

  const handleView = () => navigate(`/storytellings/${slugifyContentId(storytelling)}`)
  const handleEdit = () => navigate(`/storytellings/${slugifyContentId(storytelling)}/edit`)
  const handleDelete = () => {
    Modal.confirm({
      title: 'Confirm',
      content: 'Are you sure you want to delete this storytelling?',
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
    if (storytelling.status === 'draft') {
      updater.mutate({ status: 'published' }, {
        onSuccess: () => {
          message.success('Storytelling published')
          afterUpdated && afterUpdated()
        },
        onError: (err: any) => {
          message.error(err?.message)
        }
      })
    } else {
      updater.mutate({ status: 'draft' }, {
        onSuccess: () => {
          message.success('Storytelling reverted to draft')
          afterUpdated && afterUpdated()
        },
        onError: (err: any) => {
          message.error(err?.message)
        }
      })
    }
  }

  const handleToggleHasCompleted = () => {
    if (storytelling?.hasCompleted) {
      updater.mutate({ hasCompleted: false }, {
        onSuccess: () => {
          message.success('Storytelling marked as uncompleted')
          afterUpdated && afterUpdated()
        },
        onError: (err: any) => {
          message.error(err?.message)
        }
      })
    } else {
      updater.mutate({ hasCompleted: true }, {
        onSuccess: () => {
          message.success('Storytelling marked as completed')
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
      storytelling.status === 'draft'
        ? { key: 'publish', icon: <FileDoneOutlined />, label: intl.formatMessage({ defaultMessage: 'Publish' }), onClick: handleToggleStatus }
        : { key: 'draft', icon: <FileOutlined />, label: intl.formatMessage({ defaultMessage: 'Revert to Draft' }), onClick: handleToggleStatus },
      storytelling?.hasCompleted
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
            <Link to={`/storytellings/${slugifyContentId(storytelling)}/edit`}>
              <Button shape='circle' icon={<EditFilled />} />
            </Link>
            <StorytellingShareButton storytelling={storytelling}>
              <Button shape='circle' icon={<ShareAltOutlined />} />
            </StorytellingShareButton>
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
            <StorytellingCover storytelling={storytelling} style={{ borderRadius: 8, overflow: 'hidden' }}/>
          </div>
        }
        title={
          <Space>
            <span>{storytelling.title}</span>
            {storytelling?.status === 'draft' && (<Tag color='red'>DRAFT</Tag>)}
            {storytelling?.hasCompleted && (<Tag color='green'>COMPLETED</Tag>)}
          </Space>
        }
        description={
          <Space direction='vertical' style={{ width: '100%' }}>
            <div>{<Typography.Paragraph ellipsis={{ rows: 2 }}>{storytelling.description || <i>No description</i>}</Typography.Paragraph>}</div>
            <div>
              <StorytellingMeta storytelling={storytelling} />
            </div>
          </Space>
        }
      />
    </StyledListItem>
  )
}
