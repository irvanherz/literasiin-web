/* eslint-disable prefer-promise-reject-errors */
import { Button, Form, Input, Select } from 'antd'
import PlacePicker from 'components/PlacePicker'
import { useIntl } from 'react-intl'
import { useMutation } from 'react-query'
import GoogleMapsServices from 'services/GoogleMapsService'

export default function UserAddressForm () {
  const intl = useIntl()
  const form = Form.useFormInstance()
  const center = Form.useWatch('location')

  const filler = useMutation(async () => {
    const reponse = await GoogleMapsServices.geocodeLocation({ lat: center[0], lng: center[1] })
    const result = reponse.results[0]
    const address = result.formatted_address
    const postalCode = result.address_components.find(c => c.types.includes('postal_code'))?.long_name
    form.setFieldsValue({ address, postalCode })
  })

  const handleFillByLocation = () => {
    filler.mutate()
  }

  return (
    <Form.Provider>
      <Form.Item
        label={intl.formatMessage({ defaultMessage: 'Pilih lokasi' })}
        name='location'
        rules={[{ required: true, message: intl.formatMessage({ defaultMessage: 'Location is required!' }) }]}
        extra={
          <div style={{ textAlign: 'center', paddingTop: 16 }}>
            <Button onClick={handleFillByLocation}>Isi alamat dari peta</Button>
          </div>
        }
      >
        <PlacePicker />
      </Form.Item>
      <Form.Item
        label={intl.formatMessage({ defaultMessage: 'Address Type' })}
        name='type'
        rules={[{ required: true, message: intl.formatMessage({ defaultMessage: 'type is required!' }) }]}
      >
        <Select
          options={[{ label: 'Home', value: 'home' }, { label: 'Office', value: 'office' }, { label: 'Dorm', value: 'dorm' }]}
          placeholder={intl.formatMessage({ defaultMessage: 'Select type...' })}
          style={{ maxWidth: 300 }}
        />
      </Form.Item>
      <Form.Item
        label={intl.formatMessage({ defaultMessage: 'Full address' })}
        name='address'
        rules={[{ required: true, message: intl.formatMessage({ defaultMessage: 'Address is required!' }) }]}
      >
        <Input placeholder={intl.formatMessage({ defaultMessage: 'Address...' })} maxLength={255} />
      </Form.Item>
      <Form.Item
        label={intl.formatMessage({ defaultMessage: 'Postal code' })}
        name='postalCode'
        rules={[{ required: true, message: intl.formatMessage({ defaultMessage: 'Postal code is required!' }) }]}
      >
        <Input placeholder={intl.formatMessage({ defaultMessage: 'Phone...' })} maxLength={255} />
      </Form.Item>
      <Form.Item
        label={intl.formatMessage({ defaultMessage: 'Phone' })}
        name='phone'
        rules={[{ required: true, message: intl.formatMessage({ defaultMessage: 'Phone is required!' }) }]}
      >
        <Input placeholder={intl.formatMessage({ defaultMessage: 'Phone...' })} maxLength={255} />
      </Form.Item>
    </Form.Provider>
  )
}
