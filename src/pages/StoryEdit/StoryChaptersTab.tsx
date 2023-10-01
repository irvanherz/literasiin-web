import { AdjustmentsHorizontalIcon, PencilSquareIcon, PlusIcon } from '@heroicons/react/24/solid'
import { Modal, message } from 'antd'
import StoryShareButton from 'components/StoryShareButton'
import RenderTimeFromNow from 'components/shared/RenderTimeFromNow'
import useStoryChapterCreate from 'hooks/useStoryChapterCreate'
import useStoryChapterDelete from 'hooks/useStoryChapterDelete'
import useStoryChapters from 'hooks/useStoryChapters'
import { slugifyContentId } from 'libs/slug'
import { DEFAULT_IMAGE } from 'libs/variables'
import Media from 'models/Media'
import { ReactElement, cloneElement, useMemo } from 'react'
import { useMutation } from 'react-query'
import { Link } from 'react-router-dom'
import StoriesService from 'services/Stories'

type DeleteButtonProps = {
  chapter: any
  children: ReactElement
  afterDeleted?: () => void
}
function DeleteButton({ children, chapter, afterDeleted }: DeleteButtonProps) {
  const chapterId = chapter.id
  const executor = useStoryChapterDelete()

  const handleClick = () => {
    Modal.confirm({
      title: 'Konfirmasi',
      content: 'Apakah kamu yakin ingin menghapus bab ini?',
      centered: true,
      onOk: async () => {
        try {
          await executor.mutateAsync(chapterId)
          afterDeleted?.()
        } catch (err) {
          message.error('Something went wrong')
        }
      }

    })
  }

  return cloneElement(children, { onClick: handleClick, disabled: executor.isLoading })
}

type CreateChapterButtonProps = {
  story: any
  children: ReactElement
  afterCreated?: () => void
}

function CreateChapterButton({ story, children, afterCreated }: CreateChapterButtonProps) {
  const creator = useStoryChapterCreate()
  const handleClick = async () => {
    try {
      await creator.mutateAsync({ storyId: story.id, title: 'Untitled' })
      afterCreated?.()
    } catch (err) {
      message.error('Terjadi kesalahan')
    }
  }

  return cloneElement(children, { onClick: handleClick, disabled: creator.isLoading })
}

type ChapterListEmptyProps = {
  story: any
  afterCreated?: () => void
}

function ChapterListEmpty({ story, afterCreated }: ChapterListEmptyProps) {
  return (
    <div className="text-center py-8">
      <div className="inline-flex rounded-full bg-yellow-100 p-2">
        <div className="rounded-full stroke-yellow-600 bg-yellow-200 p-2">
          <svg className="w-8 h-8" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.0002 9.33337V14M14.0002 18.6667H14.0118M25.6668 14C25.6668 20.4434 20.4435 25.6667 14.0002 25.6667C7.55684 25.6667 2.3335 20.4434 2.3335 14C2.3335 7.55672 7.55684 2.33337 14.0002 2.33337C20.4435 2.33337 25.6668 7.55672 25.6668 14Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
        </div>
      </div>
      <h1 className="mt-4 font-bold text-slate-800 text-2xl">Tidak Ada Bab</h1>
      <p className="text-slate-600 mt-2 text-base">Kamu belum menulis bab untuk cerita ini</p>
      <div className='mt-4'>
        <CreateChapterButton story={story} afterCreated={afterCreated}>
          <button className='btn btn-sm btn-primary'><PlusIcon className='w-4' /> Buat Bab Baru</button>
        </CreateChapterButton>
      </div>
    </div>
  )
}

type ChapterProps = {
  story: any
  chapter: any
  afterUpdated?: () => void
  afterDeleted?: () => void
}

