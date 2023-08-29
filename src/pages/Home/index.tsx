import { theme } from 'antd'
import useConfigurationByName from 'hooks/useConfigurationByName'
import analytics from 'libs/analytics'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import Layout from '../../components/Layout'
import ArticleList from './ArticleList'
import Header from './Header'
import Kbs from './Kbs'
import Partners from './Partners'
import StoryList from './StoryList'
import StorytellingList from './StorytellingList'
import Testimonials from './Testimonials'

export default function Home () {
  const { data } = useConfigurationByName('home-data')
  const config = data?.data?.value || {}
  const { token } = theme.useToken()

  useEffect(() => {
    analytics.page({
      title: 'Literasiin - Portal Menulis dan Menerbitkan Buku Jadi Lebih Menyenangkan!',
      url: window.location.href
    })
  }, [])

  return (
    <Layout.Default
      contentContainerStyle={{ background: token.colorBgContainer }}
    >
      <Header />
      <StoryList />
      <StorytellingList />
      <ArticleList />
      <Kbs config={config} />
      <Testimonials config={config} />
      <Partners config={config}/>
      <Helmet>
        <title>Literasiin - Portal Menulis dan Menerbitkan Buku Jadi Lebih Menyenangkan!</title>
      </Helmet>
    </Layout.Default>
  )
}
