import { BookFilled, CalendarFilled, EditFilled } from '@ant-design/icons'
import { Button, Card, Divider, List } from 'antd'
import ProfileShareSegment from 'components/ProfileShareSegment'
import dayjs from 'dayjs'
import styled from 'styled-components'
import BioEditButton from './BioEditButton'

const StyledCard = styled(Card)`
.ant-list-item {
  padding-left: 0;
  padding-right: 0;
}
`
type ProfileCardProps = {
  user: any
  afterUpdated?: () => void
}

export default function ProfileCard ({ user, afterUpdated }: ProfileCardProps) {
  const joinDate = dayjs(user?.createdAt).fromNow()
  return (
    <StyledCard>
      <List size='small' split>
        <List.Item
          style={{ textAlign: 'center' }}
          extra={
            <BioEditButton user={user} afterUpdated={afterUpdated}>
              <Button shape='circle' icon={<EditFilled />} />
            </BioEditButton>
          }
        >
          <List.Item.Meta
            title="Bio"
            description={user?.bio || <i>Empty bio</i>}
          />
        </List.Item>
        <List.Item>
          <List.Item.Meta
            style={{ alignItems: 'center' }}
            avatar={<BookFilled />}
            title="Activity"
            description={'Reading 10 hours since then'}
          />
        </List.Item>
        <List.Item>
          <List.Item.Meta
            style={{ alignItems: 'center' }}
            avatar={<CalendarFilled />}
            title="Joined at"
            description={joinDate}
          />
        </List.Item>
      </List>
      <Divider />
      <ProfileShareSegment user={user} />
    </StyledCard>
  )
}
