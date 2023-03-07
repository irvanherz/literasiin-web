import { DeleteFilled, EditFilled, PlusOutlined } from '@ant-design/icons'
import { Button, Card, List, message, Modal, Space, Typography } from 'antd'
import StoryCover from 'components/StoryCover'
import dayjs from 'dayjs'
import { cloneElement, ReactElement, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import StoriesService from 'services/Stories'
import CreateChapterButton from './CreateChapterButton'

type ChapterItemProps = {
  chapter: any
  afterDeleted?: () => void
}
function ChaperItem ({ chapter, afterDeleted }: ChapterItemProps) {
  const chapterId = chapter.id
  const navigate = useNavigate()
  const remover = useMutation(() => StoriesService.Chapters.deleteById(chapterId))

  const handleEdit = () => navigate(`/stories/chapters/${chapter?.id}/edit`)
  const handleDelete = () => {
    Modal.confirm({
      title: 'Confirm',
      content: 'Are you sure you want to delete this chapter?',
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
      extra={
        <Space>
          <Button onClick={handleEdit} shape='circle' icon={<EditFilled />}></Button>
          <Button onClick={handleDelete} shape='circle' icon={<DeleteFilled />}></Button>
        </Space>
        }
      >
      <List.Item.Meta
        title={chapter?.title}
        description={`Last updated ${dayjs(chapter?.updatedAt).fromNow()}`}
            />
    </List.Item>
  )
}

type ContinueWritingButtonProps = {
  story: any
  children: ReactElement
}

export default function ContinueWritingButton ({ children, story }: ContinueWritingButtonProps) {
  const storyId = story?.id
  const { data, refetch } = useQuery(`stories[${storyId}].chapters`, () => StoriesService.Chapters.findMany({ storyId }))
  const chapters: any[] = data?.data || []
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
    <>
      {cloneElement(children, { onClick: handleOpen })}
      <Modal
        title="Continue Writing"
        centered
        open={open}
        onCancel={handleClose}
        footer={null}
    >
        <List
          header={
            <Card>
              <Card.Meta
                avatar={
                  <div style={{ minWidth: 72 }}>
                    <StoryCover story={story} />
                  </div>
                }
                title={story.title}
                description={<Typography.Paragraph ellipsis={{ rows: 3 }}>{story.description}</Typography.Paragraph>}
              />
            </Card>
          }
          dataSource={chapters}
          renderItem={chapter => <ChaperItem chapter={chapter} afterDeleted={refetch} />}
          footer={
            <div style={{ textAlign: 'center' }}>
              <CreateChapterButton story={story}>
                <Button icon={<PlusOutlined />}>Create New Chapter</Button>
              </CreateChapterButton>

            </div>
          }
        />
      </Modal>
    </>
  )
}
