import { Card } from 'antd'
import StorytellingCover from 'components/StorytellingCover'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledCard = styled(Card)`
overflow: hidden;
width: 100%;
.ant-card-meta {
  text-align: center;
}
.ant-card-meta-title {
  font-size: 1em;
  margin-bottom: 0 !important;
}
.ant-card-meta-description {
  font-size: 0.9em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
`

type StorytellingCardProps = {
  storytelling: any
}

export default function StorytellingCard ({ storytelling }: StorytellingCardProps) {
  const authors = useMemo(() => {
    const authors: any[] = storytelling?.authors || []
    return authors.reduce((a, c, i, arr) => {
      if (i === arr.length - 2) {
        a.push(<Link to={`/users/${c.username}`} className='header-author'>{c.fullName}</Link>)
        a.push(<span> and </span>)
      } else if (i !== arr.length - 1) {
        a.push(<Link to={`/users/${c.username}`} className='header-author'>{c.fullName}</Link>)
        a.push(<span>, </span>)
      } else {
        a.push(<Link to={`/users/${c.username}`} className='header-author'>{c.fullName}</Link>)
      }
      return a
    }, [])
  }, [storytelling?.authors])
  return (
    <Link to={`/storytellings/${storytelling.id}`}>
      <StyledCard
        size='small'
        cover={
          <StorytellingCover storytelling={storytelling} style={{ borderRadius: 8 }}/>
        }
      >
        <Card.Meta
          title={storytelling.title}
          description={authors}
        />
      </StyledCard>
    </Link>
  )
}
