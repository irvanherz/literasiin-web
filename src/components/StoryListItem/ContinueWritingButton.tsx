import { DeleteFilled, EditFilled, PlusOutlined } from '@ant-design/icons'
import { Button, Card, Dropdown, List, MenuProps, message, Modal, Space, Tag, Typography } from 'antd'
import StoryCover from 'components/StoryCover'
import dayjs from 'dayjs'
import { cloneElement, ReactElement, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'
import StoriesService from 'services/Stories'
import CreateChapterButton from './CreateChapterButton'

type ChapterItemProps = {
  chapter: any
  afterDeleted?: () => void
  afterUpdated?: () => void
}
function ChaperItem ({ chapter, afterUpdated, afterDeleted }: ChapterItemProps) {
  const chapterId = chapter.id
  const navigate = useNavigate()
  const updater = useMutation((payload: any) => StoriesService.Chapters.updateById(chapterId, payload))
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

  const handleToggleStatus = () => {
    if (chapter.status === 'draft') {
      updater.mutate({ status: 'published' }, {
        onSuccess: () => {
          message.success('Chapter published')
          afterUpdated && afterUpdated()
        },
        onError: (err: any) => {
          message.error(err?.message)
        }
      })
    } else {
      updater.mutate({ status: 'draft' }, {
        onSuccess: () => {
          message.success('Chapter reverted to draft')
          afterUpdated && afterUpdated()
        },
        onError: (err: any) => {
          message.error(err?.message)
        }
      })
    }
  }

  const menu: MenuProps = {
    items: [
      { key: 'edit', icon: <EditFilled />, label: 'Edit', onClick: handleEdit },
      chapter.status === 'draft'
        ? { key: 'publish', icon: <EditFilled />, label: 'Publish', onClick: handleToggleStatus }
        : { key: 'draft', icon: <EditFilled />, label: 'Revert to Draft', onClick: handleToggleStatus },
      { key: 'edit', icon: <DeleteFilled />, label: 'Delete', onClick: handleDelete }
    ]
  }

  return (
    <List.Item
      extra={
        <Space>
          <Dropdown.Button
            onClick={handleEdit}
            menu={menu}
          >
            Edit
          </Dropdown.Button>
        </Space>
        }
      >
      <List.Item.Meta
        title={
          <Space>
            <span>{chapter.title}</span>
            {chapter?.status === 'draft' && (<Tag color='red'>DRAFT</Tag>)}
          </Space>
        }
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
  const { data, refetch } = useQuery(`stories[${storyId}].chapters`, () => StoriesService.Chapters.findMany({ storyId, status: 'any' }))
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
            <Card
              actions={[<Link key='edit' to={`/stories/${storyId}/edit`}><span>Edit Story Details</span></Link>]}
            >
              <Card.Meta
                avatar={
                  <div style={{ minWidth: 72 }}>
                    <StoryCover story={story} />
                  </div>
                }
                title={
                  <Space>
                    <span>{story.title}</span>
                    {story?.status === 'draft' && (<Tag color='red'>DRAFT</Tag>)}
                  </Space>
                }
                description={<Typography.Paragraph ellipsis={{ rows: 3 }}>{story.description}</Typography.Paragraph>}
              />
            </Card>
          }
          dataSource={chapters}
          renderItem={chapter => <ChaperItem chapter={chapter} afterUpdated={refetch} afterDeleted={refetch} />}
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
