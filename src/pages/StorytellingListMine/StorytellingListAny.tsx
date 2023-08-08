import { List } from 'antd'
import StorytellingListItem from 'components/StorytellingListItem'
import useCurrentUser from 'hooks/useCurrentUser'
import { useQuery } from 'react-query'
import StorytellingsService from 'services/Storytellings'

export default function StorytellingListAny () {
  const user = useCurrentUser()
  const { data, refetch } = useQuery(
    'storytellings.mine.any',
    () => StorytellingsService.findMany({ userId: user.id, limit: 100, status: 'any' })
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
