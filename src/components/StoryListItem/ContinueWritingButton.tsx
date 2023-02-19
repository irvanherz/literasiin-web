import { PlusOutlined } from '@ant-design/icons'
import { Button, Card, List, Modal, Typography } from 'antd'
import StoryCover from 'components/StoryCover'
import dayjs from 'dayjs'
import { DEFAULT_IMAGE } from 'libs/variables'
import { cloneElement, ReactElement, useState } from 'react'
import { useQuery } from 'react-query'
import StoriesService from 'services/Stories'
import CreateChapterButton from './CreateChapterButton'

type ContinueWritingButtonProps = {
  story: any
  children: ReactElement
}
export default function ContinueWritingButton ({ children, story }: ContinueWritingButtonProps) {
  const storyId = story?.id
  const { data } = useQuery(`stories[${storyId}].chapters`, () => StoriesService.Chapters.findMany({ storyId }))
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
                    <StoryCover src={DEFAULT_IMAGE} />
                  </div>
                }
                title={story.title}
                description={<Typography.Paragraph ellipsis={{ rows: 3 }}>{story.description}</Typography.Paragraph>}
              />
            </Card>
          }
          dataSource={chapters}
          renderItem={chapter => (
            <List.Item>
              <List.Item.Meta
                title={chapter?.title}
                description={`Last updated ${dayjs(chapter?.updatedAt).fromNow()}`}
            />
            </List.Item>
          )}
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
