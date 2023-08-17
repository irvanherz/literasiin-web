import { Col, Row, theme } from 'antd'
import ArticleImage from 'components/ArticleImage'
import Layout from 'components/Layout'
import PageWidthAdapter from 'components/PageWidthAdapter'
import useArticle from 'hooks/useArticle'
import useArticleContext from 'hooks/useArticleContext'
import analytics from 'libs/analytics'
import { contentIdFromSlug } from 'libs/slug'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useMutation } from 'react-query'
import { useLocation, useParams } from 'react-router-dom'
import { Element, scroller } from 'react-scroll'
import ArticlesService from 'services/Articles'
import styled from 'styled-components'
import ArticleComments from './ArticleComments'
import ArticleFooter from './ArticleFooter'
import ArticleHeader from './ArticleHeader'

const Wrapper = styled.div`
padding: 24px 0;
`

export default function ArticleDetails () {
  const { token } = theme.useToken()
  const params = useParams()
  const { hash } = useLocation()
  const articleId = contentIdFromSlug(params?.articleId || '')
  const { status, data, refetch } = useArticle(articleId)
  const { data: contextData, refetch: refetchContext } = useArticleContext(articleId)
  const article: any = data?.data
  const context: any = contextData?.data
  const viewer = useMutation(() => ArticlesService.Readers.track(articleId))

  useEffect(() => {
    if (articleId) viewer.mutate()
  }, [articleId])

  useEffect(() => {
    analytics.page({
      title: article?.title ? `${article.title} - Literasiin` : 'Literasiin',
      url: window.location.href
    })
  }, [article])

  useEffect(() => {
    if (hash === '#comments' && status === 'success') {
      scroller.scrollTo('comments', { delay: 300 })
    }
  }, [status, hash])

  const handleAfterUpdated = () => {
    refetch()
    refetchContext()
  }

  return (
    <Layout.Default style={{ background: token.colorBgBase }}>
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
            <Col span={24}>
              <Element name='comments'>
                <ArticleComments article={article} />
              </Element>
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
