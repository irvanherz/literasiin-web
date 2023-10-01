import useArticles from 'hooks/useArticles'
import useConfigurationByName from 'hooks/useConfigurationByName'
import { slugifyContentId } from 'libs/slug'
import { DEFAULT_PHOTO } from 'libs/variables'
import Media from 'models/Media'
import { Link } from 'react-router-dom'

type AnnouncementListItemProps = {announcement: any}
function AnnouncementListItem ({ announcement }: AnnouncementListItemProps) {
  const image = new Media(announcement?.image)
  return (
    <Link to={`/articles/${slugifyContentId(announcement)}`} className='bg-emerald-500 rounded-lg text-white p-2 hover:bg-emerald-800'>
      <div className='flex gap-2'>
        <div className='flex-none'>
          <div className="avatar shadow-md">
            <div className="w-12 rounded">
              <img src={image.md?.url || DEFAULT_PHOTO} />
            </div>
          </div>
        </div>
        <div className='flex-1'>
          <div className='font-bold line-clamp-1'>{announcement.title}</div>
          <div className='text-sm line-clamp-1'>{announcement.description}</div>
        </div>
      </div>
    </Link>
  )
}

export default function AnnouncementsSection () {
  const { data: configData } = useConfigurationByName('profile-announcements-params')
  const params = configData?.data?.value
  const { data } = useArticles(params, { enabled: !!params })
  const articles: any[] = data?.data || []
  return articles?.length
    ? (
      <div className='bg-emerald-700 py-4'>
        <div className='container space-y-4'>
          <div>
            <div className='text-2xl text-white font-black'>Pengumuman</div>
            <div className='text-white font-bold'>Info terbaru literasiin</div>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
            {articles.map(article => <AnnouncementListItem key={article.id} announcement={article} />)}
          </div>
        </div>
      </div>
      )
    : null
}
