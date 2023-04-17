import { SearchOutlined } from '@ant-design/icons'
import { Button, Col, List, Row, Typography } from 'antd'
import PageWidthAdapter from 'components/PageWidthAdapter'
import StoryCard from 'components/StoryCard'
import { useIntl } from 'react-intl'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import StoriesService from 'services/Stories'

export default function StoryList () {
  const intl = useIntl()
  const { data } = useQuery('stories.latest', () => StoriesService.findMany({ limit: 20 }))
  const stories: any[] = data?.data || []

  return (
    <PageWidthAdapter style={{ marginTop: -64 }}>
      <Row gutter={[16, 16]} style={{ width: '100%' }}>
        <Col span={24}>
          <List
            grid={{ gutter: 16, xs: 2, sm: 4, md: 4, lg: 5, xl: 5, xxl: 5 }}
            dataSource={stories}
            renderItem={story => (
              <List.Item>
                <StoryCard story={story} />
              </List.Item>
            )}
          />
        </Col>
        <Col span={24} style={{ textAlign: 'center' }}>
          <Link to='/stories/explore'>
            <Button type='primary' icon={<SearchOutlined />}>{intl.formatMessage({ defaultMessage: 'Browse more stories' })}</Button>
          </Link>
        </Col>
        <Col span={24} style={{ textAlign: 'center' }}>
          <Typography.Paragraph type='secondary'>Literasiin berkomitmen untuk menjadi wadah inspirasi, ide, dan konsistensi menulismu lebih menyenangkan. <br />Bersama Literasiin, mulai tulisan pertamamu sekarang! </Typography.Paragraph>
        </Col>
      </Row>
    </PageWidthAdapter>

  )
}
