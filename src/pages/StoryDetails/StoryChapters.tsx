import { Card, Menu, MenuProps } from 'antd'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import StoriesService from 'services/Stories'

type StoryChaptersProps = {
  story: any
}

export default function StoryChapters ({ story }:StoryChaptersProps) {
  const navigate = useNavigate()
  const storyId = story?.id
  const { data } = useQuery(`stories[${storyId}].chapters`, () => StoriesService.Chapters.findMany({ storyId }), { enabled: !!storyId })
  const chapters: any[] = data?.data || []
  const menuItems: MenuProps['items'] = chapters.map(chapter => ({ key: chapter.id, label: chapter.title }))

  const handleSelect = (e: any) => {
    navigate(`/stories/chapters/${e.key}`)
  }
  return (
    <Card title="Chapters">
      <Menu onSelect={handleSelect} items={menuItems} style={{ border: 0 }} />
    </Card>
  )
}
