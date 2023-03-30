import { Button, Col, Row, Space } from 'antd'
import PageWidthAdapter from 'components/PageWidthAdapter'
import useAuthContext from 'hooks/useAuthContext'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import image1 from './images/image1.png'

const Wrapper = styled.div`
background: #DCFF03;
padding: 32px 0 64px 0;
border-radius: 0 0 32px 32px;
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
`

export default function Header () {
  const auth = useAuthContext()
  return (
    <Wrapper>
      <PageWidthAdapter>
        <Row style={{ alignItems: 'center' }}>
          <Col span={14}>
            <div className='text-1'>Portal <span className='style-1'>Menulis</span> dan Menerbitkan <span className='style-1'>Buku</span> Jadi Lebih <span className='style-1'>Menyenangkan!</span></div>
            <div className='text-2'>Mau bangun ceritamu lebih menarik? Tapi bingung gimana caranya? Yuk tulis, temukan banyak pembaca dan temukan banyak penerbit.</div>
            <div className='action-1'>
              {auth.status === 'unauthenticated' && (
                <Space>
                  <Link to='/auth/signup'>
                    <Button type='default'>Daftar</Button>
                  </Link>
                  <Link to='/auth/signin'>
                    <Button type='primary'>Masuk</Button>
                  </Link>
                </Space>
              )}
            </div>
          </Col>
          <Col span={10}>
            <img src={image1} style={{ width: '100%' }} />
          </Col>
        </Row>
      </PageWidthAdapter>
    </Wrapper>
  )
}
