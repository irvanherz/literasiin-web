import { Avatar, Card, List } from 'antd'

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

export default function Episodes () {
  return (
    <List
      split={false}
      grid={{ column: 1, gutter: 16 }}
      dataSource={[1, 1, 1, 1, 1]}
      renderItem={episode => <Episode episode={{}} key={episode} />}
    />
  )
}
