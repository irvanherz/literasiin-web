/* eslint-disable no-unused-vars */
import { Avatar, Card } from 'antd'
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

type TestimonialsProps = {
  config: any
}

export default function Testimonials ({ config }: TestimonialsProps) {
  const testimonials: any[] = config?.testimonials || []

  return (
    <div className='container pb-8'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {testimonials.map(testimonial => (
          <div key={testimonial.id} className='relative p-4 mt-8 border rounded-lg shadow-sm bg-white'>
            <div className="avatar absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 bg-amber-50 p-1 rounded-full">
              <div className="w-16 rounded-full">
                <img src={testimonial?.avatar || DEFAULT_PHOTO } />
              </div>
            </div>
            <div className='mt-8'>
              <p><span dangerouslySetInnerHTML={{ __html: testimonial.review }} /> <span style={{ fontWeight: 600 }}>&mdash;{testimonial.name}</span></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
