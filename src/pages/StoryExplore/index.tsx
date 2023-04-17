import { Tabs } from 'antd'
import Layout from 'components/Layout'
import PageWidthAdapter from 'components/PageWidthAdapter'
import RouteGuard from 'components/RouteGuard'
import useStoryCategories from 'hooks/useStoryCategories'
import { Helmet } from 'react-helmet'
import StoriesPerCategory from './StoriesPerCategory'

export default function StoryExplore () {
  const { data: categoriesData } = useStoryCategories()
  const categories: any[] = categoriesData?.data || []

  return (
    <RouteGuard require='authenticated'>
      <Layout.Default>
        <PageWidthAdapter>
          <Tabs destroyInactiveTabPane>
            <Tabs.TabPane tab="All" tabKey="recommendations" key='recommendations'>
              <StoriesPerCategory />
            </Tabs.TabPane>
            {categories.map(category => (
              <Tabs.TabPane tab={category.name} tabKey={category.id} key={category.id}>
                <StoriesPerCategory category={category} />
              </Tabs.TabPane>
            ))}
          </Tabs>
        </PageWidthAdapter>
        <Helmet>
          <title>My Stories - Literasiin</title>
        </Helmet>
      </Layout.Default>
    </RouteGuard>

  )
}
