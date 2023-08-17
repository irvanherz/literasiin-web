import { DeleteFilled, EditFilled } from '@ant-design/icons'
import { Avatar, Button, Card, ConfigProvider, Empty, List, Space } from 'antd'
import StorytellingPlayerButton from 'components/StorytellingPlayerButton'
import useStorytellingEpisodes from 'hooks/useStorytellingEpisodes'
import { DEFAULT_IMAGE } from 'libs/variables'
import Media from 'models/Media'
import { FormattedMessage } from 'react-intl'
import AddStorytellingEpisodeButton from './AddStorytellingEpisodeButton'
import DeleteStorytellingEpisodeButton from './DeleteStorytellingEpisodeButton'
import EditStorytellingEpisodeButton from './EditStorytellingEpisodeButton'

type StorytellingEpisodeListItemProps = {
  storytelling: any
  episode: any
  afterUpdated?: () => void
  afterDeleted?: () => void
}
function StorytellingEpisodeListItem ({ storytelling, episode, afterUpdated, afterDeleted }: StorytellingEpisodeListItemProps) {
  const cover = storytelling?.cover ? new Media(storytelling.cover) : null
  return (
    <List.Item>
      <Card style={{ width: '100%' }}>
        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
          <Card.Meta
            avatar={<Avatar shape='square' size={64} src={cover?.md?.url || DEFAULT_IMAGE} />}
            title={episode?.title || <i>Untitled Episode</i>}
            description={episode?.description || <i>Untitle episode</i>}
            style={{ width: '100%' }}
          />
          <Space>
            <StorytellingPlayerButton storytelling={storytelling} episode={episode} />
            <EditStorytellingEpisodeButton storytelling={storytelling} episode={episode} afterUpdated={afterUpdated}>
              <Button shape='circle' icon={<EditFilled />}/>
            </EditStorytellingEpisodeButton>
            <DeleteStorytellingEpisodeButton storytelling={storytelling} episode={episode} afterDeleted={afterDeleted}>
              <Button danger shape='circle' icon={<DeleteFilled />}/>
            </DeleteStorytellingEpisodeButton>
          </Space>

        </Space>
      </Card>
    </List.Item>
  )
}

type StorytellingEpisodesEditTabProps = {
  storytelling: any
}
export default function StorytellingEpisodesEditTab ({ storytelling }:StorytellingEpisodesEditTabProps) {
  const storytellingId = storytelling.id
  const { data, refetch } = useStorytellingEpisodes({ storytellingId, status: 'any' })
  const episodes: any[] = data?.data || []
  return (
    <ConfigProvider
      renderEmpty={() => (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <Space direction='vertical'>
              <div><FormattedMessage defaultMessage="This storytelling has no episodes" /></div>
              <div>
                <AddStorytellingEpisodeButton storytelling={storytelling} afterCreated={refetch}>
                  <Button>Add new Episode</Button>
                </AddStorytellingEpisodeButton>
              </div>
            </Space>
          }
        />
      )}
    >
      <List
        grid={{ column: 1, gutter: 16 }}
        dataSource={episodes}
        renderItem={episode => <StorytellingEpisodeListItem storytelling={storytelling} episode={episode} afterUpdated={refetch} afterDeleted={refetch} />}
        footer={!!episodes?.length && (
          <div style={{ textAlign: 'center' }}>
            <AddStorytellingEpisodeButton storytelling={storytelling} afterCreated={refetch}>
              <Button>Add new Episode</Button>
            </AddStorytellingEpisodeButton>
          </div>
        )}
      />
    </ConfigProvider>

  )
}
