import { Card, Dropdown, Form, message } from 'antd'
import Layout from 'components/Layout'
import RouteGuard from 'components/RouteGuard'
import useStoryChapter from 'hooks/useStoryChapter'
import useStoryChapterUpdate from 'hooks/useStoryChapterUpdate'
import { useEffect, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import StoryChapterForm from './StoryChapterForm'

export default function StoryChapterEdit () {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const params = useParams()
  const chapterId = +(params?.chapterId || 0)
  const updater = useStoryChapterUpdate(chapterId)

  const { data, refetch } = useStoryChapter(chapterId)

  const chapter = data?.data

  const initialValues = useMemo(() => {
    return { ...chapter }
  }, [chapter])

  useEffect(() => {
    form.resetFields()
  }, [initialValues])

  const handlePublish = async () => {
    try {
      const values: any = await form.validateFields()
      values.status = 'published'
      updater.mutate(values, {
        onSuccess: (data) => {
          message.success('Chapter published successfully')
          navigate(`/stories/chapters/${chapterId}`)
        },
        onError: (err) => {
          message.error(err.message)
        }
      })
    } catch (err) {
      message.error('Check all fields then try again')
    }
  }

  const handleRevertToDraft = async () => {
    try {
      const values: any = await form.validateFields()
      values.status = 'draft'
      updater.mutate(values, {
        onSuccess: (data) => {
          message.success('Article reverted to draft')
          refetch()
        },
        onError: (err) => {
          message.error(err.message)
        }
      })
    } catch (err) {
      message.error('Check all fields then try again')
    }
  }

  const handleSave = async () => {
    try {
      const values: any = await form.validateFields()
      updater.mutate(values, {
        onSuccess: (data) => {
          message.success('Changes has saved')
          refetch()
        },
        onError: (err) => {
          message.error(err.message)
        }
      })
    } catch (err) {
      message.error('Check all fields then try again')
    }
  }

  return (
    <RouteGuard require='authenticated'>
      <Layout.Default>
        <Layout.Scaffold
          bodyStyle={{ padding: '16px 0' }}
          title="Edit Story Chapter"
          description="Edit your story"
          actions={[
            <Dropdown.Button
              key='save'
              type='primary'
              onClick={handleSave}
              menu={{
                items: [
                  { key: 'save', label: 'Save', onClick: handleSave },
                  chapter?.status === 'published'
                    ? { key: 'rev', label: 'Save & Revert to Draft', onClick: handleRevertToDraft }
                    : { key: 'pub', label: 'Save & Publish', onClick: handlePublish }
                ]
              }}
            >
              Save
            </Dropdown.Button>
          ]}
        >
          <Card size='small'>
            <Form form={form} initialValues={initialValues} wrapperCol={{ span: 24 }} labelCol={{ span: 24 }}>
              <StoryChapterForm />
            </Form>
          </Card>
        </Layout.Scaffold>
      </Layout.Default>
    </RouteGuard>

  )
}
