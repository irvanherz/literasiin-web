import { Result, Spin } from 'antd'
import { ReactElement } from 'react'

type ContentGatewayProps = {
  status: 'idle' | 'error' | 'loading' | 'success'
  error: any
  data: any
  children: ReactElement
}

export default function ContentGateway ({ status, error, data, children }: ContentGatewayProps) {
  if (status === 'idle') {
    return null
  } else if (status === 'error') {
    return (
      <Result
        status='error'
        title='Error'
        subTitle={error?.message || 'Something went wrong'}
      />
    )
  } else if (status === 'success') {
    return children
  } else {
    return (
      <Spin spinning>
        {data ? children : null}
      </Spin>
    )
  }
}
