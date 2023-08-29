import { DeleteFilled, EditFilled, FileDoneOutlined, FileOutlined, MoreOutlined } from '@ant-design/icons'
import { Avatar, Button, Dropdown, List, MenuProps, Modal, Space, Tag, message } from 'antd'
import StorytellingPlayerButton from 'components/StorytellingPlayerButton'
import useStorytellingEpisodeDelete from 'hooks/useStorytellingEpisodeDelete'
import useStorytellingEpisodeUpdate from 'hooks/useStorytellingEpisodeUpdate'
import useStorytellingEpisodes from 'hooks/useStorytellingEpisodes'
import { DEFAULT_IMAGE } from 'libs/variables'
import Media from 'models/Media'
import { useIntl } from 'react-intl'
import AddStorytellingEpisodeButton from './AddStorytellingEpisodeButton'
import EditStorytellingEpisodeButton from './EditStorytellingEpisodeButton'

type StorytellingEpisodeListItemProps = {
  storytelling: any
  episode: any
  afterUpdated?: () => void
  afterDeleted?: () => void
}
function StorytellingEpisodeListItem ({ storytelling, episode, afterUpdated, afterDeleted }: StorytellingEpisodeListItemProps) {
  const intl = useIntl()
  const cover = storytelling?.cover ? new Media(storytelling.cover) : null
  const updater = useStorytellingEpisodeUpdate(episode.id)
  const remover = useStorytellingEpisodeDelete(episode.id)

  const handleToggleStatus = () => {
    const status = episode.status === 'draft' ? 'published' : 'draft'
    const successMessage = episode.status === 'draft' ? 'Episode published' : 'Episode reverted to draft'
    updater.mutate({ status }, {
      onSuccess: () => {
        message.success(successMessage)
        afterUpdated && afterUpdated()
      },
      onError: (err: any) => {
        message.error(err?.message)
      }
    })
  }

  const handleDelete = () => {
    Modal.confirm({
      title: 'Confirm',
      content: 'Are you sure you want to delete this episode?',
      centered: true,
      onOk: async () => {
        try {
          await remover.mutateAsync(undefined)
          if (afterDeleted) afterDeleted()
        } catch (err: any) {
          message.error(err?.message)
        }
      }
    })
  }

  const moreMenu: MenuProps = {
    items: [
      episode.status === 'draft'
        ? { key: 'publish', icon: <FileDoneOutlined />, label: intl.formatMessage({ defaultMessage: 'Publish' }), onClick: handleToggleStatus }
        : { key: 'draft', icon: <FileOutlined />, label: intl.formatMessage({ defaultMessage: 'Revert to Draft' }), onClick: handleToggleStatus },
      { key: 'edit', icon: <DeleteFilled />, label: intl.formatMessage({ defaultMessage: 'Delete' }), onClick: handleDelete }
    ]
  }
  return (
    <List.Item
      extra={
        <Space>
          <StorytellingPlayerButton storytelling={storytelling} episode={episode} options={{ status: 'any' }} />
          <EditStorytellingEpisodeButton storytelling={storytelling} episode={episode} afterUpdated={afterUpdated}>
            <Button type='text' shape='circle' icon={<EditFilled />}/>
          </EditStorytellingEpisodeButton>
          <Dropdown menu={moreMenu}>
            <Button type='text' shape='circle' icon={<MoreOutlined />} />
          </Dropdown>
        </Space>
      }
    >
      <List.Item.Meta
        avatar={<Avatar shape='square' size={64} src={cover?.md?.url || DEFAULT_IMAGE} />}
        title={
          <Space>
            <span>{episode?.title || <i>Untitled Episode</i>}</span>
            {episode.status === 'draft' && <Tag color='red'>DRAFT</Tag>}
          </Space>
        }
        description={
          <div>
            <div>{episode?.description || <i>Untitle episode</i>}</div>
          </div>
        }
      />
    </List.Item>
  )
}

type StorytellingEpisodesEditTabProps = {
  storytelling: any
}
export default function StorytellingEpisodesEditTab ({ storytelling }:StorytellingEpisodesEditTabProps) {
  const storytellingId = storytelling?.id
  const { data, refetch } = useStorytellingEpisodes({ storytellingId, status: 'any' })
  const episodes: any[] = data?.data || []
  return (
    <List
      dataSource={episodes}
      renderItem={episode => <StorytellingEpisodeListItem storytelling={storytelling} episode={episode} afterUpdated={refetch} afterDeleted={refetch} />}
      footer={
        <div style={{ textAlign: 'center' }}>
          <AddStorytellingEpisodeButton storytelling={storytelling} afterCreated={refetch}>
            <Button>Add new Episode</Button>
          </AddStorytellingEpisodeButton>
        </div>
      }
    />

  )
}
