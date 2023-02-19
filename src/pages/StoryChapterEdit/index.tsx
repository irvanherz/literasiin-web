import { Button, Card, Input, message } from 'antd'
import Layout from 'components/Layout'
import RouteGuard from 'components/RouteGuard'
import { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import StoriesService from 'services/Stories'
import { useEditor } from './AdvancedEditor'
import './editor-theme.css'

export default function StoryChapterEdit () {
  const params = useParams()
  const chapterId = +(params?.chapterId || 0)
  const [title, setTitle] = useState('')
  const [lastContent, setLastContent] = useState('')
  const [editorRef, quill] = useEditor({ placeholder: 'Write story here...' })
  const updater = useMutation<any, any, any>(payload => StoriesService.Chapters.updateById(chapterId, payload))

  const { data } = useQuery(
    `stories.chapters[${chapterId}]`,
    () => StoriesService.Chapters.findById(chapterId),
    { enabled: !!chapterId, refetchOnWindowFocus: false }
  )

  const chapter = data?.data

  useEffect(() => {
    if (chapter && quill) {
      setTitle(chapter.title)
      quill.root.innerHTML = chapter.content
    }
  }, [chapter, quill])

  const canSubmit = !!title && !!lastContent

  useEffect(() => {
    if (quill) {
      quill.on('text-change', function (delta, oldDelta, source) {
        setLastContent(quill.root.innerHTML)
      })
    }
  }, [quill])

  const handleSave = () => {
    const payload = { title, content: quill?.root.innerHTML || '' }
    updater.mutate(payload, {
      onSuccess: () => {
        message.success('Changes has saved')
      },
      onError: (err) => {
        message.error(err?.message)
      }
    })
  }

  const handlePublish = () => {
    const payload = { title, content: quill?.root.innerHTML || '', status: 'published' }
    updater.mutate(payload, {
      onSuccess: () => {
        message.success('Changes has saved & published')
      },
      onError: (err) => {
        message.error(err?.message)
      }
    })
  }

  return (
    <RouteGuard require='authenticated'>
      <Layout.Default>
        <Layout.Scaffold
          bodyStyle={{ padding: '16px 0' }}
          title="Edit Story Chapter"
          description="Edit your story"
          actions={[
            <Button disabled={!canSubmit} type='primary' key="publish" onClick={handlePublish}>Publish</Button>,
            <Button disabled={!canSubmit} key="save" onClick={handleSave}>Save</Button>
          ]}
        >
          <Card size='small'>
            <Input
              size='large'
              style={{ fontWeight: 'bold', fontSize: '1.5em', textAlign: 'center' }}
              bordered={false}
              placeholder='Chapter title...'
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <div ref={editorRef}/>
          </Card>
        </Layout.Scaffold>
      </Layout.Default>
    </RouteGuard>

  )
}
