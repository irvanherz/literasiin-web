import { Button, Card, Descriptions, List, message, Modal, Space } from 'antd'
import StoryCover from 'components/StoryCover'
import useCurrentUser from 'hooks/useCurrentUser'
import usePublicationDelete from 'hooks/usePublicationDelete'
import usePublications from 'hooks/usePublications'
import { DEFAULT_IMAGE } from 'libs/variables'
import Media from 'models/Media'
import { useMemo } from 'react'
import { FormattedMessage } from 'react-intl'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import PublicationCreateButton from './PublicationCreateButton'

const PublicationItemWrapper = styled(List.Item)`

`

type PublicationItemProps = {
  publication: any
  afterDeleted?: () => void
}

function PublicationItem ({ publication, afterDeleted }: PublicationItemProps) {
  const navigate = useNavigate()
  const cover = new Media(publication?.cover)
  const coverUrl = cover.md?.url
  const deleter = usePublicationDelete()

  const handleEdit = () => {
    navigate(`/publications/${publication.id}/edit`)
  }

  const handleDelete = () => {
    Modal.confirm({
      centered: true,
      title: 'Confirm',
      content: 'Are you sure you want to delete this publication?',
      onOk: async () => {
        try {
          await deleter.mutateAsync(publication.id)
          afterDeleted?.()
          return
        } catch (err: any) {
          message.error(err?.message)
        }
      }
    })
  }

  const actions = useMemo(() => {
    if (publication.status === 'draft') {
      return [
        <Button key='edit' type='link' onClick={handleEdit} style={{ width: '100%' }}>Edit</Button>,
        <Button key='delete' type='link' onClick={handleDelete} style={{ width: '100%' }}>Delete</Button>
      ]
    } else if (publication.status === 'payment') {
      return [
        <Link key='payment' to={`/publications/${publication.id}/edit`}>
          <Button type='link'>Lanjutkan Pebayaran</Button>
        </Link>
      ]
    } else {
      return undefined
    }
  }, [publication])

  const renderedPublicationType = ({ indie: 'Indie Publishing', selfpub: 'Self Publishing' } as any)[publication.type] || <i>Not yet filled</i>
  const renderedPublicationStatus = ({ draft: 'DRAFT', payment: 'Waiting Payment', publishing: 'Publishing', shipping: 'Shipping', published: 'Published' } as any)[publication.status] || <i>N/A</i>

  return (
    <PublicationItemWrapper>
      <Card
        actions={actions}
      >
        <Card.Meta
          avatar={
            <div style={{ width: 150 }}>
              <StoryCover src={coverUrl || DEFAULT_IMAGE} containerStyle={{ borderRadius: 8, overflow: 'hidden' }}/>
            </div>
          }
          title={publication?.title}
          description={
            <Descriptions size='small' layout="vertical">
              <Descriptions.Item label="Author">{publication.author || <i>Not yet filled</i>}</Descriptions.Item>
              <Descriptions.Item label="Type">{renderedPublicationType}</Descriptions.Item>
              <Descriptions.Item label="Status">{renderedPublicationStatus}</Descriptions.Item>
              <Descriptions.Item label="Shipping Address" span={3}>
                {publication.address?.address || <i>Not yet selected</i>}
              </Descriptions.Item>
            </Descriptions>
          }
        />
      </Card>
    </PublicationItemWrapper>
  )
}

type PublicationsTabProps = { user: any}
export default function PublicationsTab ({ user }: PublicationsTabProps) {
  const currentUser = useCurrentUser()
  const { data, refetch } = usePublications({ includeAddress: true, limit: 1000 })
  const publications = data?.data || []

  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      {currentUser && currentUser?.id === user?.id
        ? (
          <Card
            bodyStyle={{ textAlign: 'center' }}
          >
            <PublicationCreateButton>
              <Button shape='round' type='primary'><FormattedMessage defaultMessage='New Publication' /></Button>
            </PublicationCreateButton>
          </Card>
          )
        : null
      }
      <List
        grid={{ gutter: 16, column: 1 }}
        split={false}
        dataSource={publications}
        renderItem={pub => <PublicationItem publication={pub} afterDeleted={refetch} />}
      />
    </Space>
  )
}
