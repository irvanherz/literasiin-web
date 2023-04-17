import { Button, Card, List, Space } from 'antd'
import StoryCover from 'components/StoryCover'
import useCurrentUser from 'hooks/useCurrentUser'
import usePublications from 'hooks/usePublications'
import { DEFAULT_IMAGE } from 'libs/variables'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import PublicationCreateButton from './PublicationCreateButton'

const PublicationItemWrapper = styled(List.Item)`

`

type PublicationItemProps = { publication: any }
function PublicationItem ({ publication }: PublicationItemProps) {
  return (
    <PublicationItemWrapper>
      <Card>
        <Card.Meta
          avatar={
            <div style={{ width: 150 }}>
              <StoryCover src={DEFAULT_IMAGE}/>
            </div>
          }
          title={publication?.title}
        />
      </Card>
    </PublicationItemWrapper>
  )
}

type PublicationsTabProps = { user: any}
export default function PublicationsTab ({ user }: PublicationsTabProps) {
  const currentUser = useCurrentUser()
  const { data } = usePublications({ limit: 1000 })
  const publications = data?.data || []

  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      {currentUser && currentUser?.id === user?.id
        ? (
          <Card
            bodyStyle={{ textAlign: 'center' }}
          >
            <PublicationCreateButton>
              <Button disabled shape='round' type='primary'><FormattedMessage defaultMessage='New Publication' /></Button>
            </PublicationCreateButton>
          </Card>
          )
        : null
      }
      <List
        grid={{ gutter: 16, column: 1 }}
        split={false}
        dataSource={publications}
        renderItem={pub => <PublicationItem publication={pub} />}
      />
    </Space>
  )
}
