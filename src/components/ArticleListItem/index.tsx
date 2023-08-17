import { DeleteFilled, EditFilled, EyeFilled, FileDoneOutlined, FileOutlined, MoreOutlined, ShareAltOutlined } from '@ant-design/icons'
import { Avatar, Button, Descriptions, Dropdown, List, MenuProps, Modal, Space, Tag, Typography, message } from 'antd'
import ArticleShareButton from 'components/ArticleShareButton'
import RenderTimeFromNow from 'components/shared/RenderTimeFromNow'
import { slugifyContentId } from 'libs/slug'
import { DEFAULT_IMAGE } from 'libs/variables'
import Media from 'models/Media'
import { FormattedMessage } from 'react-intl'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import ArticlesService from 'services/Articles'
import styled from 'styled-components'

type ArticleMetaProps = { article: any }
function ArticleMeta ({ article }: ArticleMetaProps) {
  return (
    <Descriptions layout="vertical" colon={false} size='small' column={{ xs: 3, sm: 5, md: 5, lg: 5, xl: 5, xxl: 5 }}>
      <Descriptions.Item label={<FormattedMessage defaultMessage='Category' />}>{article?.category?.name || <i><FormattedMessage defaultMessage='Uncategorized' /></i>}</Descriptions.Item>
      <Descriptions.Item label={<FormattedMessage defaultMessage='Reads' />}>{article?.meta?.numViews || 0}</Descriptions.Item>
      <Descriptions.Item label={<FormattedMessage defaultMessage='Upvotes' />}>{article?.meta?.numUpvotes || 0}</Descriptions.Item>
      <Descriptions.Item label={<FormattedMessage defaultMessage='Bookmarks' />}>{article?.meta?.numBookmarks || 0}</Descriptions.Item>
      <Descriptions.Item label={<FormattedMessage defaultMessage='Last updated' />}><RenderTimeFromNow timestamp={article?.updatedAt} /></Descriptions.Item>
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
type ArticleListItemProps = {
  article: any
  afterDeleted?: () => void
  afterUpdated?: () => void
}

export default function ArticleListItem ({ article, afterUpdated, afterDeleted }: ArticleListItemProps) {
  const articleId = article.id
  const navigate = useNavigate()
  const updater = useMutation((payload: any) => ArticlesService.updateById(articleId, payload))
  const remover = useMutation(() => ArticlesService.deleteById(articleId))

  const handleView = () => navigate(`/articles/${slugifyContentId(article)}`)
  const handleEdit = () => navigate(`/articles/${slugifyContentId(article)}/edit`)
  const handleDelete = () => {
    Modal.confirm({
      title: 'Confirm',
      content: 'Are you sure you want to delete this article?',
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
    if (article.status === 'draft') {
      updater.mutate({ status: 'published' }, {
        onSuccess: () => {
          message.success('Article published')
          afterUpdated && afterUpdated()
        },
        onError: (err: any) => {
          message.error(err?.message)
        }
      })
    } else {
      updater.mutate({ status: 'draft' }, {
        onSuccess: () => {
          message.success('Article reverted to draft')
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
      { key: 'view', icon: <EyeFilled />, label: <FormattedMessage defaultMessage='View' />, onClick: handleView },
      { key: 'edit', icon: <EditFilled />, label: <FormattedMessage defaultMessage='Edit' />, onClick: handleEdit },
      article.status === 'draft'
        ? { key: 'publish', icon: <FileDoneOutlined />, label: <FormattedMessage defaultMessage='Publish' />, onClick: handleToggleStatus }
        : { key: 'draft', icon: <FileOutlined />, label: <FormattedMessage defaultMessage='Revert to Draft' />, onClick: handleToggleStatus },
      { key: 'edit', icon: <DeleteFilled />, label: <FormattedMessage defaultMessage='Delete' />, onClick: handleDelete }
    ]
  }

  const image = article?.image ? new Media(article.image) : null

  return (
    <StyledListItem
      extra={
        <div className='list-item-actions'>
          <Space>
            <Button shape='circle' icon={<EditFilled />} onClick={handleEdit} />
            <ArticleShareButton article={article}>
              <Button shape='circle' icon={<ShareAltOutlined />} />
            </ArticleShareButton>
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
        avatar={<Avatar shape='square' size={64} src={image?.md?.url || DEFAULT_IMAGE} />}
        title={
          <Space>
            <span>{article.title}</span>
            {article?.status === 'draft' && (<Tag color='red'><FormattedMessage defaultMessage='DRAFT'/></Tag>)}
          </Space>
        }
        description={
          <Space direction='vertical' style={{ width: '100%' }}>
            <div>{<Typography.Paragraph ellipsis={{ rows: 2 }}>{article.description || <i><FormattedMessage defaultMessage='No description'/></i>}</Typography.Paragraph>}</div>
            <div>
              <ArticleMeta article={article} />
            </div>
          </Space>
        }
      />
    </StyledListItem>
  )
}
