/* eslint-disable prefer-promise-reject-errors */
import { Col, Divider, Form, Input, InputNumber, Row, Select } from 'antd'
import { useIntl } from 'react-intl'
import StoryCoverInput from './StoryCoverInput'

export default function PublicationForm () {
  const intl = useIntl()
  return (
    <Form.Provider>
      <Row gutter={16}>
        <Col span={16}>
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
                { value: 'self-publishing', label: 'Self Publishing' },
                { value: 'indie-publishing', label: 'Indie Publishing' }
              ]}
            />
          </Form.Item>
          <Form.Item
            label={intl.formatMessage({ defaultMessage: 'Address' })}
            name='address'
            tooltip='Alamat pengiriman buku cetak'
            rules={[{ required: true, message: intl.formatMessage({ defaultMessage: 'Address is required!' }) }]}
          >
            <Input
              placeholder={intl.formatMessage({ defaultMessage: 'Address...' })}
              maxLength={255}
            />
          </Form.Item>
          <Divider />
          <Form.Item
            label={intl.formatMessage({ defaultMessage: 'Document size' })}
            name='size'
            tooltip='Ukuran buku cetak'
            rules={[{ required: true, message: intl.formatMessage({ defaultMessage: 'Document size is required!' }) }]}
          >
            <Select
              placeholder={intl.formatMessage({ defaultMessage: 'Document size...' })}
              options={[{ value: 'a4', label: 'A4 (21 x 29.7cm)' }, { value: 'a5', label: 'A5 (13 x 19cm)' }]}
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
              max={1000}
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
              max={1000}
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
              max={100000}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name='cover'
          >
            <StoryCoverInput />
          </Form.Item>
        </Col>
      </Row>
    </Form.Provider>
  )
}
