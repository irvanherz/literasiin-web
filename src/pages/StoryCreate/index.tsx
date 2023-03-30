import { PlusOutlined } from '@ant-design/icons'
import { Button, Card, Col, Form, message, Row, Space } from 'antd'
import Layout from 'components/Layout'
import RouteGuard from 'components/RouteGuard'
import { Helmet } from 'react-helmet'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import StoriesService from 'services/Stories'
import StoryCoverInput from './StoryCoverInput'
import StoryForm from './StoryForm'

export default function StoryCreate () {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const creator = useMutation<any, any, any>(StoriesService.create)

  const handleSubmit = (values: any) => {
    const { cover, ...payload } = values
    payload.coverId = cover?.id
    creator.mutate(payload, {
      onSuccess: () => {
        navigate('/stories/mine')
      }
    })
  }

  const handleValidationFailed = () => {
    message.error('Cheack all fields and then try again')
  }

  return (
    <RouteGuard require='authenticated'>
      <Layout.Default>
        <Layout.Scaffold
          title="Create Story"
          description="Fill information about your story below"
          bodyStyle={{ padding: '16px 0' }}
        >
          <Form
            form={form}
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
                    <StoryForm />
                    <Button
                      type='primary'
                      onClick={form.submit}
                      loading={creator.isLoading}
                      icon={<PlusOutlined />}
                    >
                      Create Story
                    </Button>
                  </Space>
                </Card>
              </Col>
            </Row>
          </Form>
        </Layout.Scaffold>
        <Helmet>
          <title>Create new Story - Literasiin</title>
        </Helmet>
      </Layout.Default>
    </RouteGuard>
  )
}
