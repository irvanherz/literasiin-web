import { Col, Row } from 'antd'
import Layout from 'components/Layout'
import StoryEditor from 'components/LexicalEditor/StoryEditor'
import PageWidthAdapter from 'components/PageWidthAdapter'
import { Helmet } from 'react-helmet'
import PopularStorytellers from './PopularStorytellers'
import PopularStorytellings from './PopularStorytellings'

export default function StorytellingExplore () {
  return (
  // <RouteGuard require='authenticated'>
    <Layout.Default>
      <PageWidthAdapter>
        <div>Header</div>
        <Row gutter={[16, 16]}>
          <Col span={24}><StoryEditor /></Col>
          <Col span={18}><PopularStorytellings /></Col>
          <Col span={6}><PopularStorytellers /></Col>
        </Row>
      </PageWidthAdapter>
      <Helmet>
        <title>My Stories - Literasiin</title>
      </Helmet>
    </Layout.Default>
  // </RouteGuard>
  )
}
