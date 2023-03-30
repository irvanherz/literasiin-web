import { Space, Typography } from 'antd'
import StoryCover from 'components/StoryCover'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Wrapper = styled.div`
display: flex;
width: 100%;
gap: 16px;
@media only screen and (max-width: 500px) {
  flex-direction: column;
}
.header-1 {
  width: 150px;
  text-align: center;
  @media only screen and (max-width: 500px) {
    width: auto;
    flex: 1;
  }
}
.header-2 {
  flex: 1;
  .header-title {
    font-size: 2em;
    margin: 0;
    padding: 0;
    @media only screen and (max-width: 500px) {
      font-size: 1.4em;
    }
  }
  .header-author {

  }
  @media only screen and (max-width: 500px) {
    text-align: center;
  }
}
`

type HeaderProps = {
  story: any
}

export default function Header ({ story }:HeaderProps) {
  const authors = useMemo(() => {
    const writers: any[] = story?.writers || []
    return writers.reduce((a, c, i, arr) => {
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
  }, [story?.writers])

  return (
    <Wrapper>
      <div className='header-1'>
        <div style={{ maxWidth: 150, margin: 'auto' }}>
          <StoryCover story={story} containerStyle={{ borderRadius: 8, overflow: 'hidden' }}/>
        </div>
      </div>
      <div className='header-2'>
        <Space direction='vertical' style={{ width: '100%' }}>
          <Typography.Title className='header-title'>{story?.title}</Typography.Title>
          <div style={{ paddingBottom: 24 }}>
            <span>By </span>
            {authors}
          </div>
          <Space style={{ textAlign: 'center' }} size={24}>
            <div>
              <div>{story?.meta?.numViews || 0}</div>
              <div>Reads</div>
            </div>
            <div>
              <div>{story?.meta?.numVotes || 0}</div>
              <div>Votes</div>
            </div>
            <div>
              <div>{story?.numChapters}</div>
              <div>Chapters</div>
            </div>
          </Space>
        </Space>
      </div>
    </Wrapper>
  )
}
