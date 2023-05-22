import { Button, Result } from 'antd'
import Layout from 'components/Layout'
import { FormattedMessage } from 'react-intl'
import { useNavigate } from 'react-router-dom'

export default function NotFound () {
  const navigate = useNavigate()
  const handleBack = () => {
    navigate(-1)
  }
  return (
    <Layout.Blank>
      <Result
        status='404'
        title={<FormattedMessage defaultMessage="Page Not Found" />}
        subTitle={<FormattedMessage defaultMessage="The specified page that you requested was not found" />}
        extra={<Button onClick={handleBack}><FormattedMessage defaultMessage="Back" /></Button>}
      />
    </Layout.Blank>
  )
}
