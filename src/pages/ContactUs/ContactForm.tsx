import { Col, Form, Input, Row } from 'antd'

export default function ContactForm () {
  return (
    <Form.Provider>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            name='firstName'
            label="First Name"
            rules={[{ required: true, message: 'First name is required!' }]}
          >
            <Input placeholder="Your first name..."/>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name='lastName'
            label="Last Name"
            rules={[{ required: true, message: 'Last name is required!' }]}
            >
            <Input placeholder="Your last name..."/>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name='email'
            label="Email"
            rules={[{ required: true, message: 'Email is required!' }]}
          >
            <Input placeholder="Your email..."/>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name='phone'
            label="Phone"
            >
            <Input placeholder="Your phone..."/>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            name='message'
            label="Message"
            rules={[{ required: true, message: 'Message is required!' }]}
          >
            <Input.TextArea placeholder="Message..."/>
          </Form.Item>
        </Col>
      </Row>
    </Form.Provider>
  )
}
