import { HomeFilled, LeftOutlined, RightOutlined } from '@ant-design/icons'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StoryChapterNavWrapper = styled.div`
display: flex;
gap: 64px;
.story-chapter-nav-prev {
  flex: 1;
  text-align: right;
}
.story-chapter-nav-next {
  flex: 1;
}
.story-chapter-nav-link {
  &.story-chapter-nav-link-disabled {
    opacity: 0.5;
  }
  display: flex;
  align-items: center;
  &-1 {
    flex: 1;
  }
  &-2 {
    flex: 0;
    color: rgba(0,0,0,0.65);
  }
  .story-chapter-nav-title {
    font-weight: 900;
    color: rgba(0,0,0,0.85);
  }
  .story-chapter-nav-subtitle {
    color: rgba(0,0,0,0.65);
  }
}
`

type StoryChapterNavProps = {
  story: any
  context: any
}
export default function StoryChapterNav ({ story, context }: StoryChapterNavProps) {
  const prevElement = useMemo(() => {
    if (context?.prevChapter) {
      return (
        <Link to={`/stories/chapters/${context?.prevChapter?.id}`} className='story-chapter-nav-link'>
          <div className='story-chapter-nav-link-2'>
            <LeftOutlined />
          </div>
          <div className='story-chapter-nav-link-1'>
            <div className='story-chapter-nav-title'>{story?.title}</div>
            <div className='story-chapter-nav-subtitle'>{context?.prevChapter?.title}</div>
          </div>
        </Link>
      )
    } else {
      return (
        <Link to={`/stories/${story?.id}`} className='story-chapter-nav-link'>
          <div className='story-chapter-nav-link-2'>
            <LeftOutlined />
          </div>
          <div className='story-chapter-nav-link-1'>
            <div className='story-chapter-nav-title'><HomeFilled /></div>
            <div className='story-chapter-nav-subtitle'>Back to story list</div>
          </div>
        </Link>
      )
    }
  }, [context])

  const nextElement = useMemo(() => {
    if (context?.nextChapter) {
      return (
        <Link to={`/stories/chapters/${context.nextChapter?.id}`} className='story-chapter-nav-link'>
          <div className='story-chapter-nav-link-1'>
            <div className='story-chapter-nav-title'>{story?.title}</div>
            <div className='story-chapter-nav-subtitle'>{context.nextChapter?.title}</div>
          </div>
          <div className='story-chapter-nav-link-2'>
            <RightOutlined />
          </div>
        </Link>
      )
    } else {
      return (
        <div className='story-chapter-nav-link story-chapter-nav-link-disabled'>
          <div className='story-chapter-nav-link-1'>
            <div className='story-chapter-nav-title'>To be continued...</div>
            <div className='story-chapter-nav-subtitle'>Follow writer to get notified when new chapter available</div>
          </div>
          <div className='story-chapter-nav-link-2'>

          </div>
        </div>
      )
    }
  }, [context])

  return (
    <StoryChapterNavWrapper>
      <div className="story-chapter-nav-prev">
        {prevElement}
      </div>
      <div className="story-chapter-nav-next">
        {nextElement}
      </div>
    </StoryChapterNavWrapper>
  )
}
