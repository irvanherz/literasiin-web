/* eslint-disable no-unreachable */
import { AdjustmentsHorizontalIcon, ArrowRightIcon, PencilSquareIcon } from '@heroicons/react/24/solid'
import { Modal, message } from 'antd'
import StorytellingShareButton from 'components/StorytellingShareButton'
import RenderTimeFromNow from 'components/shared/RenderTimeFromNow'
import useCurrentUser from 'hooks/useCurrentUser'
import useStorytellingDelete from 'hooks/useStorytellingDelete'
import useStorytellings from 'hooks/useStorytellings'
import { slugifyContentId } from 'libs/slug'
import { DEFAULT_IMAGE } from 'libs/variables'
import Media from 'models/Media'
import { ReactElement, cloneElement, useMemo } from 'react'
import { useMutation } from 'react-query'
import { Link } from 'react-router-dom'
import StorytellingsService from 'services/Storytellings'

type DeleteButtonProps = {
  storytelling: any
  children: ReactElement
  afterDeleted?: () => void
}
function DeleteButton({ children, storytelling, afterDeleted }: DeleteButtonProps) {
  const storytellingId = storytelling.id
  const executor = useStorytellingDelete()

  const handleClick = () => {
    Modal.confirm({
      title: 'Konfirmasi',
      content: 'Apakah kamu yakin ingin menghapus storytelling ini?',
      centered: true,
      onOk: async () => {
        try {
          await executor.mutateAsync(storytellingId)
          afterDeleted?.()
        } catch (err) {
          message.error('Something went wrong')
        }
      }

    })
  }

  return cloneElement(children, { onClick: handleClick, disabled: executor.isLoading })
}

type StorytellingListEmptyProps = {
  filter?: any
}
function StorytellingListEmpty({ filter }: StorytellingListEmptyProps) {
  return (
    <div className="text-center py-8">
      <div className="inline-flex rounded-full bg-yellow-100 p-2">
        <div className="rounded-full stroke-yellow-600 bg-yellow-200 p-2">
          <svg className="w-8 h-8" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.0002 9.33337V14M14.0002 18.6667H14.0118M25.6668 14C25.6668 20.4434 20.4435 25.6667 14.0002 25.6667C7.55684 25.6667 2.3335 20.4434 2.3335 14C2.3335 7.55672 7.55684 2.33337 14.0002 2.33337C20.4435 2.33337 25.6668 7.55672 25.6668 14Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
        </div>
      </div>
      <h1 className="mt-4 font-bold text-slate-800 text-2xl">Oops,</h1>
      <p className="text-slate-600 mt-2 text-base">
        {filter?.search ? `Kami tidak bisa menemukan cerita dengan kata kunci '${filter.search}'` : 'Tidak ada cerita yang bisa ditampilkan'}
      </p>
    </div>
  )
}

type StorytellingCardProps = {
  storytelling: any
  afterUpdated?: () => void
  afterDeleted?: () => void
}

