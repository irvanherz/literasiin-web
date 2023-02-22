import { Form, Input } from 'antd'

export default function StoryCategoryForm () {
  return (
    <Form.Provider>
      <Form.Item
        label="Name"
        name='name'
        rules={[{ required: true, message: 'Name is required' }]}
      >
        <Input type="category" placeholder="Name..." maxLength={255} />
      </Form.Item>
      <Form.Item
        label="Description"
        name='description'
        rules={[{ required: true, message: 'Description is required' }]}
      >
        <Input.TextArea cols={5} placeholder="Description.." maxLength={255} />
      </Form.Item>
    </Form.Provider>
  )
}
