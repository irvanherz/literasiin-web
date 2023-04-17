import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Avatar, Button, Card, Carousel, CarouselProps, Col, List, Row, Space, Typography } from 'antd'
import PageWidthAdapter from 'components/PageWidthAdapter'
import { DEFAULT_IMAGE } from 'libs/variables'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import image2 from './images/image2.png'
import image3 from './images/image3.png'

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
img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
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
          {kb?.type === 'image'
            ? <img src={kb?.imageUrl || DEFAULT_IMAGE} />
            : <div className='kb-card-content'><div dangerouslySetInnerHTML={{ __html: kb?.title || '?' }} /></div>
          }
        </Card>
      </Link>

    </KbItemContainer>
  )
}

const KbContainer = styled.div`
padding-top: 24px;
.kb-intro {
  .text-1 {
    font-size: 2em;
    font-weight: 900;
    padding-bottom: 16px;
    .style-1 {
      color: #2F327D;
    }
  }
  .ant-list-item-meta-title {
    margin: 0;
  }
}
.kb-recommendations {
  margin-bottom: -92px;
  padding-bottom: 64px;
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
.kb-outro {
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
  .action {
    @media only screen and (max-width: 512px) {
      text-align: center;
    }
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
      <div className='kb-intro'>
        <PageWidthAdapter>
          <Row>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} style={{ textAlign: 'center' }}>
              <Space direction='vertical'>
                <div className='text-1'>Bagaimana kami <span className='style-1'>membantumu?</span></div>
                <img src={image3} style={{ width: '100%', maxWidth: 300 }}/>
              </Space>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
              <List
                split={false}
                header={<Typography.Text strong><FormattedMessage defaultMessage='Find more!' /></Typography.Text>}
              >
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={`${process.env.PUBLIC_URL}/assets/images/home/icon1.svg`} style={{ boxShadow: '0 0 10px rgb(0 0 0 / 10%)' }} />}
                    title="Buat Akun terlebih dahulu untuk memulai menulis, membaca dan menerbitkan buku"
                  />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={`${process.env.PUBLIC_URL}/assets/images/home/icon2.svg`} style={{ boxShadow: '0 0 10px rgb(0 0 0 / 10%)' }} />}
                    title="Menulis cerita hingga menerbitkan buku dengan mudah"
                  />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={`${process.env.PUBLIC_URL}/assets/images/home/icon3.svg`} style={{ boxShadow: '0 0 10px rgb(0 0 0 / 10%)' }} />}
                    title="Saat tulisanmu terupload,pembaca dapat membeli dan memberikan tip untuk karyamu dan karyamu akan di bukukan."
                  />
                </List.Item>
              </List>
            </Col>
          </Row>
        </PageWidthAdapter>
      </div>
      <div className='kb-recommendations'>
        <PageWidthAdapter>
          <Carousel className='kb-element' {...CAROUSEL_SETTINGS}>
            {kbs.map(kb => (
              <KbItem key='key' kb={kb} />
            ))}
          </Carousel>
        </PageWidthAdapter>
      </div>
      <div className='kb-outro'>
        <PageWidthAdapter>
          <Row style={{ alignItems: 'center' }}>
            <Col xs={24} sm={24} md={14}>
              <div className='text-1'>Cari tahu lebih banyak Panduan Pengguna<br/><span className='style-1'>Agar kamu semakin paham</span></div>
              <div className='text-2'>Yuk baca panduan Literasiin dan manfaatkan fitur-fitur yang sudah kami siapkan untukmu.</div>
              <div className='action'>
                <Link to='/hc'>
                  <Button type='primary'><FormattedMessage defaultMessage='Read Now!' /></Button>
                </Link>
              </div>
            </Col>
            <Col xs={0} sm={0} md={10}>
              <img src={image2} style={{ width: '100%', marginBottom: -72 }} />
            </Col>
          </Row>
        </PageWidthAdapter>
      </div>

    </KbContainer>
  )
}