function Chapter({ story, chapter, afterUpdated, afterDeleted }:ChapterProps) {
  const cover = new Media(story?.cover)
  const updater = useMutation((payload: any) => StoriesService.Chapters.updateById(chapter.id, payload))
  const authors = useMemo(() => {
    const writers: any[] = story?.writers || []
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
  }, [story?.writers])

  const handleUpdate = (payload: any) => {
    updater.mutate(payload, {
      onSuccess: () => {
        afterUpdated && afterUpdated()
      },
      onError: (err: any) => {
        message.error(err?.message)
      }
    })
  }

  return (
    <div className='relative rounded-md bg-white shadow'>
      <div className='absolute right-0 top-0 rounded-bl-md rounded-tr-md overflow-hidden flex'>
        {chapter?.status === 'draft' && <div className='px-2 py-y bg-red-500 text-sm font-bold text-white'>DRAFT</div>}
      </div>
      <div className='flex p-4 gap-4'>
        <div className='w-12 md:w-16'>
          <div className='relative border border-slate-200 overflow-hidden rounded-md aspect-w-2 aspect-h-3'>
            <img src={cover.md?.url || DEFAULT_IMAGE} className='object-cover' />
          </div>
        </div>
        <div className='flex-1'>
          <div className='font-black text-lg space-x-2'>{chapter.title}</div>
          <div className='font-semibold'><span className='text-slate-600'>Ditulis oleh</span> {authors}</div>
          <div className='text-sm text-slate-800 line-clamp-2'>{chapter.description || <i>No description</i>}</div>
          <div className='mt-2 space-x-2'>
            <Link to={`/stories/chapters/${slugifyContentId(chapter)}/edit`}>
              <button className='btn btn-primary btn-xs'><PencilSquareIcon className='w-4' /><span className='inline'> Edit Bab</span></button>
            </Link>
            <div className="dropdown dropdown-bottom">
              <label tabIndex={0} className='btn btn-xs'><AdjustmentsHorizontalIcon className='w-4' /><span className='hidden md:inline'> Pengaturan</span></label>
              <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><Link to={`/stories/chapters/${slugifyContentId(chapter)}`}>Lihat Bab Cerita</Link></li>
                {chapter?.status === 'published'
                  ? <li><a onClick={() => handleUpdate({ status: 'draft' })}>Kembalikan ke draf</a></li>
                  : <li><a onClick={() => handleUpdate({ status: 'published' })}>Terbitkan</a></li>
                }
                <StoryShareButton story={story}>
                  <li><span>Bagikan</span></li>
                </StoryShareButton>
                <li>
                  <DeleteButton chapter={chapter} afterDeleted={afterDeleted}>
                    <button>Hapus Bab</button>
                  </DeleteButton>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className='border-t overflow-x-auto overflow-y-hidden adaptive-scroll'>
        <div className='flex px-4 py-2 divide-x min-w-[780px] '>
          <div className='w-1/4 text-center'>
            <div className='text-slate-700'>Dibaca</div>
            <div className='font-bold'>{chapter.meta?.numReads}</div>
          </div>
          <div className='w-1/4 text-center'>
            <div className='text-slate-700'>Disukai</div>
            <div className='font-bold'>{chapter.meta?.numVotes}</div>
          </div>
          <div className='w-1/4 text-center'>
            <div className='text-slate-700'>Terakhir update</div>
            <div className='font-bold'><RenderTimeFromNow timestamp={chapter.updatedAt} /></div>
          </div>
        </div>
      </div>
    </div>
  )
}

type StoryChaptersTabProps = {
  story: any
}

export default function StoryChaptersTab({ story }: StoryChaptersTabProps) {
  const { data, refetch } = useStoryChapters({ storyId: story?.id, status: 'any', limit: 1000 })
  const chapters: any[] = data?.data || []

  return (
    <div className="space-y-4">
      {!chapters.length && <ChapterListEmpty story={story} afterCreated={refetch} />}
      {!!chapters.length && (
        <div className='space-y-4'>
          <div className='space-y-2'>
            {chapters.map(chapter => <Chapter key={chapter} story={story} chapter={chapter} afterUpdated={refetch} afterDeleted={refetch} />)}
          </div>
          <div className='bg-white p-4 rounded-lg shadow text-center'>
            <CreateChapterButton story={story} afterCreated={refetch}>
              <button className='btn btn-sm btn-primary'><PlusIcon className='w-4' /> Tambah Bab Baru</button>
            </CreateChapterButton>
          </div>
        </div>
      )}
    </div>
  )
}
