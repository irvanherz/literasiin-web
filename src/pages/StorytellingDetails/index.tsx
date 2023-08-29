import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Tooltip, Typography, message, theme } from 'antd'
import Layout from 'components/Layout'
import useCurrentUser from 'hooks/useCurrentUser'
import useStorytelling from 'hooks/useStorytelling'
import useStorytellingAudienceContext from 'hooks/useStorytellingAudienceContext'
import { contentIdFromSlug } from 'libs/slug'
import { Helmet } from 'react-helmet'
import { useMutation } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import StorytellingsService from 'services/Storytellings'
import Episodes from './Episodes'
import Header from './Header'

type StorytellingBookmarkButtonProps = {
  storytelling: any
  context: any
  afterUpdated: () => void
}
function StorytellingBookmarkButton ({ storytelling, context, afterUpdated }:StorytellingBookmarkButtonProps) {
  const navigate = useNavigate()
  const currentUser = useCurrentUser()
  const storytellingId = storytelling?.id
  const bookmarker = useMutation<any, any, any>(stId => StorytellingsService.Audiences.bookmark(stId))
  const unbookmarker = useMutation<any, any, any>(stId => StorytellingsService.Audiences.unbookmark(stId))
  const executor = context?.bookmark ? unbookmarker : bookmarker

  const handleBookmark = () => {
    if (!currentUser) {
      navigate('/auth/signin')
      return
    }
    executor.mutate(storytellingId, {
      onSuccess: () => {
        if (afterUpdated) afterUpdated()
      },
      onError: (err: any) => {
        message.error(err?.message || 'Something went wrong')
      }
    })
  }

  return (
    <Tooltip title="Dapatkan notifikasi untuk update cerita baru">
      <Button shape='round' type='text' icon={context?.bookmark ? <MinusOutlined /> : <PlusOutlined />} onClick={handleBookmark}>{context?.bookmark ? 'Unsubscribe' : 'Subscribe'}</Button>
    </Tooltip>
  )
}

export default function StorytellingDetails () {
  const params = useParams()
  const { token } = theme.useToken()
  const storytellingId = contentIdFromSlug(params.storytellingId || '')
  const { data } = useStorytelling(storytellingId)
  const { data: contextData, refetch: refetchContextData } = useStorytellingAudienceContext(storytellingId)
  const context = contextData?.data
  const storytelling = data?.data

  return (
    <Layout.Default style={{ background: token.colorBgBase }}>
      <Layout.Scaffold
        title={
          <Header storytelling={storytelling} />
        }
        bodyStyle={{ padding: '16px 0' }}
        extra={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <Typography.Title level={3} style={{ fontSize: token.fontSizeLG, margin: 0 }}>{storytelling?.meta?.numPublishedEpisodes || 0} Episodes</Typography.Title>
            </div>
            <div style={{ flex: 0 }}>
              <StorytellingBookmarkButton
                storytelling={storytelling}
                context={context?.storytelling}
                afterUpdated={refetchContextData}
              />
            </div>
          </div>
        }
      >
        <Episodes storytelling={storytelling} context={context} afterUpdated={refetchContextData} />
      </Layout.Scaffold>
      <Helmet>
        <title>Storytelling - Literasiin</title>
      </Helmet>
    </Layout.Default>
  )
}
