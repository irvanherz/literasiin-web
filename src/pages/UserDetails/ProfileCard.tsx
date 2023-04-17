import { CalendarFilled, EditFilled } from '@ant-design/icons'
import { Button, Card, Divider, List } from 'antd'
import ProfileShareSegment from 'components/ProfileShareSegment'
import RenderTimeFromNow from 'components/shared/RenderTimeFromNow'
import { FormattedMessage } from 'react-intl'
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
            title={<FormattedMessage defaultMessage='Bio' />}
            description={user?.bio || <i><FormattedMessage defaultMessage='Empty bio' /></i>}
          />
        </List.Item>
        {/* <List.Item>
          <List.Item.Meta
            style={{ alignItems: 'center' }}
            avatar={<BookFilled />}
            title="Activity"
            description={'Reading 10 hours since then'}
          />
        </List.Item> */}
        <List.Item>
          <List.Item.Meta
            style={{ alignItems: 'center' }}
            avatar={<CalendarFilled />}
            title={<FormattedMessage defaultMessage='Joined at' />}
            description={<RenderTimeFromNow timestamp={user?.createdAt} />}
          />
        </List.Item>
      </List>
      <Divider />
      <ProfileShareSegment user={user} />
    </StyledCard>
  )
}
