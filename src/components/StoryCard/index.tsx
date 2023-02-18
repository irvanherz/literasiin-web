import { Card } from 'antd'
import StoryCover from 'components/StoryCover'
import { DEFAULT_IMAGE } from 'libs/variables'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
const StyledCard = styled(Card)`
width: 100%;
.cover-wrapper {
  position: relative;
  padding-top: 150%;
  img {
    position: absolute;
    top: 0; left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
`

type StoryCardProps = {
  story: any
}

export default function StoryCard ({ story }: StoryCardProps) {
  return (
    <Link to="/stories/1">
      <StyledCard
        size='small'
        cover={
          <StoryCover src={DEFAULT_IMAGE} />
        }
      >
        <Card.Meta
          title={story.title}
          description={story.description}
        />
      </StyledCard>
    </Link>

  )
}
