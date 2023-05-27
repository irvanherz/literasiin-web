import { Card, Col, Form, Input, Row, Select } from 'antd'
import ArticleImageInput from 'components/shared/ArticleImageInput'
import { FormattedMessage, useIntl } from 'react-intl'
import { useQuery } from 'react-query'
import ReactQuill, { Quill } from 'react-quill'
import ArticlesService from 'services/Articles'

const BubbleTheme = Quill.import('themes/bubble')

class ExtendBubbleTheme extends BubbleTheme {
  constructor (quill: any, options: any) {
    super(quill, options)

    quill.on('selection-change', (range: any) => {
      if (range) {
        quill.theme.tooltip.show()
        quill.theme.tooltip.position(quill.getBounds(range))
      }
    })
  }
}

Quill.register('themes/bubble', ExtendBubbleTheme)

export default function CustomArticleForm () {
  const intl = useIntl()
  const { data } = useQuery('articles.categories[]', () => ArticlesService.Categories.findMany())
  const categories = data?.data || []

  const categoryOptions: any[] = categories.map((cat: any) => ({ value: cat.id, label: cat.name }))
  return (
    <Form.Provider>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={16} lg={18} xl={18} xxl={18}>
          <Card>
            <Form.Item
              label={<FormattedMessage defaultMessage="Title" />}
              name='title'
              rules={[{ required: true, message: intl.formatMessage({ defaultMessage: 'Title is required!' }) }]}
            >
              <Input placeholder={intl.formatMessage({ defaultMessage: 'Title...' })} maxLength={255} />
            </Form.Item>
            <Form.Item
              label={<FormattedMessage defaultMessage="Description" />}
              name='description'
            >
              <Input.TextArea cols={5} placeholder={intl.formatMessage({ defaultMessage: 'Description...' })} maxLength={255} />
            </Form.Item>
            <Form.Item
              label={<FormattedMessage defaultMessage="Content" />}
              name='content'
            >
              <ReactQuill theme='bubble' placeholder='Write content here...'/>
            </Form.Item>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6}>
          <Card>
            <Form.Item
              label={<FormattedMessage defaultMessage="Category" />}
              name="categoryId"
            >
              <Select placeholder={intl.formatMessage({ defaultMessage: 'Select category...' })} options={categoryOptions}/>
            </Form.Item>
            <Form.Item
              label={<FormattedMessage defaultMessage="Image" />}
              name='image'
            >
              <ArticleImageInput />
            </Form.Item>
          </Card>
        </Col>
      </Row>
    </Form.Provider>
  )
}
