import { Space, Typography } from 'antd'
import StorytellingCover from 'components/StorytellingCover'
import { useMemo } from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Wrapper = styled.div`
font-size: 14px;
display: flex;
flex-direction: column;
align-items: center;
text-align: center;
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
  font-weight: normal;
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
  storytelling: any
}

export default function Header ({ storytelling }:HeaderProps) {
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
    <Wrapper>
      <div className='header-1'>
        <div style={{ maxWidth: 120, margin: 'auto' }}>
          <StorytellingCover storytelling={storytelling} containerStyle={{ borderRadius: 8, overflow: 'hidden' }}/>
        </div>
      </div>
      <div className='header-2'>
        <Space direction='vertical' style={{ width: '100%' }}>
          <Typography.Title className='header-title'>{storytelling?.title || 'Tanpa Judul'}</Typography.Title>
          <div>
            <span>By </span>
            {authors}
          </div>
          <div>{storytelling?.description || <i>No description</i>}</div>
          <Space style={{ textAlign: 'center' }} size={24}>
            <div>
              <div>{storytelling?.meta?.numListeners || 0}</div>
              <Typography.Text type='secondary'><FormattedMessage defaultMessage='Listeners' /></Typography.Text>
            </div>
            <div>
              <div>{storytelling?.meta?.numVotes || 0}</div>
              <Typography.Text type='secondary'><FormattedMessage defaultMessage='Likes' /></Typography.Text>
            </div>
            <div>
              <div>{storytelling?.meta?.numPublishedEpisodes || 0}</div>
              <Typography.Text type='secondary'><FormattedMessage defaultMessage='Episodes' /></Typography.Text>
            </div>
          </Space>
        </Space>
      </div>
    </Wrapper>
  )
}
