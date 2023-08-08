import { List } from 'antd'
import StorytellingListItem from 'components/StorytellingListItem'
import useCurrentUser from 'hooks/useCurrentUser'
import { useQuery } from 'react-query'
import StorytellingsService from 'services/Storytellings'

export default function StorytellingListPublished () {
  const user = useCurrentUser()
  const { data, refetch } = useQuery(
    'storytellings.mine.published',
    () => StorytellingsService.findMany({ status: 'published', userId: user.id, limit: 100 })
  )
  const storytellings = data?.data || []

  return (
    <List
      dataSource={storytellings}
      renderItem={storytelling => (
        <StorytellingListItem storytelling={storytelling} afterUpdated={refetch} afterDeleted={refetch} />
      )}
    />
  )
}
