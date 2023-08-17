import { Avatar, Card, List } from 'antd'
import useStorytellingEpisodes from 'hooks/useStorytellingEpisodes'

type EpisodeProps = {
  episode: any
}

function Episode ({ episode }: EpisodeProps) {
  return (
    <List.Item>
      <Card style={{ width: '100%' }}>
        <Card.Meta
          avatar={<Avatar shape='square' size={64} />}
          title="Judul"
          description="Lorem"
        />
      </Card>
    </List.Item>
  )
}

type EpisodesProps = {
  storytelling: any
}

export default function Episodes ({ storytelling }: EpisodesProps) {
  const { data } = useStorytellingEpisodes({ storytellingId: storytelling?.id }, { enabled: !!storytelling?.id })
  const episodes: any[] = data?.data || []
  return (
    <List
      split={false}
      grid={{ column: 1, gutter: 16 }}
      dataSource={episodes}
      renderItem={episode => <Episode episode={episode} key={episode.id} />}
    />
  )
}
