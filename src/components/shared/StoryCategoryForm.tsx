import { Form, Input } from 'antd'
import { useIntl } from 'react-intl'

export default function StoryCategoryForm () {
  const intl = useIntl()
  return (
    <Form.Provider>
      <Form.Item
        label={intl.formatMessage({ defaultMessage: 'Name' })}
        name='name'
        rules={[{ required: true, message: intl.formatMessage({ defaultMessage: 'Name is required!' }) }]}
      >
        <Input type="category" placeholder="Name..." maxLength={255} />
      </Form.Item>
      <Form.Item
        label={intl.formatMessage({ defaultMessage: 'Description' })}
        name='description'
        rules={[{ required: true, message: intl.formatMessage({ defaultMessage: 'Description is required!' }) }]}
      >
        <Input.TextArea cols={5} placeholder="Description.." maxLength={255} />
      </Form.Item>
    </Form.Provider>
  )
}
