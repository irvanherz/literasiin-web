import { Space, theme } from 'antd'
import useConfigurationByName from 'hooks/useConfigurationByName'
import { Helmet } from 'react-helmet'
import Layout from '../../components/Layout'
import ArticleList from './ArticleList'
import Faqs from './Faqs'
import Header from './Header'
import Kbs from './Kbs'
import Partners from './Partners'
import StoryList from './StoryList'
import Testimonials from './Testimonials'

export default function Home () {
  const { data } = useConfigurationByName('home-data')
  const config = data?.data?.value || {}
  const { token } = theme.useToken()

  return (
    <Layout.Default contentContainerStyle={{ background: token.colorBgContainer }}>
      <Space direction='vertical' style={{ width: '100%' }}>
        <Header />
        <StoryList />
        <ArticleList />
        <Kbs config={config} />
        <Testimonials config={config} />
        <Partners config={config}/>
        <Faqs config={config} />
      </Space>
      <Helmet>
        <title>Literasiin - Portal Menulis dan Menerbitkan Buku Jadi Lebih Menyenangkan!</title>
      </Helmet>
    </Layout.Default>
  )
}
