import { SaveOutlined } from '@ant-design/icons'
import { Button, Card, Col, Form, message, Row, Space } from 'antd'
import StorytellingForm from 'components/shared/StorytellingForm'
import { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import StorytellingsService from 'services/Storytellings'
import StorytellingCoverInput from './StorytellingCoverInput'

type StorytellingDetailsEditTabProps = { storytelling: any }
export default function StorytellingDetailsEditTab ({ storytelling }: StorytellingDetailsEditTabProps) {
  const storytellingId = storytelling?.id
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const updater = useMutation<any, any, any>(payload => StorytellingsService.updateById(storytellingId, payload))

  const initialValues = storytelling

  useEffect(() => {
    form.resetFields()
  }, [initialValues])

  const handleSubmit = (values: any) => {
    const { cover, ...payload } = values
    payload.coverId = cover?.id
    updater.mutate(payload, {
      onSuccess: () => {
        navigate('/storytellings/mine')
      },
      onError: (err: any) => {
        message.error(err?.message)
      }
    })
  }

  const handleValidationFailed = () => {
    message.error('Cheack all fields and then try again')
  }

  return (
    <Form
      form={form}
      initialValues={initialValues}
      wrapperCol={{ span: 24 }}
      labelCol={{ span: 24 }}
      onFinish={handleSubmit}
      onFinishFailed={handleValidationFailed}
    >
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Form.Item name="cover">
            <StorytellingCoverInput />
          </Form.Item>
        </Col>
        <Col span={16}>
          <Card>
            <Space direction='vertical' style={{ width: '100%' }}>
              <StorytellingForm storytelling={storytelling} />
              <Button
                type='primary'
                onClick={form.submit}
                loading={updater.isLoading}
                icon={<SaveOutlined />}
              >
                <FormattedMessage defaultMessage="Update Storytelling" />
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </Form>
  )
}
