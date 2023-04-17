import { Form, Input } from 'antd'
import ReactQuill from 'react-quill'

export default function StoryChapterForm () {
  return (
    <Form.Provider>
      <Form.Item
        name='title'
      >
        <Input
          size='large'
          style={{ fontWeight: 'bold', fontSize: '1.5em', textAlign: 'center' }}
          bordered={false}
          placeholder='Chapter title...'
        />
      </Form.Item>
      <Form.Item
        name='content'
      >
        <ReactQuill theme='bubble' placeholder='Write your story here...'/>
      </Form.Item>
    </Form.Provider>
  )
}
