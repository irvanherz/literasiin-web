/* eslint-disable no-unreachable */
/* eslint-disable no-unused-vars */
import { CustomerServiceFilled, HeartFilled, HeartOutlined } from '@ant-design/icons'
import { Button, message } from 'antd'
import StorytellingPlayerButton from 'components/StorytellingPlayerButton'
import useCurrentUser from 'hooks/useCurrentUser'
import useStorytellingEpisodes from 'hooks/useStorytellingEpisodes'
import { DEFAULT_PHOTO } from 'libs/variables'
import Media from 'models/Media'
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

  const cover = new Media(storytelling.cover)

  return (
    <div className='flex flex-col md:flex-row bg-white rounded-lg shadow'>
      <div className='p-4 flex-1 flex gap-4'>
        <div className='w-12 md:w-20'>
          <div className='aspect-1 rounded shadow overflow-hidden'>
            <img src={cover.md?.url || DEFAULT_PHOTO} />
          </div>
        </div>
        <div className='flex-1 space-y-2'>
          <div className='font-black'>{episode.title || <i>Untitled Episode</i>}</div>
          <div className='text-slate-500 text-sm line-clamp-2'>{episode.description || <i>No description</i>}</div>
          <div className='text-xs text-slate-700 space-x-4'>
            <div className='inline'>
              <CustomerServiceFilled style={{ marginRight: 4 }}/> <span>Didengar {episode.meta.numListens} kali</span>
            </div>
            <div className='inline'>
              <HeartFilled style={{ marginRight: 4 }}/> <span>Disukai {episode.meta.numVotes} pengguna</span>
            </div>
          </div>
        </div>
      </div>
      <div className='flex-none w-full md:w-auto self-center border-t md:border-t-0 px-4 py-2 text-center'>
        <StorytellingPlayerButton storytelling={storytelling} episode={episode} options={{ status: 'published' }} />
        <Button loading={executor.isLoading} onClick={handleVote} shape='round' type='text' icon={context?.vote ? <HeartFilled /> : <HeartOutlined />} >{context?.vote ? 'Unlike' : 'Like'}</Button>
      </div>
    </div>
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
    <div className='flex flex-col gap-4'>
      {episodes.map(episode => <Episode key={episode.id} storytelling={storytelling} episode={episode} context={contextByEpisodeId[episode.id]} afterUpdated={afterUpdated} />)}
    </div>
  )
}