function StorytellingCard({ storytelling, afterUpdated, afterDeleted }:StorytellingCardProps) {
  const image = new Media(storytelling?.cover)
  const updater = useMutation((payload: any) => StorytellingsService.updateById(storytelling.id, payload))
  const authors = useMemo(() => {
    const writers: any[] = storytelling?.writers || []
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
  }, [storytelling?.writers])

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
    <div className='relative border rounded-md bg-white shadow-sm hover:bg-slate-50'>
      <div className='absolute right-0 top-0 rounded-bl-md rounded-tr-md overflow-hidden flex'>
        {storytelling?.status === 'draft' && <div className='px-2 py-y bg-red-500 text-sm font-bold text-white'>DRAFT</div>}
        {storytelling?.hasCompleted && <div className='px-2 py-y bg-emerald-600 text-sm font-bold text-white'>SUDAH TAMAT</div>}
      </div>
      <div className='flex p-4 gap-4'>
        <div className='w-12 sm:w-16 md:w-20'>
          <div className='relative border border-slate-200 overflow-hidden rounded-md aspect-1'>
            <img src={image.md?.url || DEFAULT_IMAGE} className='absolute left-0 top-0 w-full h-full object-cover' />
          </div>
        </div>
        <div className='flex-1'>
          <div className='font-black text-lg space-x-2'>{storytelling.title}</div>
          <div className='font-semibold'><span className='text-slate-600'>Ditulis oleh</span> {authors}</div>
          <div className='text-sm text-slate-800 line-clamp-2'>{storytelling.description || <i>No description</i>}</div>
          <div className='mt-2 space-x-2'>
            <Link to={`/storytellings/${slugifyContentId(storytelling)}/edit/episodes`}>
              <button className='btn btn-xs btn-primary'><ArrowRightIcon className='w-4' /> <span>Lanjutkan Episode</span></button>
            </Link>
            <Link to={`/storytellings/${slugifyContentId(storytelling)}/edit/details`}>
              <button className='btn btn-xs'><PencilSquareIcon className='w-4' /><span className='hidden md:inline'> Edit Detail Cerita</span></button>
            </Link>
            <div className="dropdown dropdown-bottom dropdown-end">
              <label tabIndex={0} className='btn btn-xs'><AdjustmentsHorizontalIcon className='w-4' /><span className='hidden md:inline'> Pengaturan</span></label>
              <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><Link to={`/storytellings/${slugifyContentId(storytelling)}`}>Lihat Cerita</Link></li>
                {storytelling?.status === 'published'
                  ? <li><a onClick={() => handleUpdate({ status: 'draft' })}>Kembalikan ke draf</a></li>
                  : <li><a onClick={() => handleUpdate({ status: 'published' })}>Terbitkan</a></li>
                }
                {storytelling?.hasCompleted
                  ? <li><a onClick={() => handleUpdate({ hasCompleted: false })}>Tandai belum selesai</a></li>
                  : <li><a onClick={() => handleUpdate({ hasCompleted: true })}>Tandai sudah selesai</a></li>
                }
                <StorytellingShareButton storytelling={storytelling}>
                  <li><span>Bagikan</span></li>
                </StorytellingShareButton>
                <li><DeleteButton storytelling={storytelling} afterDeleted={afterDeleted}><button>Hapus storytelling</button></DeleteButton></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className='border-t overflow-x-auto overflow-y-hidden adaptive-scroll'>
        <div className='flex px-4 py-2 divide-x min-w-[600px] '>
          <div className='w-1/4 text-center'>
            <div className='text-slate-700'>Kategori</div>
            <div className='font-bold'>{storytelling.category?.name || <i>Tanpa Kategori</i>}</div>
          </div>
          <div className='w-1/4 text-center'>
            <div className='text-slate-700'>Didengarkan</div>
            <div className='font-bold'>{storytelling.meta?.numListens}</div>
          </div>
          <div className='w-1/4 text-center'>
            <div className='text-slate-700'>Disukai</div>
            <div className='font-bold'>{storytelling.meta?.numVotes}</div>
          </div>
          <div className='w-1/4 text-center'>
            <div className='text-slate-700'>Terakhir update</div>
            <div className='font-bold'><RenderTimeFromNow timestamp={storytelling.updatedAt} /></div>
          </div>
        </div>
      </div>
    </div>
  )
}

type StorytellingListProps = {
  filter: any
}
export default function StorytellingList ({ filter }: StorytellingListProps) {
  const user = useCurrentUser()
  const { data, refetch } = useStorytellings({ ...filter, userId: user.id, limit: 100 })
  const storytellings: any[] = data?.data || []

  return (
    <div className='space-y-2'>
      {storytellings.length === 0 && <StorytellingListEmpty filter={filter} />}
      {storytellings.map(storytelling => (
        <StorytellingCard key={storytelling.id} storytelling={storytelling} afterUpdated={refetch} afterDeleted={refetch} />
      ))}
    </div>
  )
}
