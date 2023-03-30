/* eslint-disable prefer-promise-reject-errors */
import { Affix, Card, Col, Divider, Form, Input, Row, Select } from 'antd'
import { useState } from 'react'

const FORM_ITEM_HELPS = {
  default: {
    title: 'Publishing',
    description: 'Publish your book in an affordable price'
  },
  title: {
    title: 'Book Title',
    description: 'Judul buku sangat penting. Buat semenarik mungkin'
  },
  author: {
    title: 'Author',
    description: 'Nama buku yang dicantumkan sebagai pengarang'
  },
  type: {
    title: 'Type',
    description: 'Pilih penerbit buku'
  },
  address: {
    title: 'Address',
    description: 'Ini adalah alamat'
  },
  size: {
    title: 'Document Size',
    description: 'Ini adalah doccsz'
  }
}

export default function PublicationForm () {
  const [activeFormItem, setActiveFormItem] = useState<keyof typeof FORM_ITEM_HELPS>('default')
  const activeHelp = FORM_ITEM_HELPS[activeFormItem] || FORM_ITEM_HELPS.default

  return (
    <Form.Provider>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Book Title"
            name='title'
            rules={[{ required: true, message: 'Book title is required' }]}
      >
            <Input
              placeholder="Book title..."
              maxLength={255}
              onFocus={() => setActiveFormItem('title')}
            />
          </Form.Item>
          <Form.Item
            label="Author"
            name='author'
            rules={[{ required: true, message: 'Book title is required' }]}
          >
            <Input
              placeholder="Book title..."
              maxLength={255}
              onFocus={() => setActiveFormItem('author')}
            />
          </Form.Item>
          <Form.Item
            label="Type"
            name='type'
            rules={[{ required: true, message: 'Type is required' }]}
          >
            <Select
              placeholder="Type..."
              options={[
                { value: 'self-publishing', label: 'Self Publishing' },
                { value: 'indie-publishing', label: 'Indie Publishing' }
              ]}
              onFocus={() => setActiveFormItem('type')}
            />
          </Form.Item>
          <Form.Item
            label="Address"
            name='address'
            rules={[{ required: true, message: 'Address is required' }]}
          >
            <Input
              placeholder="Address..."
              maxLength={255}
              onFocus={() => setActiveFormItem('address')}
            />
          </Form.Item>
          <Divider />
          <Form.Item
            label="Document size"
            name='size'
            rules={[{ required: true, message: 'Document size is required' }]}
          >
            <Select
              placeholder="Document size..."
              options={[{ value: 'a4', label: 'A4 (21 x 29.7cm)' }, { value: 'a5', label: 'A5 (13 x 19cm)' }]}
              onFocus={() => setActiveFormItem('size')}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Affix offsetTop={76}>
            <Card>
              <Card.Meta
                title={activeHelp?.title}
                description={activeHelp?.description}
              />
            </Card>
          </Affix>
        </Col>
      </Row>
    </Form.Provider>
  )
}
