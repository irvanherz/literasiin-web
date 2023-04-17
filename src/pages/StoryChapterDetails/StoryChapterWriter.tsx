import { Avatar, Button, Card, List } from 'antd'
import { DEFAULT_PHOTO } from 'libs/variables'
import Media from 'models/Media'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

type StoryWriterItemProps = { writer: any }
function StoryWriterItem ({ writer }: StoryWriterItemProps) {
  const avatar = writer.photo ? new Media(writer.photo) : null
  return (
    <List.Item extra={<Link to={`/users/${writer.username}`}><Button>View</Button></Link>}>
      <List.Item.Meta
        avatar={<Avatar src={avatar?.md?.url || DEFAULT_PHOTO}/>}
        title={writer.fullName}
        description={<FormattedMessage defaultMessage='Writer' />}
      />
    </List.Item>
  )
}

const StyledCard = styled(Card)`
.ant-list-item-meta-title {
  margin-top: 0;
}
`

type StoryChapterWriterProps = {
  story: any
}

export default function StoryChapterWriter ({ story }: StoryChapterWriterProps) {
  const writers: any[] = story?.writers || []
  return (
    <StyledCard>
      <List
        dataSource={writers}
        renderItem={writer => (
          <StoryWriterItem writer={writer} />
        )}
      />
    </StyledCard>
  )
}
