import { BankOutlined, MailOutlined, PhoneOutlined, SendOutlined } from '@ant-design/icons'
import { Button, Card, Col, Form, List, Modal, Row, Space, Typography, message, theme } from 'antd'
import Layout from 'components/Layout'
import useGeneralUserMessageCreate from 'hooks/useGeneralUserMessageCreate'
import { useCallback } from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import ContactForm from './ContactForm'

export default function ContactUs () {
  const { executeRecaptcha } = useGoogleReCaptcha()
  const { token } = theme.useToken()
  const creator = useGeneralUserMessageCreate()
  const [form] = Form.useForm()

  // Create an event handler so you can call the verification on button click event or form submit
  const handleRecaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      console.log('Execute recaptcha not yet available')
      return
    }

    const token = await executeRecaptcha('yourAction')
    return token
    // Do whatever you want with the token
  }, [executeRecaptcha])

  const handleFinish = async (payload: any) => {
    const captchaToken = await handleRecaptchaVerify()
    if (!captchaToken) message.error('Captcha validation failed!')
    payload.captchaToken = captchaToken
    creator.mutate(payload, {
      onSuccess: data => {
        // form.resetFields()
        Modal.success({
          title: 'Success',
          content: 'Your message already sent. We will response your message to your email or phone after 1-3 business days.',
          centered: true
        })
      },
      onError: (err) => {
        message.error(err.message)
      }
    })
  }

  const handleValidationFailed = (payload: any) => {
    message.error('Check all fields and then try again')
  }

  return (

    <Layout.Default>
      <Layout.Scaffold
        title="Contact Us"
        description="Send your question"
        bodyStyle={{ padding: '24px 0' }}
        >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={10} lg={8} xl={8} xxl={8}>
            <Card>
              <Typography.Title level={2} style={{ fontSize: token.fontSizeXL, marginTop: 0 }}>Contact Info</Typography.Title>
              <List size='small'>
                <List.Item>
                  <List.Item.Meta
                    avatar={<BankOutlined />}
                    title="Office"
                    description="Jl Pembangunan no 20, Petojo Utara, Gambir, Kota Jakarta Pusat, DKI Jakarta"
                    />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    avatar={<PhoneOutlined />}
                    title="Phone"
                    description="+62 85156818651"
                    />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    avatar={<MailOutlined />}
                    title="Email"
                    description="cs@literasiin.com"
                    />
                </List.Item>
              </List>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={14} lg={16} xl={16} xxl={16}>
            <Card>
              <Space direction='vertical' style={{ width: '100%' }}>
                <Typography.Title level={2} style={{ fontSize: token.fontSizeXL, marginTop: 0 }}>Send a Message</Typography.Title>
                <Form form={form} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} onFinish={handleFinish} onFinishFailed={handleValidationFailed}>
                  <ContactForm />
                </Form>
                <Button type='primary' icon={<SendOutlined />} onClick={form.submit} loading={creator.isLoading}>Send</Button>
              </Space>
            </Card>
          </Col>
        </Row>
      </Layout.Scaffold>
    </Layout.Default>
  )
}
