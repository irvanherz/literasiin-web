import { Divider, Space, Typography } from 'antd'
import ArticleShareSegment from 'components/ArticleShareSegment'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import ArticleBookmarkButton from './ArticleBookmarkButton'
import ArticleVoteButton from './ArticleVoteButton'

const Wrapper = styled.div`
.author-and-views {
  .ant-list-item { padding: 0 }
  .ant-list-item-meta-title { margin-top: 0 }
}
`
type ArticleFooterProps = {
  article: any
  context: any
  afterUpdated?: () => void
}

export default function ArticleFooter ({ article, context, afterUpdated }: ArticleFooterProps) {
  return (
    <Wrapper>
      <Space style={{ width: '100%', justifyContent: 'space-between' }}>
        <Space direction='vertical' style={{ width: '100%' }}>
          <Typography.Text type='secondary'><FormattedMessage defaultMessage="Posted on category" />:</Typography.Text>
          <Typography.Text strong>{article?.category?.name}</Typography.Text>
        </Space>
        <Space direction='vertical' style={{ width: '100%' }}>
          <Typography.Text strong><FormattedMessage defaultMessage="Share" />:</Typography.Text>
          {article ? <ArticleShareSegment article={article} /> : null }
        </Space>
      </Space>
      <Divider />
      <Space style={{ width: '100%', justifyContent: 'space-between' }}>
        <div><ArticleVoteButton article={article} context={context} afterUpdated={afterUpdated} /></div>
        <div><ArticleBookmarkButton article={article} context={context} afterUpdated={afterUpdated} /></div>
      </Space>
    </Wrapper>
  )
}
