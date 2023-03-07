import { Avatar, Card, Carousel, CarouselProps } from 'antd'
import PageWidthAdapter from 'components/PageWidthAdapter'
import { DEFAULT_PHOTO } from 'libs/variables'
import styled from 'styled-components'

const TestimonialItemContainer = styled.div`
position: relative;
padding-bottom: 70%;
.testimonial-card {
  position: absolute;
  top: 50px;
  left: 0;
  width: 100%;
  height: calc(100% - 50px);
}
.testimonial-card-content {
  margin-top: -60px;
  text-align: center;
}
`

type TestimonialItemProps = {
  testimonial: any
}

function TestimonialItem ({ testimonial }: TestimonialItemProps) {
  return (
    <TestimonialItemContainer>
      <Card className='testimonial-card'>
        <div className='testimonial-card-content'>
          <div>
            <Avatar size={72} src={testimonial?.avatar || DEFAULT_PHOTO }/>
          </div>
          <div>
            <p><span dangerouslySetInnerHTML={{ __html: testimonial.review }} /> <span style={{ fontWeight: 600 }}>&mdash;{testimonial.name}</span></p>
          </div>
        </div>
      </Card>
    </TestimonialItemContainer>
  )
}

const TestimonialContainer = styled.div`
.testimonial-element {
  width: 100%;
  margin: 0 -8px;
  .slick-slide > div {
    padding: 8px;
    img {
      border-radius: 8px;
    }
  }  
}
`

const CAROUSEL_SETTINGS: CarouselProps = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: true
}

type TestimonialsProps = {
  config: any
}

export default function Testimonials ({ config }: TestimonialsProps) {
  const testimonials: any[] = config?.testimonials || []

  return (
    <TestimonialContainer {...CAROUSEL_SETTINGS}>
      <PageWidthAdapter>
        <Carousel className='testimonial-element' {...CAROUSEL_SETTINGS}>
          {testimonials.map(testimonial => (
            <TestimonialItem key='key' testimonial={testimonial} />
          ))}
        </Carousel>
      </PageWidthAdapter>
    </TestimonialContainer>
  )
}
