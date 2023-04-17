import { EyeFilled } from '@ant-design/icons'
import { Avatar, List, Space, Typography } from 'antd'
import { DEFAULT_PHOTO } from 'libs/variables'
import { useMemo } from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'

const Wrapper = styled.div`
.author-and-views {
  .ant-list-item { padding: 0 }
  .ant-list-item-meta-title { margin-top: 0 }
}
`
type ArticleHeaderProps = {
  article: any
}

export default function ArticleHeader ({ article }: ArticleHeaderProps) {
  const avatarSrc = useMemo(() => {
    const image = article?.user?.photo
    const objects: any[] = image?.meta?.objects || []
    const md = objects.find(object => object.id === 'md')
    return md?.url || DEFAULT_PHOTO
  }, [article])

  return (
    <Wrapper>
      <Space direction='vertical' style={{ width: '100%' }}>
        <Typography.Title level={2} style={{ margin: 0 }}>{article?.title}</Typography.Title>
        {article?.description && (
          <Typography.Paragraph>{article?.description}</Typography.Paragraph>
        )}
        <List className='author-and-views'>
          <List.Item
            extra={<span><EyeFilled /> <span>{article?.meta?.numViews || 0}</span></span>}
          >
            <List.Item.Meta
              avatar={<Avatar size='large' src={avatarSrc} />}
              title={article?.user?.fullName}
              description={<FormattedMessage defaultMessage="Writer" />}
            />
          </List.Item>
        </List>
      </Space>
    </Wrapper>
  )
}
