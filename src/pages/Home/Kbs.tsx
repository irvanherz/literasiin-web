import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Button, Card, Carousel, CarouselProps, Col, Row } from 'antd'
import PageWidthAdapter from 'components/PageWidthAdapter'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import image2 from './images/image2.png'

const KbItemContainer = styled.div`
position: relative;
padding-bottom: 150%;
.kb-card {
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  background: #D9D9D9;
  border: none;
}
.kb-card-content {
  text-align: left;
  font-weight: 900;
  font-size: 1.5em;
  color: #2F327D;
}
`

type KbItemProps = {
  kb: any
}

function KbItem ({ kb }: KbItemProps) {
  return (
    <KbItemContainer>
      <Link to={kb?.url || '#'}>
        <Card className='kb-card'>
          <div className='kb-card-content'>
            <div dangerouslySetInnerHTML={{ __html: kb?.title || '?' }}></div>
          </div>
        </Card>
      </Link>

    </KbItemContainer>
  )
}

const KbContainer = styled.div`
.kb-recommendations {
  margin-bottom: -48px;

  .ant-carousel .slick-prev,
  .ant-carousel .slick-prev:hover {
    left: 10px;
    z-index: 2;
    color: black;
    font-size: 20px;
    height: 30px;
  }
  
  .ant-carousel .slick-next,
  .ant-carousel .slick-next:hover {
    right: 10px;
    z-index: 2;
    color: black;
    font-size: 20px;
    height: 30px;
  }
  .kb-element {
    width: 100%;
    margin: 0 -8px;
    .slick-slide > div {
      padding: 8px;
      img {
        border-radius: 8px;
      }
    }  
  }
}
.kb-intro {
  background: #DCFF03;
  padding: 32px 0;
  .text-1 {
    font-size: 2.4em;
    font-weight: 900;
    padding-bottom: 16px;
    .style-1 {
      color: #2F327D;
    }
  }
  .text-2 {
    font-size: 1.2em;
    font-weight: 500;
    padding-bottom: 24px;
  }
}
`

const CAROUSEL_SETTINGS: CarouselProps = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  arrows: true,
  prevArrow: <LeftOutlined />,
  nextArrow: <RightOutlined />,
  responsive: [
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 1
      }
    },
    {
      breakpoint: 920,
      settings: {
        slidesToShow: 3
      }
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4
      }
    }
  ]
}

type KbsProps = {
  config: any
}

export default function Kbs ({ config }: KbsProps) {
  const kbs: any[] = config?.kbs || []

  return (
    <KbContainer {...CAROUSEL_SETTINGS}>
      <div className='kb-recommendations'>
        <PageWidthAdapter>
          <Carousel className='kb-element' {...CAROUSEL_SETTINGS}>
            {kbs.map(kb => (
              <KbItem key='key' kb={kb} />
            ))}
          </Carousel>
        </PageWidthAdapter>
      </div>
      <div className='kb-intro'>
        <PageWidthAdapter>
          <Row style={{ alignItems: 'center' }}>
            <Col span={14}>
              <div className='text-1'>Cari tahu lebih banyak Panduan Pengguna<br/><span className='style-1'>Agar kamu semakin paham</span></div>
              <div className='text-2'>Yuk baca panduan Literasiin dan manfaatkan fitur-fitur yang sudah kami siapkan untukmu.</div>
              <div className='action-1'>
                <Link to='/hc'>
                  <Button type='default'>Baca Sekarang!</Button>
                </Link>
              </div>
            </Col>
            <Col span={10}>
              <img src={image2} style={{ width: '100%', marginBottom: -72 }} />
            </Col>
          </Row>
        </PageWidthAdapter>
      </div>

    </KbContainer>
  )
}
