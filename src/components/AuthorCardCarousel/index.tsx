import { Carousel } from 'antd'
import styled from 'styled-components'
import AuthorCard from './AuthorCard'

const StyledCarousel = styled(Carousel)`
.slick-slide > div {
  padding: 8px;
  img {
    border-radius: 8px;
  }
}
`

const CAROUSEL_SETTINGS = {
  swipe: true,
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1
}

const DUMMY = [1, 2, 3, 4, 5]

export default function AuthorCardCarousel () {
  return (
    <StyledCarousel {...CAROUSEL_SETTINGS}>
      {DUMMY.map(author => (
        <AuthorCard key='key' user={author} />
      ))}
    </StyledCarousel>
  )
}
