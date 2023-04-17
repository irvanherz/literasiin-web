import { Col, Row } from 'antd'
import ArticleImage from 'components/ArticleImage'
import Layout from 'components/Layout'
import PageWidthAdapter from 'components/PageWidthAdapter'
import useArticle from 'hooks/useArticle'
import useArticleContext from 'hooks/useArticleContext'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useMutation } from 'react-query'
import { useParams } from 'react-router-dom'
import ArticlesService from 'services/Articles'
import styled from 'styled-components'
import ArticleFooter from './ArticleFooter'
import ArticleHeader from './ArticleHeader'

const Wrapper = styled.div`
padding: 24px 0;
`

export default function ArticleDetails () {
  const params = useParams()
  const articleId = +(params?.articleId || 0)
  const { data, refetch } = useArticle(articleId)
  const { data: contextData, refetch: refetchContext } = useArticleContext(articleId)
  const article: any = data?.data
  const context: any = contextData?.data
  const viewer = useMutation(() => ArticlesService.Readers.track(articleId))
  useEffect(() => {
    if (articleId) viewer.mutate()
  }, [articleId])

  const handleAfterUpdated = () => {
    refetch()
    refetchContext()
  }

  return (
    <Layout.Default style={{ background: '#FFF' }}>
      <PageWidthAdapter style={{ maxWidth: 920 }}>
        <Wrapper>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <ArticleHeader article={article} />
            </Col>
            <Col span={24}>
              <ArticleImage article={article} containerStyle={{ borderRadius: 8, overflow: 'hidden' }} />
            </Col>
            <Col span={24}>
              <div dangerouslySetInnerHTML={{ __html: article?.content }}></div>
            </Col>
            <Col span={24}>
              <ArticleFooter article={article} context={context} afterUpdated={handleAfterUpdated} />
            </Col>
          </Row>
        </Wrapper>
      </PageWidthAdapter>
      <Helmet>
        <title>{article?.title ? `${article.title} - Literasiin` : 'Literasiin'}</title>
      </Helmet>
    </Layout.Default>
  )
}
