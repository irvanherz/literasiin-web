import { Form, Input } from 'antd'
import StoryEditor from 'components/LexicalEditor/StoryEditor'
import { LexicalEditor } from 'lexical'
import { useState } from 'react'

export default function EditorForm () {
  const form = Form.useFormInstance()
  const [editor, setEditor] = useState<LexicalEditor>()
  return (
    <Form.Provider>
      <Form.Item
        name='title'
      >
        <Input placeholder="Title..." />
      </Form.Item>
      <Form.Item
        name='content'

      >
        <StoryEditor onReady={setEditor} />
      </Form.Item>
    </Form.Provider>
  )
}
