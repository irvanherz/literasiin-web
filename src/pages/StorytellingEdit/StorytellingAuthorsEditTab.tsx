import { UserAddOutlined, UserDeleteOutlined } from '@ant-design/icons'
import { Button, ConfigProvider, Empty, List, message, Modal } from 'antd'
import { FormattedMessage } from 'react-intl'
import { useMutation, useQuery } from 'react-query'
import StorytellingsService from 'services/Storytellings'
import InviteAuthorButton from './InviteAuthorButton'

type StorytellingAuthorItemProps = { storytelling: any, author: any, afterDeleted?: () => void}
function StorytellingAuthorItem ({ storytelling, author, afterDeleted }:StorytellingAuthorItemProps) {
  const connId = author?.meta?.id
  const remover = useMutation(() => StorytellingsService.Authors.deleteById(connId))

  const handleDelete = () => {
    Modal.confirm({
      title: 'Confirm',
      content: 'Are you sure you want to delete this author from this storytelling?',
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
  return (
    <List.Item
      extra={author?.meta?.role !== 'owner' ? <Button shape='circle' danger icon={<UserDeleteOutlined />} onClick={handleDelete}></Button> : <span>Owner</span>}
    >
      <List.Item.Meta
        title={author?.fullName}
        description={author?.meta?.status || '-'}
      />
    </List.Item>
  )
}

type StorytellingAuthorsEditTabProps = { storytelling: any }

export default function StorytellingAuthorsEditTab ({ storytelling }: StorytellingAuthorsEditTabProps) {
  const storytellingId = storytelling?.id
  const { data, refetch } = useQuery(`storytellings[${storytellingId}].authors`, () => StorytellingsService.Authors.findMany({ storytellingId }), { enabled: !!storytellingId })
  const authors: any[] = data?.data || []

  return (
    <ConfigProvider
      renderEmpty={() => (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={<FormattedMessage defaultMessage="This storytelling has no authors" />}
        />
      )}
    >
      <List
        dataSource={authors}
        renderItem={author => <StorytellingAuthorItem storytelling={storytelling} author={author} afterDeleted={refetch} />}
        footer={
          <div style={{ textAlign: 'center' }}>
            <InviteAuthorButton storytelling={storytelling} afterCreated={refetch}>
              <Button icon={<UserAddOutlined />}><FormattedMessage defaultMessage="Invite Other Author" /></Button>
            </InviteAuthorButton>
          </div>
        }
      />
    </ConfigProvider>

  )
}
