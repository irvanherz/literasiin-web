import { Carousel } from 'antd'
import PageWidthAdapter from 'components/PageWidthAdapter'
import { DEFAULT_IMAGE } from 'libs/variables'
import styled from 'styled-components'

const BannerItemContainer = styled.div`
position: relative;
padding-top: 50%;
img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
`

type BannerItemProps = {
  banner: any
}

function BannerItem ({ banner }: BannerItemProps) {
  return (
    <BannerItemContainer>
      <img alt={banner.title} src={banner.imageUrl || DEFAULT_IMAGE} />
    </BannerItemContainer>
  )
}

const BannerContainer = styled.div`
.banner-element {
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

const CAROUSEL_SETTINGS = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1
}

export default function Banner () {
  const banners = [1, 1, 1, 1, 1]
  return (
    <BannerContainer {...CAROUSEL_SETTINGS}>
      <PageWidthAdapter>
        <Carousel className='banner-element' {...CAROUSEL_SETTINGS}>
          {banners.map(banner => (
            <BannerItem key='key' banner={banner} />
          ))}
        </Carousel>
      </PageWidthAdapter>
    </BannerContainer>
  )
}
