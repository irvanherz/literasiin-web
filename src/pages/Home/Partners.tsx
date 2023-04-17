import { Avatar, Space, Typography } from 'antd'
import PageWidthAdapter from 'components/PageWidthAdapter'
import { DEFAULT_PHOTO } from 'libs/variables'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'

const Wrapper = styled.div`
.section-1 {
  text-align: center;
}
.section-2 {
  background: #0F3857;
}
.section-2-inner{
  padding: 48px 0;
  text-align: center;
}
`

type PartnersProps = {
  config: any
}

export default function Partners ({ config }: PartnersProps) {
  const partners = config?.partners || []

  return (
    <Wrapper>
      <div className='section-1'>
        <Typography.Title><FormattedMessage defaultMessage='Our Partners' />:</Typography.Title>
      </div>
      <div className='section-2'>
        <PageWidthAdapter>
          <div className='section-2-inner'>
            <Space size={32}>
              {partners.map((partner: any) => (
                <Avatar key={partner.id} size={64} src={partner?.image || DEFAULT_PHOTO} />
              ))}
            </Space>
          </div>
        </PageWidthAdapter>
      </div>
    </Wrapper>
  )
}
