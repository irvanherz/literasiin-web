/* eslint-disable prefer-promise-reject-errors */
import { Col, Form, Input, InputNumber, List, Row, Select, Space } from 'antd'
import IndiePublishingPackagePicker from 'components/IndiePublishingPackagePicker'
import UserAddressInput from 'components/UserAddressInput'
import useConfigurationByName from 'hooks/useConfigurationByName'
import { useMemo } from 'react'
import { useIntl } from 'react-intl'
import StoryCoverInput from './StoryCoverInput'

const formatter = new Intl.NumberFormat('id-ID')

export default function PublicationForm () {
  const { data: dataConfig } = useConfigurationByName('publication-config')
  const config = dataConfig?.data?.value || {}
  const intl = useIntl()
  const type = Form.useWatch('type')

  const paperType = Form.useWatch('paperType')
  const numBwPages = Form.useWatch('numBwPages')
  const numColorPages = Form.useWatch('numColorPages')
  const numCopies = Form.useWatch('numCopies')

  const paperTypes: any[] = config?.paperTypes || []
  const paperTypeConfig = paperTypes.find(paper => paper.id === paperType)

  const pricingSummary = useMemo(() => {
    const bwPagePrice = paperTypeConfig?.bwPageUnitPrice || 0
    const colorPagePrice = paperTypeConfig?.colorPageUnitPrice || 0
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
              description={`${formatter.format(bwPagePrice)} x ${formatter.format(numBwPages || 0)}`}
            />
          </List.Item>
          <List.Item extra={formatter.format(colorPagesTotalPrice)}>
            <List.Item.Meta
              title="Halaman hitam putih"
              description={`${formatter.format(colorPagePrice)} x ${formatter.format(numColorPages || 0)}`}
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
              title={`${formatter.format(perCopyPrice)} x ${formatter.format(numCopies || 0)}`}
            />
          </List.Item>
        </List>
      </Space>
    )
  }, [paperType, numBwPages, numColorPages, numCopies, paperTypeConfig])

  const paperTypeOptions = paperTypes.map(paper => ({ value: paper.id, label: paper.name }))
  return (
    <Form.Provider>
      <Row gutter={16}>
        <Col span={6}>
          <Form.Item
            name='cover'
          >
            <StoryCoverInput />
          </Form.Item>
        </Col>
        <Col span={18}>
          <Form.Item
            label={intl.formatMessage({ defaultMessage: 'Book Title' })}
            name='title'
            tooltip="Judul buku sangat penting. Buat semenarik mungkin"
            rules={[{ required: true, message: intl.formatMessage({ defaultMessage: 'Book title is required!' }) }]}
          >
            <Input
              placeholder={intl.formatMessage({ defaultMessage: 'Book title...' })}
              maxLength={255}
            />
          </Form.Item>
          <Form.Item
            label={intl.formatMessage({ defaultMessage: 'Author' })}
            name='author'
            tooltip='Nama yang dicantumkan sebagai pengarang'
            rules={[{ required: true, message: intl.formatMessage({ defaultMessage: 'Book title is required!' }) }]}
          >
            <Input
              placeholder={intl.formatMessage({ defaultMessage: 'Book title...' })}
              maxLength={255}
            />
          </Form.Item>
          <Form.Item
            label={intl.formatMessage({ defaultMessage: 'Type' })}
            name='type'
            tooltip='Pilih penerbit buku'
            rules={[{ required: true, message: intl.formatMessage({ defaultMessage: 'Type is required!' }) }]}
          >
            <Select
              placeholder={intl.formatMessage({ defaultMessage: 'Type...' })}
              options={[
                { value: 'selfpub', label: 'Self Publishing' },
                { value: 'indie', label: 'Indie Publishing' }
              ]}
            />
          </Form.Item>
          <Form.Item
            label={intl.formatMessage({ defaultMessage: 'Royalty' })}
            name='royalty'
            tooltip='Royalti penjualan buku'
            rules={[{ required: true, message: intl.formatMessage({ defaultMessage: 'Royalty is required!' }) }]}
            >
            <InputNumber
              placeholder={intl.formatMessage({ defaultMessage: 'Royalty...' })}
              min={0}
              max={100}
              />
          </Form.Item>
          <Form.Item
            label={intl.formatMessage({ defaultMessage: 'Address' })}
            name='addressId'
            tooltip='Alamat pengiriman buku cetak'
            rules={[{ required: true, message: intl.formatMessage({ defaultMessage: 'Address is required!' }) }]}
          >
            <UserAddressInput />
          </Form.Item>
          {type === 'selfpub' && (
            <Space direction='vertical' style={{ width: '100%' }}>
              <div>
                <Form.Item
                  label={intl.formatMessage({ defaultMessage: 'Jenis kertas' })}
                  name='paperType'
                  tooltip='Jenis kertas untuk buku cetak'
                  rules={[{ required: true, message: intl.formatMessage({ defaultMessage: 'Paper type size is required!' }) }]}
                >
                  <Select
                    placeholder={intl.formatMessage({ defaultMessage: 'Paper type...' })}
                    options={paperTypeOptions}
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
              </div>
              <div>
                {pricingSummary}
              </div>
            </Space>
          )}
          {type === 'indie' && (
            <Form.Item
              name='packageId'
              rules={[{ required: true, message: intl.formatMessage({ defaultMessage: 'Package is required!' }) }]}
            >
              <IndiePublishingPackagePicker config={config} />
            </Form.Item>
          )}
        </Col>
      </Row>
    </Form.Provider>
  )
}
