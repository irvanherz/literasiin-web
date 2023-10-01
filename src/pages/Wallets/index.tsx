/* eslint-disable no-unused-vars */
import Layout from 'components/Layout'
import PageHeader from 'components/PageHeader'
import RouteGuard from 'components/RouteGuard'
import useWallets from 'hooks/useWallets'
import analytics from 'libs/analytics'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet'
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
      <Layout.Default
        beforeContent={
          <PageHeader
            title='Dompet'
            description='Isi saldo, penarikan dan histori transaksi'
          />
        }
      >
        {!!activeWallet && <WalletManager wallet={activeWallet}/>}
        <Helmet>
          <title>My Wallet - Literasiin</title>
        </Helmet>
      </Layout.Default>
    </RouteGuard>
  )
}
