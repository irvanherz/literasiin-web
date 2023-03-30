import { UserDeleteOutlined } from '@ant-design/icons'
import { Button, ConfigProvider, Empty, List, message, Modal } from 'antd'
import { useMutation, useQuery } from 'react-query'
import StoriesService from 'services/Stories'
import InviteWriterButton from './InviteWriterButton'

type StoryWriterItemProps = { story: any, writer: any, afterDeleted?: () => void}
function StoryWriterItem ({ story, writer, afterDeleted }:StoryWriterItemProps) {
  const connId = writer?.meta?.id
  const remover = useMutation(() => StoriesService.Writers.deleteById(connId))

  const handleDelete = () => {
    Modal.confirm({
      title: 'Confirm',
      content: 'Are you sure you want to delete this writer from this story?',
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
      extra={writer?.meta?.role !== 'owner' ? <Button shape='circle' danger icon={<UserDeleteOutlined />} onClick={handleDelete}></Button> : <span>Owner</span>}
    >
      <List.Item.Meta
        title={writer?.fullName}
        description={writer?.meta?.status || '-'}
      />
    </List.Item>
  )
}

type StoryWritersEditTabProps = { story: any }

export default function StoryWritersEditTab ({ story }: StoryWritersEditTabProps) {
  const storyId = story?.id
  const { data, refetch } = useQuery(`stories[${storyId}].writers`, () => StoriesService.Writers.findMany({ storyId }), { enabled: !!storyId })
  const writers: any[] = data?.data || []

  return (
    <ConfigProvider
      renderEmpty={() => (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="This story has no writers"
      />
      )}
    >
      <List
        dataSource={writers}
        renderItem={writer => <StoryWriterItem story={story} writer={writer} afterDeleted={refetch} />}
        footer={
          <div style={{ textAlign: 'center' }}>
            <InviteWriterButton story={story} afterCreated={refetch}>
              <Button>Invite Other Writer</Button>
            </InviteWriterButton>
          </div>
        }
      />
    </ConfigProvider>

  )
}
