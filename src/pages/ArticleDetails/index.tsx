import { Col, Row, Space, Typography } from 'antd'
import ArticleImage from 'components/ArticleImage'
import Layout from 'components/Layout'
import PageWidthAdapter from 'components/PageWidthAdapter'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import ArticlesService from 'services/Articles'

export default function ArticleDetails () {
  const params = useParams()
  const articleId = +(params?.articleId || 0)
  const { data } = useQuery<any, any, any>(`articles[${articleId}]`, () => ArticlesService.findById(articleId))
  const article = data?.data

  return (
    <Layout.Default>
      <PageWidthAdapter style={{ maxWidth: 920 }}>
        <div style={{ padding: '24px 0' }}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Space direction='vertical' style={{ width: '100%', textAlign: 'center' }}>
                <Typography.Title level={2}>{article?.title}</Typography.Title>
                <Typography.Paragraph>{article?.description}</Typography.Paragraph>
              </Space>
            </Col>
            <Col span={24}>
              <ArticleImage article={article} containerStyle={{ borderRadius: 8, overflow: 'hidden' }} />
            </Col>
            <Col span={24}>
              <div dangerouslySetInnerHTML={{ __html: article?.content }}></div>
            </Col>
          </Row>
        </div>
      </PageWidthAdapter>
    </Layout.Default>
  )
}
