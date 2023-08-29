/* eslint-disable no-unused-vars */
import { CustomerServiceFilled, HeartFilled, HeartOutlined } from '@ant-design/icons'
import { Button, List, Space, message } from 'antd'
import StorytellingCover from 'components/StorytellingCover'
import StorytellingPlayerButton from 'components/StorytellingPlayerButton'
import useCurrentUser from 'hooks/useCurrentUser'
import useStorytellingEpisodes from 'hooks/useStorytellingEpisodes'
import { useMemo } from 'react'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import StorytellingsService from 'services/Storytellings'

type EpisodeProps = {
  episode: any
  storytelling: any
  context: any
  afterUpdated?: () => void
}

function Episode ({ storytelling, episode, context, afterUpdated }: EpisodeProps) {
  const currentUser = useCurrentUser()
  const navigate = useNavigate()
  const voter = useMutation<any, any, any>(() => StorytellingsService.Episodes.Audiences.vote(episode.id))
  const devoter = useMutation<any, any, any>(() => StorytellingsService.Episodes.Audiences.devote(episode.id))
  const executor = context?.vote ? devoter : voter

  const handleVote = () => {
    if (!currentUser) navigate('/auth/signin')
    executor.mutate(undefined, {
      onSuccess: () => {
        if (afterUpdated) afterUpdated()
      },
      onError: (err:any) => {
        message.error(err?.message || 'Something went wrong')
      }
    })
  }
  return (
    <List.Item
      extra={
        <Space>
          <StorytellingPlayerButton storytelling={storytelling} episode={episode} options={{ status: 'published' }} />
          <Button loading={executor.isLoading} onClick={handleVote} shape='round' type='text' icon={context?.vote ? <HeartFilled /> : <HeartOutlined />} >{context?.vote ? 'Unlike' : 'Like'}</Button>
        </Space>
    }
    >
      <List.Item.Meta
        avatar={
          <div style={{ width: 64 }}>
            <StorytellingCover storytelling={storytelling} containerStyle={{ borderRadius: 8, overflow: 'hidden' }}/>
          </div>
        }
        title={episode.title || <i>Untitled Episode</i>}
        description={
          <Space direction='vertical' style={{ width: '100%' }}>
            <div>{episode.description || <i>No description</i>}</div>
            <Space size='large'>
              <div style={{ display: 'flex', alignItems: 'center', fontSize: 'small' }}>
                <CustomerServiceFilled style={{ marginRight: 4 }}/> <span>Didengar {episode.meta.numListens} kali</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', fontSize: 'small' }}>
                <HeartFilled style={{ marginRight: 4 }}/> <span>Disukai {episode.meta.numVotes} pengguna</span>
              </div>
            </Space>
          </Space>
        }
      />
    </List.Item>
  )
}

type EpisodesProps = {
  storytelling: any
  context: any
  afterUpdated?: () => void
}

export default function Episodes ({ storytelling, context, afterUpdated }: EpisodesProps) {
  const { data } = useStorytellingEpisodes({ storytellingId: storytelling?.id }, { enabled: !!storytelling?.id })
  const episodes: any[] = data?.data || []

  const contextByEpisodeId = useMemo(() => {
    const episodesContext: any[] = context?.episodes || []
    return episodesContext.reduce((a, c) => {
      a[c.episodeId] = c
      return a
    }, {})
  }, [context])

  return (
    <List
      split={false}
      dataSource={episodes}
      renderItem={episode => <Episode storytelling={storytelling} episode={episode} context={contextByEpisodeId[episode.id]} afterUpdated={afterUpdated}/>}
    />
  )
}
