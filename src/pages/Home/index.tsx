import { Space } from 'antd'
import { useQuery } from 'react-query'
import ConfigurationsService from 'services/Configurations'
import Layout from '../../components/Layout'
import ArticleList from './ArticleList'
import Banner from './Banner'
import Faqs from './Faqs'
import Partners from './Partners'
import StoryList from './StoryList'
import Testimonials from './Testimonials'

export default function Home () {
  const { data } = useQuery('configurations[home-data]', () => ConfigurationsService.findByName('home-data'))
  const config = data?.data?.value || {}

  return (
    <Layout.Default>
      <Space direction='vertical' style={{ width: '100%' }}>
        <Banner />
        <StoryList />
        <ArticleList />
        <Testimonials config={config} />
        <Partners config={config}/>
        <Faqs config={config} />
      </Space>
    </Layout.Default>
  )
}
