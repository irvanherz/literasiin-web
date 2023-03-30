import { Button, Card, List, Space } from 'antd'
import StoryCover from 'components/StoryCover'
import { DEFAULT_IMAGE } from 'libs/variables'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const PublicationItemWrapper = styled(List.Item)`

`

function PublicationItem () {
  return (
    <PublicationItemWrapper>
      <Card>
        <Card.Meta
          avatar={
            <div style={{ width: 150 }}>
              <StoryCover src={DEFAULT_IMAGE}/>
            </div>
          }
          title="Judul"
          description="ddsadsasadsa"
        />
      </Card>
    </PublicationItemWrapper>
  )
}

export default function PublicationsTab () {
  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      <Card
        bodyStyle={{ textAlign: 'center' }}
      >
        <Link to='/publications/create'>
          <Button shape='round' type='primary'>Upload Naskah</Button>
        </Link>
      </Card>
      <List
        grid={{ gutter: 16, column: 1 }}
        split={false}
        dataSource={[1, 1, 1, 1, 1]}
        renderItem={pub => <PublicationItem />}
      />
    </Space>
  )
}
