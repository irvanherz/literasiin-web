import { Form, Input, Select } from 'antd'
import StoryTagsInput from 'components/StoryTagsInput'
import { useIntl } from 'react-intl'
import { useQuery } from 'react-query'
import StoriesService from 'services/Stories'

type StoryFormProps = {
  story?: any
}
export default function StoryForm ({ story }: StoryFormProps) {
  const intl = useIntl()
  const { data } = useQuery('stories.categories', () => StoriesService.Categories.findMany())
  const categories = data?.data || []

  const categoryOptions: any[] = categories.map((cat: any) => ({ value: cat.id, label: cat.name }))

  return (
    <Form.Provider>
      <Form.Item
        label={intl.formatMessage({ defaultMessage: 'Title' })}
        name="title"
        rules={[{ required: true, message: intl.formatMessage({ defaultMessage: 'Title is required!' }) }]}
      >
        <Input placeholder={intl.formatMessage({ defaultMessage: 'Title...' })} />
      </Form.Item>
      <Form.Item
        label={intl.formatMessage({ defaultMessage: 'Description' })}
        name="description"
        rules={[{ required: true, message: intl.formatMessage({ defaultMessage: 'Description is required!' }) }]}
      >
        <Input.TextArea placeholder={intl.formatMessage({ defaultMessage: 'Description...' })} rows={5} />
      </Form.Item>
      <Form.Item
        label={intl.formatMessage({ defaultMessage: 'Category' })}
        name="categoryId"
        rules={[{ required: true, message: intl.formatMessage({ defaultMessage: 'Category is required!' }) }]}
      >
        <Select placeholder={intl.formatMessage({ defaultMessage: 'Select category...' })} options={categoryOptions}/>
      </Form.Item>
      {!!story && (
        <Form.Item
          label={intl.formatMessage({ defaultMessage: 'Tags' })}
        >
          <StoryTagsInput story={story} />
        </Form.Item>
      )}

    </Form.Provider>
  )
}
