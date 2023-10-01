import { AdjustmentsHorizontalIcon, PencilSquareIcon } from '@heroicons/react/24/solid'
import { Modal, message } from 'antd'
import ArticleShareButton from 'components/ArticleShareButton'
import RenderTimeFromNow from 'components/shared/RenderTimeFromNow'
import useArticleDelete from 'hooks/useArticleDelete'
import useArticles from 'hooks/useArticles'
import useCurrentUser from 'hooks/useCurrentUser'
import { slugifyContentId } from 'libs/slug'
import { DEFAULT_IMAGE } from 'libs/variables'
import Media from 'models/Media'
import { ReactElement, cloneElement } from 'react'
import { useMutation } from 'react-query'
import { Link } from 'react-router-dom'
import ArticlesService from 'services/Articles'

type DeleteButtonProps = {
  article: any
  children: ReactElement
  afterDeleted?: () => void
}
function DeleteButton({ children, article, afterDeleted }: DeleteButtonProps) {
  const articleId = article.id
  const executor = useArticleDelete()

  const handleClick = () => {
    Modal.confirm({
      title: 'Konfirmasi',
      content: 'Apakah kamu yakin ingin menghapus artikel ini?',
      centered: true,
      onOk: async () => {
        try {
          await executor.mutateAsync(articleId)
          afterDeleted?.()
        } catch (err) {
          message.error('Something went wrong')
        }
      }

    })
  }

  return cloneElement(children, { onClick: handleClick, disabled: executor.isLoading })
}

type ArticleListEmptyProps = {
  filter?: any
}
function ArticleListEmpty({ filter }: ArticleListEmptyProps) {
  return (
    <div className="text-center py-8">
      <div className="inline-flex rounded-full bg-yellow-100 p-2">
        <div className="rounded-full stroke-yellow-600 bg-yellow-200 p-2">
          <svg className="w-8 h-8" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.0002 9.33337V14M14.0002 18.6667H14.0118M25.6668 14C25.6668 20.4434 20.4435 25.6667 14.0002 25.6667C7.55684 25.6667 2.3335 20.4434 2.3335 14C2.3335 7.55672 7.55684 2.33337 14.0002 2.33337C20.4435 2.33337 25.6668 7.55672 25.6668 14Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
        </div>
      </div>
      <h1 className="mt-4 font-bold text-slate-800 text-2xl">Oops,</h1>
      <p className="text-slate-600 mt-2 text-base">
        {filter?.search ? `Kami tidak bisa menemukan artikel dengan kata kunci '${filter.search}'` : 'Tidak ada artikel yang bisa ditampilkan'}
      </p>
    </div>
  )
}

type ArticleCardProps = {
  article: any
  afterUpdated?: () => void
  afterDeleted?: () => void
}

function ArticleCard({ article, afterUpdated, afterDeleted }:ArticleCardProps) {
  const image = new Media(article?.image)
  const updater = useMutation((payload: any) => ArticlesService.updateById(article.id, payload))

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
        {article?.status === 'draft' && <div className='px-2 py-y bg-red-500 text-sm font-bold text-white'>DRAFT</div>}
        {article?.hasCompleted && <div className='px-2 py-y bg-emerald-600 text-sm font-bold text-white'>SUDAH TAMAT</div>}
      </div>
      <div className='flex p-4 gap-4'>
        <div className='w-16 sm:w-20 md:w-24'>
          <div className='relative border border-slate-200 overflow-hidden rounded-md aspect-1'>
            <img src={image.md?.url || DEFAULT_IMAGE} className='absolute left-0 top-0 w-full h-full object-cover' />
          </div>
        </div>
        <div className='flex-1'>
          <div className='font-black text-lg space-x-2'>{article.title}</div>
          <div className='font-semibold'><span className='text-slate-600'>Ditulis oleh</span> {article?.user?.fullName}</div>
          <div className='text-sm text-slate-800 line-clamp-2'>{article.description || <i>No description</i>}</div>
          <div className='mt-2 space-x-2'>
            <Link to={`/articles/${slugifyContentId(article)}/edit`}>
              <button className='btn btn-primary btn-xs'><PencilSquareIcon className='w-4' /><span className='inline'> Edit Artikel</span></button>
            </Link>
            <div className="dropdown dropdown-bottom">
              <label tabIndex={0} className='btn btn-xs'><AdjustmentsHorizontalIcon className='w-4' /><span className='hidden md:inline'> Pengaturan</span></label>
              <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><Link to={`/articles/${slugifyContentId(article)}`}>Lihat Artikel</Link></li>
                {article?.status === 'published'
                  ? <li><a onClick={() => handleUpdate({ status: 'draft' })}>Kembalikan ke draf</a></li>
                  : <li><a onClick={() => handleUpdate({ status: 'published' })}>Terbitkan</a></li>
                }
                <ArticleShareButton article={article}>
                  <li><span>Bagikan</span></li>
                </ArticleShareButton>
                <li><DeleteButton article={article} afterDeleted={afterDeleted}><button>Hapus artikel</button></DeleteButton></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className='border-t overflow-x-auto overflow-y-hidden adaptive-scroll'>
        <div className='flex px-4 py-2 divide-x min-w-[780px] '>
          <div className='w-1/4 text-center'>
            <div className='text-slate-700'>Kategori</div>
            <div className='font-bold'>{article.category?.name || <i>Tanpa Kategori</i>}</div>
          </div>
          <div className='w-1/4 text-center'>
            <div className='text-slate-700'>Dibaca</div>
            <div className='font-bold'>{article.meta?.numViews}</div>
          </div>
          <div className='w-1/4 text-center'>
            <div className='text-slate-700'>Upvote</div>
            <div className='font-bold'>{article.meta?.numUpvotes}</div>
          </div>
          <div className='w-1/4 text-center'>
            <div className='text-slate-700'>Disimpan</div>
            <div className='font-bold'>{article.meta?.numBookmarks} user</div>
          </div>
          <div className='w-1/4 text-center'>
            <div className='text-slate-700'>Terakhir update</div>
            <div className='font-bold'><RenderTimeFromNow timestamp={article.updatedAt} /></div>
          </div>
        </div>
      </div>
    </div>
  )
}

type ArticlesAnyProps = {
  filter: any
}
export default function ArticlesAny ({ filter }: ArticlesAnyProps) {
  const user = useCurrentUser()
  const { data, refetch } = useArticles({ userId: user.id, limit: 100, ...filter })
  const articles: any[] = data?.data || []

  return (
    <div className='space-y-2'>
      {articles.length === 0 && <ArticleListEmpty filter={filter} />}
      {articles.map(article => (
        <ArticleCard key={article.id} article={article} afterUpdated={refetch} afterDeleted={refetch}/>
      ))}
    </div>
  )
}
