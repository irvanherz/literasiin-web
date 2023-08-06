import Layout from 'components/Layout'
import RouteGuard from 'components/RouteGuard'
import useWallets from 'hooks/useWallets'
import analytics from 'libs/analytics'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { FormattedMessage } from 'react-intl'
import WalletManager from './WalletManager'

export default function Wallets () {
  const { data } = useWallets({ userId: 'me' })
  const wallets = data?.data || []
  const activeWallet = wallets[0]

  useEffect(() => {
    analytics.page({
      title: 'My Wallet - Literasiin',
      url: window.location.href
    })
  }, [])

  return (
    <RouteGuard require='authenticated'>
      <Layout.Default>
        <Layout.Scaffold
          title={<FormattedMessage defaultMessage='Wallet'/>}
          description={<FormattedMessage defaultMessage='Manage my wallets'/>}
          bodyStyle={{ padding: '24px 0', maxWidth: 900, margin: 'auto' }}
        >
          {activeWallet && <WalletManager wallet={activeWallet}/>}
        </Layout.Scaffold>
        <Helmet>
          <title>My Wallet - Literasiin</title>
        </Helmet>
      </Layout.Default>
    </RouteGuard>
  )
}
