import { Form, Input } from 'antd'
import { useIntl } from 'react-intl'
import StorytellingAudioMediaInput from './StorytellingAudioMediaInput'

export default function StorytellingEpisodeForm () {
  const intl = useIntl()
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
        label={intl.formatMessage({ defaultMessage: 'Media' })}
        name="media"
        rules={[{ required: true, message: intl.formatMessage({ defaultMessage: 'Media is required!' }) }]}
      >
        <StorytellingAudioMediaInput/>
      </Form.Item>
    </Form.Provider>
  )
}
