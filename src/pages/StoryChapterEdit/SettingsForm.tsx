import { Divider, Form, Segmented, Typography } from 'antd'
import { FormattedMessage, useIntl } from 'react-intl'
import PriceInput from './PriceInput'

export default function SettingsForm () {
  const intl = useIntl()
  return (
    <>
      {/* <Typography.Paragraph>Dengan mengaktifkan monetization, cerita Anda akan dikunci dan hanya dapat dibaca oleh pembaca yang sudah membayar.</Typography.Paragraph> */}
      <Form.Provider>
        <Form.Item
          name="price"
          wrapperCol={{ span: 24 }} labelCol={{ span: 24 }}
        >
          <PriceInput />
        </Form.Item>
        <Divider />
        <Typography.Paragraph><FormattedMessage defaultMessage="Specify whether reader can write comment to your story chapter." /></Typography.Paragraph>
        <Form.Item
          name="commentStatus"
        >
          <Segmented options={[{ value: 'enabled', label: intl.formatMessage({ defaultMessage: 'Enabled' }) }, { value: 'disabled', label: intl.formatMessage({ defaultMessage: 'Disabled' }) }]} />
        </Form.Item>
      </Form.Provider>
    </>
  )
}
