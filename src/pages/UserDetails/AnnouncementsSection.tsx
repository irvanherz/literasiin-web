import { Card, List, Space, Typography } from 'antd'
import useArticles from 'hooks/useArticles'
import useConfigurationByName from 'hooks/useConfigurationByName'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

type AnnouncementListItemProps = {announcement: any}
function AnnouncementListItem ({ announcement }: AnnouncementListItemProps) {
  return (
    <List.Item>
      <Link to={`/articles/${announcement.id}`}>
        <Card style={{ width: '100%' }}>
          <Typography.Paragraph style={{ margin: 0 }} ellipsis={{ rows: 1 }}>{announcement.title}</Typography.Paragraph>
        </Card>
      </Link>
    </List.Item>
  )
}

const AnnouncementsSectionWrapper = styled(Card)`
.ant-card-head-title {
  padding: 16px 0;
}
`
export default function AnnouncementsSection () {
  const { data: configData } = useConfigurationByName('profile-announcements-params')
  const params = configData?.data?.value
  const { data } = useArticles(params, { enabled: !!params })
  const articles = data?.data || []
  return articles?.length
    ? (
      <AnnouncementsSectionWrapper
        title={
          <Space direction='vertical' style={{ width: '100%', padding: '16px, 0' }}>
            <div style={{ fontSize: '1.6em', fontWeight: 900 }}>Announcements</div>
            <div>Latest information from Literasiin</div>
          </Space>
        }
      >
        <List
          dataSource={articles}
          grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 4 }}
          renderItem={announcement => <AnnouncementListItem announcement={announcement} />}
        />
      </AnnouncementsSectionWrapper>

      )
    : null
}
