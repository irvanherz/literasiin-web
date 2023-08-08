import { Tabs } from 'antd'
import Layout from 'components/Layout'
import PageWidthAdapter from 'components/PageWidthAdapter'
import RouteGuard from 'components/RouteGuard'
import useStorytellingCategories from 'hooks/useStorytellingCategories'
import analytics from 'libs/analytics'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import StorytellingsPerCategory from './StorytellingsPerCategory'

export default function StorytellingExplore () {
  const { data: categoriesData } = useStorytellingCategories()
  const categories: any[] = categoriesData?.data || []

  useEffect(() => {
    analytics.page({
      title: 'Explore Storytellings',
      url: window.location.href
    })
  }, [])

  return (
    <RouteGuard require='authenticated'>
      <Layout.Default>
        <PageWidthAdapter>
          <Tabs destroyInactiveTabPane>
            <Tabs.TabPane tab="All" tabKey="recommendations" key='recommendations'>
              <StorytellingsPerCategory />
            </Tabs.TabPane>
            {categories.map(category => (
              <Tabs.TabPane tab={category.name} tabKey={category.id} key={category.id}>
                <StorytellingsPerCategory category={category} />
              </Tabs.TabPane>
            ))}
          </Tabs>
        </PageWidthAdapter>
        <Helmet>
          <title>Explore Storytellings - Literasiin</title>
        </Helmet>
      </Layout.Default>
    </RouteGuard>

  )
}
