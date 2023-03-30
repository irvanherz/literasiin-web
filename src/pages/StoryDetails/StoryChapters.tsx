import { EyeFilled } from '@ant-design/icons'
import { Card, Empty, Menu, MenuProps } from 'antd'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import StoriesService from 'services/Stories'
import styled from 'styled-components'

const ChapterMenuItemWrapper = styled.div`
display: flex;
.chapter-menu-item-content {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}
.chapter-menu-item-meta {
  flex: 0;
}
`
type ChapterMenuItemProps = { chapter: any}
function ChapterMenuItem ({ chapter }: ChapterMenuItemProps) {
  return (
    <ChapterMenuItemWrapper>
      <div className='chapter-menu-item-content'>
        {chapter?.title}
      </div>
      <div className='chapter-menu-item-meta'>
        <EyeFilled /> {chapter?.meta?.numViews || 0}
      </div>
    </ChapterMenuItemWrapper>
  )
}

type StoryChaptersProps = {
  story: any
}

export default function StoryChapters ({ story }:StoryChaptersProps) {
  const navigate = useNavigate()
  const storyId = story?.id
  const { data } = useQuery(`stories[${storyId}].chapters`, () => StoriesService.Chapters.findMany({ storyId }), { enabled: !!storyId })
  const chapters: any[] = data?.data || []
  const menuItems: MenuProps['items'] = chapters.map(chapter => ({
    key: chapter.id,
    label: <ChapterMenuItem chapter={chapter} />
  }))

  const handleSelect = (e: any) => {
    navigate(`/stories/chapters/${e.key}`)
  }
  return (
    <Card title="Chapters">
      {chapters.length
        ? <Menu onSelect={handleSelect} items={menuItems} style={{ border: 0 }} />
        : <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="Chapters not available yet"
        />

    }
    </Card>
  )
}
