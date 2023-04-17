import { PlusOutlined } from '@ant-design/icons'
import { Button, Tabs } from 'antd'
import Layout from 'components/Layout'
import RouteGuard from 'components/RouteGuard'
import { Helmet } from 'react-helmet'
import { FormattedMessage } from 'react-intl'
import ArticlesAny from './ArticlesAny'
import ArticlesPublished from './ArticlesPublished'
import CreateArticleButton from './CreateArticleButton'

export default function ArticleListMine () {
  return (
    <RouteGuard require='authenticated'>
      <Layout.Default>
        <Layout.Scaffold
          title={<FormattedMessage defaultMessage="My Articles" />}
          description={<FormattedMessage defaultMessage="List of all my articles" />}
          actions={[
            <CreateArticleButton key='crt'>
              <Button icon={<PlusOutlined />} type='primary'><FormattedMessage defaultMessage="New Article" /></Button>
            </CreateArticleButton>
          ]}
      >
          <Tabs destroyInactiveTabPane>
            <Tabs.TabPane tab={<FormattedMessage defaultMessage="All Articles" />} tabKey="all" key='all'>
              <ArticlesAny />
            </Tabs.TabPane>
            <Tabs.TabPane tab={<FormattedMessage defaultMessage="Published" />} tabKey="published" key='published'>
              <ArticlesPublished />
            </Tabs.TabPane>
          </Tabs>
        </Layout.Scaffold>
        <Helmet>
          <title>My Articles - Literasiin</title>
        </Helmet>
      </Layout.Default>
    </RouteGuard>
  )
}
