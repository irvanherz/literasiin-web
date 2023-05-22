/* eslint-disable prefer-promise-reject-errors */
import { Col, Form, InputNumber, List, Row, Select, Space } from 'antd'
import IndiePublishingPackagePicker from 'components/IndiePublishingPackagePicker'
import ShippingMethodInput from 'components/ShippingMethodInput'
import { useEffect, useMemo } from 'react'
import { useIntl } from 'react-intl'

type PublicationMetaFormProps = {
  publication: any
}

const formatter = new Intl.NumberFormat('id-ID')

export default function PublicationMetaForm ({ publication }: PublicationMetaFormProps) {
  const form = Form.useFormInstance()
  const intl = useIntl()
  const paperType = Form.useWatch('paperType')
  const numBwPages = Form.useWatch('numBwPages')
  const numColorPages = Form.useWatch('numColorPages')
  const numCopies = Form.useWatch('numCopies')

  useEffect(() => {
    form.setFieldsValue({ shipping: undefined })
  }, [paperType, numBwPages, numColorPages, numCopies])

  const pricingSummary = useMemo(() => {
    const bwPagePrice = 100
    const colorPagePrice = 300
    const bwPagesTotalPrice = bwPagePrice * (numBwPages || 0)
    const colorPagesTotalPrice = colorPagePrice * (numColorPages || 0)
    const perCopyPrice = bwPagesTotalPrice + colorPagesTotalPrice
    const finalPrice = perCopyPrice * (numCopies || 0)

    return (
      <Space direction='vertical' style={{ width: '100%' }}>
        <List bordered header="Ringkasan Biaya Cetak">
          <List.Item extra={formatter.format(bwPagesTotalPrice)}>
            <List.Item.Meta
              title="Halaman hitam putih"
              description={`${formatter.format(bwPagePrice)} x ${formatter.format(numBwPages)}`}
            />
          </List.Item>
          <List.Item extra={formatter.format(colorPagesTotalPrice)}>
            <List.Item.Meta
              title="Halaman hitam putih"
              description={`${formatter.format(colorPagePrice)} x ${formatter.format(numColorPages)}`}
            />
          </List.Item>
        </List>
        <List bordered header="Biaya Cetak Per Copy">
          <List.Item extra={formatter.format(perCopyPrice)}>
            <List.Item.Meta
              title={`${formatter.format(bwPagesTotalPrice)} + ${formatter.format(colorPagesTotalPrice)}`}
            />
          </List.Item>
        </List>
        <List bordered header="Biaya Cetak Total">
          <List.Item extra={formatter.format(finalPrice)}>
            <List.Item.Meta
              title={`${formatter.format(perCopyPrice)} x ${formatter.format(numCopies)}`}
            />
          </List.Item>
        </List>
      </Space>
    )
  }, [paperType, numBwPages, numColorPages, numCopies])

  return (
    <Form.Provider>
      {publication?.type === 'selfpub'
        ? (
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label={intl.formatMessage({ defaultMessage: 'Jenis kertas' })}
                name='paperType'
                tooltip='Jenis kertas untuk buku cetak'
                rules={[{ required: true, message: intl.formatMessage({ defaultMessage: 'Paper type size is required!' }) }]}
              >
                <Select
                  placeholder={intl.formatMessage({ defaultMessage: 'Document size...' })}
                  options={[{ value: 'bookpaper', label: 'Book paper' }, { value: 'hvs', label: 'HVS' }]}
                />
              </Form.Item>
              <Form.Item
                label={intl.formatMessage({ defaultMessage: 'Black-white pages count' })}
                name='numBwPages'
                tooltip='Jumlah halaman hitam putih'
                rules={[{ required: true, message: intl.formatMessage({ defaultMessage: 'Black-white pages is required!' }) }]}
              >
                <InputNumber
                  placeholder={intl.formatMessage({ defaultMessage: 'Black-white pages...' })}
                  min={0}
                  max={500}
                />
              </Form.Item>
              <Form.Item
                label={intl.formatMessage({ defaultMessage: 'Color pages count' })}
                name='numColorPages'
                tooltip='Jumlah halaman berwarna'
                rules={[{ required: true, message: intl.formatMessage({ defaultMessage: 'Color pages count is required!' }) }]}
              >
                <InputNumber
                  placeholder={intl.formatMessage({ defaultMessage: 'Black-white pages...' })}
                  min={0}
                  max={500}
                />
              </Form.Item>
              <Form.Item
                label={intl.formatMessage({ defaultMessage: 'Number of Copies' })}
                name='numCopies'
                tooltip='Jumlah cetak'
                rules={[{ required: true, message: intl.formatMessage({ defaultMessage: 'Number of copies is required!' }) }]}
              >
                <InputNumber
                  placeholder={intl.formatMessage({ defaultMessage: 'Number of copies...' })}
                  min={0}
                  max={1000}
                />
              </Form.Item>
              <Form.Item
                label={intl.formatMessage({ defaultMessage: 'Shipping method' })}
                name='shipping'
                tooltip='Jasa Pengiriman'
                rules={[{ required: true, message: intl.formatMessage({ defaultMessage: 'Shipping method is required!' }) }]}
              >
                <ShippingMethodInput publication={publication} />
              </Form.Item>
            </Col>
            <Col span={12}>
              {pricingSummary}
            </Col>
          </Row>
          )
        : (
          <Form.Item
            name='packageId'
            rules={[{ required: true, message: intl.formatMessage({ defaultMessage: 'Package is required!' }) }]}
          >
            <IndiePublishingPackagePicker />
          </Form.Item>
          )
      }

    </Form.Provider>
  )
}
