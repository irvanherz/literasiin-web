import { Form, Input } from 'antd'
import ArticleCategoryInput from './ArticleCategoryInput'

export default function ArticleForm () {
  return (
    <Form.Provider>
      <Form.Item
        label="Title"
        name='title'
        rules={[{ required: true, message: 'Title is required' }]}
      >
        <Input type="email" placeholder="Title..." maxLength={255} />
      </Form.Item>
      <Form.Item
        label="Content"
        name='content'
        rules={[{ required: true, message: 'Content is required' }]}
      >
        <Input.TextArea cols={5} placeholder="Content" maxLength={255} />
      </Form.Item>
      <Form.Item
        label="Category"
        name='categoryId'
        rules={[{ required: true, message: 'Email is required' }]}
      >
        <ArticleCategoryInput placeholder="Select category..." />
      </Form.Item>
    </Form.Provider>
  )
}
