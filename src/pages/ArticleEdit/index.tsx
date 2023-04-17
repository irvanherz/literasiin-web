import { Dropdown, Form, message } from 'antd'
import Layout from 'components/Layout'
import RouteGuard from 'components/RouteGuard'
import useArticle from 'hooks/useArticle'
import useArticleUpdate from 'hooks/useArticleUpdate'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { FormattedMessage } from 'react-intl'
import { useNavigate, useParams } from 'react-router-dom'
import CustomArticleForm from './CustomArticleForm'

export default function ArticleEdit () {
  const params = useParams()
  const articleId = +(params.articleId || 0)
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const { data, refetch } = useArticle(articleId)
  const updater = useArticleUpdate(articleId)
  const article = data?.data

  const initialValues = article

  useEffect(() => {
    form.resetFields()
  }, [initialValues])

  const handlePublish = async () => {
    try {
      const values: any = await form.validateFields()
      values.imageId = values?.image?.id
      delete values.image
      values.status = 'published'
      updater.mutate(values, {
        onSuccess: (data) => {
          message.success('Article published successfully')
          navigate(`/articles/${articleId}`)
        },
        onError: (err) => {
          message.error(err.message)
        }
      })
    } catch (err) {
      message.error('Check all fields then try again')
    }
  }

  const handleRevertToDraft = async () => {
    try {
      const values: any = await form.validateFields()
      values.imageId = values?.image?.id
      delete values.image
      values.status = 'draft'
      updater.mutate(values, {
        onSuccess: (data) => {
          message.success('Article reverted to draft')
          refetch()
        },
        onError: (err) => {
          message.error(err.message)
        }
      })
    } catch (err) {
      message.error('Check all fields then try again')
    }
  }

  const handleSave = async () => {
    try {
      const values: any = await form.validateFields()
      values.imageId = values?.image?.id
      delete values.image
      updater.mutate(values, {
        onSuccess: (data) => {
          message.success('Changes has saved')
          refetch()
        },
        onError: (err) => {
          message.error(err.message)
        }
      })
    } catch (err) {
      message.error('Check all fields then try again')
    }
  }

  return (
    <RouteGuard require='authenticated'>
      <Layout.Default>
        <Layout.Scaffold
          title={<FormattedMessage defaultMessage="Edit Article" />}
          description={<FormattedMessage defaultMessage="Update information about your article below" />}
          bodyStyle={{ padding: '16px 0' }}
          actions={[
            <Dropdown.Button
              key='save'
              type='primary'
              onClick={handleSave}
              menu={{
                items: [
                  { key: 'save', label: 'Save', onClick: handleSave },
                  article?.status === 'published'
                    ? { key: 'rev', label: 'Save & Revert to Draft', onClick: handleRevertToDraft }
                    : { key: 'pub', label: 'Save & Publish', onClick: handlePublish }
                ]
              }}
            >
              Save
            </Dropdown.Button>
          ]}
        >
          <Form
            form={form}
            initialValues={initialValues}
            wrapperCol={{ span: 24 }}
            labelCol={{ span: 24 }}
          >
            <CustomArticleForm />
          </Form>
        </Layout.Scaffold>
        <Helmet>
          <title>Edit Article - Literasiin</title>
        </Helmet>
      </Layout.Default>
    </RouteGuard>
  )
}
