import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html'
import { Card, Col, Dropdown, Form, Input, Row, Select, message } from 'antd'
import Layout from 'components/Layout'
import StoryEditor from 'components/LexicalEditor/StoryEditor'
import RouteGuard from 'components/RouteGuard'
import ArticleImageInput from 'components/shared/ArticleImageInput'
import useArticle from 'hooks/useArticle'
import useArticleCategories from 'hooks/useArticleCategories'
import useArticleUpdate from 'hooks/useArticleUpdate'
import { $getRoot, $isDecoratorNode, $isElementNode, LexicalEditor } from 'lexical'
import analytics from 'libs/analytics'
import { contentIdFromSlug, slugifyContentId } from 'libs/slug'
import { useEffect, useLayoutEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { FormattedMessage, useIntl } from 'react-intl'
import { useNavigate, useParams } from 'react-router-dom'

export default function ArticleEdit () {
  const intl = useIntl()
  const params = useParams()
  const articleId = contentIdFromSlug(params.articleId || '')
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const { data, refetch } = useArticle(articleId)
  const updater = useArticleUpdate(articleId)
  const article = data?.data
  const [editor, setEditor] = useState<LexicalEditor>()

  const { data: categoryData } = useArticleCategories({})
  const categories = categoryData?.data || []
  const categoryOptions: any[] = categories.map((cat: any) => ({ value: cat.id, label: cat.name }))

  useEffect(() => {
    analytics.page({
      title: 'Edit Article - Literasiin',
      url: window.location.href
    })
  }, [])

  useLayoutEffect(() => {
    if (!article || !editor) return
    form.setFieldsValue({ ...article })
    editor.update(() => {
      // In the browser you can use the native DOMParser API to parse the HTML string.
      const parser = new DOMParser()
      const dom = parser.parseFromString(article?.content || '', 'text/html')
      // Once you have the DOM instance it's easy to generate LexicalNodes.
      const nodes = $generateNodesFromDOM(editor!, dom)
      // Select the root
      const root = $getRoot()
      root.clear()
      nodes.forEach((n) => {
        if ($isElementNode(n) || $isDecoratorNode(n)) {
          root.append(n)
        }
      })
    })
  }, [article])

  const handlePublish = async () => {
    try {
      const values: any = await form.validateFields()
      values.imageId = values?.image?.id
      delete values.image
      values.status = 'published'

      const content = await new Promise((resolve) => {
        const editorState = editor!.getEditorState()
        editorState.read(() => {
          const content = $generateHtmlFromNodes(editor!)
          resolve(content)
        })
      })
      values.content = content

      updater.mutate(values, {
        onSuccess: (data) => {
          message.success('Article published successfully')
          navigate(`/articles/${slugifyContentId(article)}`)
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

      const content = await new Promise((resolve) => {
        const editorState = editor!.getEditorState()
        editorState.read(() => {
          const content = $generateHtmlFromNodes(editor!)
          resolve(content)
        })
      })
      values.content = content

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

      const content = await new Promise((resolve) => {
        const editorState = editor!.getEditorState()
        editorState.read(() => {
          const content = $generateHtmlFromNodes(editor!)
          resolve(content)
        })
      })
      values.content = content

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
            wrapperCol={{ span: 24 }}
            labelCol={{ span: 24 }}
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={16} lg={18} xl={18} xxl={18}>
                <Card>
                  <Form.Item
                    label={<FormattedMessage defaultMessage="Title" />}
                    name='title'
                    rules={[{ required: true, message: intl.formatMessage({ defaultMessage: 'Title is required!' }) }]}
                  >
                    <Input placeholder={intl.formatMessage({ defaultMessage: 'Title...' })} maxLength={255} />
                  </Form.Item>
                  <Form.Item
                    label={<FormattedMessage defaultMessage="Description" />}
                    name='description'
                  >
                    <Input.TextArea cols={5} placeholder={intl.formatMessage({ defaultMessage: 'Description...' })} maxLength={255} />
                  </Form.Item>
                  <Form.Item
                    noStyle
                    label={<FormattedMessage defaultMessage="Content" />}
                    name='content'
                  >
                    <StoryEditor onReady={setEditor} />
                  </Form.Item>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6}>
                <Card>
                  <Form.Item
                    label={<FormattedMessage defaultMessage="Category" />}
                    name="categoryId"
                  >
                    <Select placeholder={intl.formatMessage({ defaultMessage: 'Select category...' })} options={categoryOptions}/>
                  </Form.Item>
                  <Form.Item
                    label={<FormattedMessage defaultMessage="Image" />}
                    name='image'
                    rules={[{ required: true, message: intl.formatMessage({ defaultMessage: 'Image is required!' }) }]}
                  >
                    <ArticleImageInput />
                  </Form.Item>
                </Card>
              </Col>
            </Row>
          </Form>
        </Layout.Scaffold>
        <Helmet>
          <title>Edit Article - Literasiin</title>
        </Helmet>
      </Layout.Default>
    </RouteGuard>
  )
}
