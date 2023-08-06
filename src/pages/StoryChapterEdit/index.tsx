/* eslint-disable no-unused-vars */
import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html'
import { Card, Col, Descriptions, Dropdown, Form, Input, message, Row, Space } from 'antd'
import Layout from 'components/Layout'
import StoryEditor from 'components/LexicalEditor/StoryEditor'
import RouteGuard from 'components/RouteGuard'
import RenderTimeFromNow from 'components/shared/RenderTimeFromNow'
import useStoryChapter from 'hooks/useStoryChapter'
import useStoryChapterUpdate from 'hooks/useStoryChapterUpdate'
import { $getRoot, $isDecoratorNode, $isElementNode, LexicalEditor } from 'lexical'
import analytics from 'libs/analytics'
import { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SettingsForm from './SettingsForm'

export default function StoryChapterEdit () {
  const navigate = useNavigate()
  const params = useParams()
  const chapterId = +(params?.chapterId || 0)
  const updater = useStoryChapterUpdate(chapterId)
  const [editor, setEditor] = useState<LexicalEditor>()
  const [title, setTitle] = useState('')

  const [settingsForm] = Form.useForm()

  const { data, refetch } = useStoryChapter(chapterId)

  const chapter = data?.data

  useEffect(() => {
    analytics.page({
      title: 'Edit Story',
      url: window.location.href
    })
  }, [chapter])

  useLayoutEffect(() => {
    if (!chapter || !editor) return
    setTitle(chapter?.title)
    editor.update(() => {
      // In the browser you can use the native DOMParser API to parse the HTML string.
      const parser = new DOMParser()
      const dom = parser.parseFromString(chapter?.content || '', 'text/html')
      // Once you have the DOM instance it's easy to generate LexicalNodes.
      const nodes = $generateNodesFromDOM(editor!, dom)
      // Select the root
      const root = $getRoot()
      root.clear()
      nodes.forEach((n) => {
        if ($isElementNode(n) || $isDecoratorNode(n)) {
          root.append(n)
        }
      })
    })
    settingsForm.setFieldsValue({
      price: +chapter.price,
      commentStatus: chapter.commentStatus
    })
  }, [chapter, editor])

  const handlePublish = async () => {
    try {
      const content = await new Promise((resolve) => {
        const editorState = editor!.getEditorState()
        editorState.read(() => {
          const content = $generateHtmlFromNodes(editor!)
          resolve(content)
        })
      })
      const settingsValues = settingsForm.getFieldsValue()
      const values = {
        title,
        content,
        status: 'published',
        ...settingsValues
      }
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
      console.log(err)
      message.error('Check all fields then try again')
    }
  }

  const handleRevertToDraft = async () => {
    try {
      const content = await new Promise((resolve) => {
        const editorState = editor!.getEditorState()
        editorState.read(() => {
          const content = $generateHtmlFromNodes(editor!)
          resolve(content)
        })
      })
      const settingsValues = settingsForm.getFieldsValue()
      const values = {
        title,
        content,
        status: 'draft',
        ...settingsValues
      }
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
      console.log(err)
      message.error('Check all fields then try again')
    }
  }

  const handleSave = async () => {
    try {
      const content = await new Promise((resolve) => {
        const editorState = editor!.getEditorState()
        editorState.read(() => {
          const content = $generateHtmlFromNodes(editor!)
          resolve(content)
        })
      })

      const settingsValues = settingsForm.getFieldsValue()
      const values = {
        title,
        content,
        ...settingsValues
      }
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
      console.log(err)
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
              loading={updater.isLoading}
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
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={12} lg={16} xl={16} xxl={16}>
              <Space direction='vertical' style={{ width: '100%' }}>
                <Input placeholder='Input chapter title...' value={title} onChange={e => setTitle(e.target.value)} />
                <StoryEditor onReady={setEditor} />
              </Space>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
              <Card>
                <Space direction='vertical' split style={{ width: '100%' }}>
                  <Descriptions column={1} size='small'>
                    <Descriptions.Item label="Status">{chapter?.status}</Descriptions.Item>
                    <Descriptions.Item label="Last updated">{<RenderTimeFromNow timestamp={chapter?.updatedAt} />}</Descriptions.Item>
                  </Descriptions>
                  <Form form={settingsForm} colon={false} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                    <SettingsForm />
                  </Form>
                </Space>
              </Card>
            </Col>
          </Row>
        </Layout.Scaffold>
      </Layout.Default>
    </RouteGuard>

  )
}
