import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Tooltip, message } from 'antd'
import Layout from 'components/Layout'
import PageHeader from 'components/PageHeader'
import RenderTimeFromNow from 'components/shared/RenderTimeFromNow'
import useCurrentUser from 'hooks/useCurrentUser'
import useStorytelling from 'hooks/useStorytelling'
import useStorytellingAudienceContext from 'hooks/useStorytellingAudienceContext'
import { contentIdFromSlug } from 'libs/slug'
import { DEFAULT_IMAGE } from 'libs/variables'
import Media from 'models/Media'
import { useMemo } from 'react'
import { Helmet } from 'react-helmet'
import { useMutation } from 'react-query'
import { Link, useNavigate, useParams } from 'react-router-dom'
import StorytellingsService from 'services/Storytellings'
import Episodes from './Episodes'

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
  const storytellingId = contentIdFromSlug(params.storytellingId || '')
  const { data } = useStorytelling(storytellingId)
  const { data: contextData, refetch: refetchContextData } = useStorytellingAudienceContext(storytellingId)
  const context = contextData?.data
  const storytelling = data?.data

  const cover = new Media(storytelling?.cover)

  const authors = useMemo(() => {
    const writers: any[] = storytelling?.authors || []
    return writers.reduce((a, c, i, arr) => {
      if (i === arr.length - 2) {
        a.push(<Link to={`/users/${c.username}`}>{c.fullName}</Link>)
        a.push(<span> and </span>)
      } else if (i !== arr.length - 1) {
        a.push(<Link to={`/users/${c.username}`}>{c.fullName}</Link>)
        a.push(<span>, </span>)
      } else {
        a.push(<Link to={`/users/${c.username}`}>{c.fullName}</Link>)
      }
      return a
    }, [])
  }, [storytelling?.authors])

  return (
    <Layout.Default
      beforeContent={
        <PageHeader
          title={
            <div className='font-bold flex flex-col items-center text-center text-base gap-4'>
              <div className='w-32'>
                <div className='aspect-1 rounded-lg overflow-hidden shadow-sm'>
                  <img src={cover.md?.url || DEFAULT_IMAGE} />
                </div>
              </div>
              <div className='flex-1'>
                <div className='font-black text-2xl'>{storytelling?.title}</div>
                <div className='font-bold pb-4'><span className='text-slate-600'>Dibuat oleh</span> <span className='font-black'>{authors}</span></div>
                <div className='font-medium text-sm pb-4'>{storytelling?.description || <i>No description</i>}</div>
                <div className='text-sm pb-4'><span className='text-slate-600'>Kategori</span> <span className='font-bold'>{storytelling?.category?.name || <i>Tanpa Kategori</i>}</span> &middot; <span className='text-slate-600'>Bahasa</span> <span className='font-bold'>Indonesia</span> &middot; <span className='text-slate-600'>Terakhir update</span> <RenderTimeFromNow timestamp={storytelling?.updatedAt} /></div>
                <div>
                  {(storytelling?.tags || []).map((tag: any) => <div key={tag} className="badge badge-primary shadow-sm">{tag}</div>)}
                </div>
              </div>
            </div>
          }
        />
      }
    >
      <div>
        <div className='border-b py-2 bg-slate-50'>
          <div className='container flex items-center'>
            <div className='flex-1'>
              <span className='font-bold'>{storytelling?.meta?.numPublishedEpisodes || 0}</span> episode
            </div>
            <div className='flex-none'>
              <StorytellingBookmarkButton
                storytelling={storytelling}
                context={context?.storytelling}
                afterUpdated={refetchContextData}
              />
            </div>
          </div>
        </div>
        <div className='container py-4'>
          <Episodes storytelling={storytelling} context={context} afterUpdated={refetchContextData} />
        </div>
      </div>
      <Helmet>
        <title>Storytelling - Literasiin</title>
      </Helmet>
    </Layout.Default>
  )
}
