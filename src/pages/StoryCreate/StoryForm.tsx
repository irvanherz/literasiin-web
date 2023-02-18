import { Form, Input, Select } from 'antd'
import { useQuery } from 'react-query'
import StoriesService from 'services/Stories'

export default function StoryForm () {
  const { data } = useQuery('stories.categories', () => StoriesService.Categories.findMany())
  const categories = data?.data || []

  const categoryOptions: any[] = categories.map((cat: any) => ({ value: cat.id, label: cat.name }))

  return (
    <Form.Provider>
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: 'Title is required' }]}
      >
        <Input placeholder="Title" />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: 'Description is required' }]}
      >
        <Input.TextArea placeholder="Description..." rows={5} />
      </Form.Item>
      <Form.Item
        label="Category"
        name="categoryId"
        rules={[{ required: true, message: 'Category is required' }]}
      >
        <Select placeholder="Select category" options={categoryOptions}/>
      </Form.Item>
      {/* <Form.Item
        label="Tags"
        name="tags"
      >
        <Select
          mode="tags"
          style={{ width: '100%' }}
          placeholder="Input tags"
          options={[{ value: 1, label: 'aaa' }, { value: 2, label: 'bbb' }]}
        />
      </Form.Item> */}
    </Form.Provider>
  )
}
