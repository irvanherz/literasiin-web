import { Col, Form, Input, Row, Select } from 'antd'
import { useIntl } from 'react-intl'
import { useQuery } from 'react-query'
import ReactQuill from 'react-quill'
import ArticlesService from 'services/Articles'
import ArticleImageInput from './ArticleImageInput'

export default function ArticleForm () {
  const intl = useIntl()
  const { data } = useQuery('articles.categories[]', () => ArticlesService.Categories.findMany())
  const categories = data?.data || []

  const categoryOptions: any[] = categories.map((cat: any) => ({ value: cat.id, label: cat.name }))
  return (
    <Form.Provider>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6}>
          <Form.Item
            name='imageId'
          >
            <ArticleImageInput />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={16} lg={18} xl={18} xxl={18}>
          <Form.Item
            label={intl.formatMessage({ defaultMessage: 'Title' })}
            name='title'
            rules={[{ required: true, message: intl.formatMessage({ defaultMessage: 'Title is required!' }) }]}
          >
            <Input type="email" placeholder={intl.formatMessage({ defaultMessage: 'Title...' })} maxLength={255} />
          </Form.Item>
          <Form.Item
            label={intl.formatMessage({ defaultMessage: 'Description' })}
            name='description'
            rules={[{ required: true, message: intl.formatMessage({ defaultMessage: 'Description is required!' }) }]}
          >
            <Input.TextArea cols={5} placeholder={intl.formatMessage({ defaultMessage: 'Description...' })} maxLength={255} />
          </Form.Item>
          <Form.Item
            label={intl.formatMessage({ defaultMessage: 'Content' })}
            name='content'
            rules={[{ required: true, message: intl.formatMessage({ defaultMessage: 'Content is required!' }) }]}
          >
            <ReactQuill theme='bubble' placeholder='Write content here...' />
          </Form.Item>
          <Form.Item
            label={intl.formatMessage({ defaultMessage: 'Category' })}
            name="categoryId"
            rules={[{ required: true, message: intl.formatMessage({ defaultMessage: 'Category is required!' }) }]}
      >
            <Select placeholder={intl.formatMessage({ defaultMessage: 'Select category...' })} options={categoryOptions}/>
          </Form.Item>
        </Col>
      </Row>
    </Form.Provider>
  )
}
