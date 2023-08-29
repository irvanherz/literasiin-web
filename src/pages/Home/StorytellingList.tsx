import { SearchOutlined } from '@ant-design/icons'
import { Button, Col, List, Row, Typography, theme } from 'antd'
import PageWidthAdapter from 'components/PageWidthAdapter'
import StorytellingCard from 'components/StorytellingCard'
import useStorytellings from 'hooks/useStorytellings'
import { useIntl } from 'react-intl'
import { Link } from 'react-router-dom'

export default function StorytellingList () {
  const { token } = theme.useToken()
  const intl = useIntl()
  const { data } = useStorytellings({ limit: 20 })
  const storytellings: any[] = data?.data || []

  return storytellings.length
    ? (
      <div style={{ padding: '24px 0', background: token.colorSuccessBgHover }}>
        <PageWidthAdapter>
          <Row gutter={[16, 16]} style={{ width: '100%' }}>
            <Col span={24}>
              <Typography.Text style={{ fontWeight: 900, display: 'block', fontSize: token.fontSizeXL }}>Tidak Ada Waktu Membaca?</Typography.Text>
              <Typography.Text>Pasang earphone. Ada koleksi cerita yang bisa kamu dengarkan sambil bersantai.</Typography.Text>
            </Col>
            <Col span={24}>
              <List
                grid={{ gutter: 16, xs: 2, sm: 4, md: 4, lg: 5, xl: 5, xxl: 5 }}
                dataSource={storytellings}
                renderItem={storytelling => (
                  <List.Item>
                    <StorytellingCard storytelling={storytelling} />
                  </List.Item>
                )}
            />
            </Col>
            <Col span={24} style={{ textAlign: 'center' }}>
              <Link to='/storytellings/explore'>
                <Button type='primary' icon={<SearchOutlined />}>{intl.formatMessage({ defaultMessage: 'Browse more storytellings' })}</Button>
              </Link>
            </Col>
          </Row>
        </PageWidthAdapter>
      </div>
      )
    : null
}
