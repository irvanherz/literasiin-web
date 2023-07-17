import { SaveOutlined } from '@ant-design/icons'
import { Button, Card, Col, Form, message, Row, Space } from 'antd'
import StoryForm from 'components/shared/StoryForm'
import { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import StoriesService from 'services/Stories'
import StoryCoverInput from './StoryCoverInput'

type ChaptersTabProps = { story: any }

export default function ChaptersTab ({ story }: ChaptersTabProps) {
  const storyId = story?.id
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const updater = useMutation<any, any, any>(payload => StoriesService.updateById(storyId, payload))

  const initialValues = story

  useEffect(() => {
    form.resetFields()
  }, [initialValues])

  const handleSubmit = (values: any) => {
    const { cover, ...payload } = values
    payload.coverId = cover?.id
    updater.mutate(payload, {
      onSuccess: () => {
        navigate('/stories/mine')
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
            <StoryCoverInput />
          </Form.Item>
        </Col>
        <Col span={16}>
          <Card>
            <Space direction='vertical' style={{ width: '100%' }}>
              <StoryForm story={story} />
              <Button
                type='primary'
                onClick={form.submit}
                loading={updater.isLoading}
                icon={<SaveOutlined />}
              >
                <FormattedMessage defaultMessage="Update Story" />
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </Form>
  )
}
