import { InputNumberProps, message } from 'antd'
import classNames from 'classnames'
import RenderTimeFromNow from 'components/shared/RenderTimeFromNow'
import useCustomComponent from 'hooks/useCustomComponent'
import useWalletTransactions from 'hooks/useWalletTransactions'
import { useState } from 'react'
import { useMutation } from 'react-query'
import { Link } from 'react-router-dom'
import FinancesService from 'services/Finances'
import WalletsService from 'services/Wallets'

declare const window: any
const formatter = new Intl.NumberFormat('id-ID')

function TransactionsEmpty() {
  return (
    <div className="text-center py-8">
      <div className="inline-flex rounded-full bg-yellow-100 p-2">
        <div className="rounded-full stroke-yellow-600 bg-yellow-200 p-2">
          <svg className="w-8 h-8" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.0002 9.33337V14M14.0002 18.6667H14.0118M25.6668 14C25.6668 20.4434 20.4435 25.6667 14.0002 25.6667C7.55684 25.6667 2.3335 20.4434 2.3335 14C2.3335 7.55672 7.55684 2.33337 14.0002 2.33337C20.4435 2.33337 25.6668 7.55672 25.6668 14Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
        </div>
      </div>
      <h1 className="mt-4 font-bold text-slate-800 text-2xl">Belum Ada Transaksi</h1>
      <p className="text-slate-600 mt-2 text-base">Anda belum pernah melakukan transaksi koin</p>
    </div>
  )
}

const RECOMMENDED_AMOUNT = [
  { label: '10 koin', value: 10 },
  { label: '25 koin', value: 25 },
  { label: '50 koin', value: 50 },
  { label: '100 koin', value: 100 },
  { label: '500 koin', value: 500 }
]

type CoinAmountInputProps = InputNumberProps

function CoinAmountInput ({ value, defaultValue, onChange }: CoinAmountInputProps) {
  const [computedValue, triggerValueChange] = useCustomComponent({ value, defaultValue, onChange })
  const isOtherAmount = !RECOMMENDED_AMOUNT.some(amount => amount.value === +(computedValue || 0))

  return (
    <div className='space-y-2'>
      <div className='space-x-1'>
        {RECOMMENDED_AMOUNT.map(amount => (
          <button key={amount.value} className={classNames('btn btn-xs', amount.value === computedValue && 'btn-primary')} onClick={() => triggerValueChange(amount.value)}>{amount.label}</button>
        ))}
        <button key='o' className={classNames('btn btn-xs', isOtherAmount && 'btn-primary')} onClick={() => triggerValueChange(0)}>Lain</button>
      </div>
      <div>
        <input
          type='number'
          step={1}
          min={10}
          max={1000000}
          className='input input-bordered min-w-0 w-full max-w-md text-center font-black'
          value={+(computedValue || 0)}
          onChange={e => triggerValueChange(e.target.valueAsNumber)}
        />
      </div>
    </div>
  )
}

type TransactionsProps = {
  wallet: any
}
function Transactions ({ wallet }: TransactionsProps) {
  const { data } = useWalletTransactions({ walletId: wallet.id })
  const transactions: any[] = data?.data || []

  return (
    <div className='space-y-4'>
      <div className="text-sm breadcrumbs hidden md:block">
        <ul>
          <li><Link to='/'>Beranda</Link></li>
          <li>Dompet</li>
          <li>Histori Transaksi</li>
        </ul>
      </div>
      {!transactions.length && <TransactionsEmpty />}
      {!!transactions.length && (
        <div className='space-y-2'>
          {transactions.map(trx => (
            <div key={trx.id} className='relative border rounded-lg flex items-end px-4 py-2 shadow-sm'>
              <div className={`absolute right-0 top-0 rounded-bl-md rounded-tr-md overflow-hidden flex px-2 py-[2px] text-xs text-white font-bold ${trx.type === 'C' ? 'bg-sky-700' : 'bg-red-800'}`}>{trx.type === 'C' ? 'CREDIT' : 'DEBIT'}</div>
              <div className='flex-1'>
                <div className='font-black'>{trx.amount}</div>
                <div className='text-sm'>{trx.description || <i>-</i>}</div>
              </div>
              <div className='flex-none text-sm text-slate-500'>
                <RenderTimeFromNow timestamp={trx.createdAt} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

type TopupProps = {
  wallet: any
}
function Topup ({ wallet }: TopupProps) {
  const [amount, setAmount] = useState(0)
  const canTopup = amount >= 10
  const estimatedPaymentAmount = amount * 1000
  const afterBalance = +wallet.balance + +amount
  const formattedAfterBalance = formatter.format(afterBalance)
  const formattedEstimatedPaymentAmount = formatter.format(estimatedPaymentAmount)

  const initiator = useMutation((amount: number) => WalletsService.createDepositOrder(wallet.id, { amount }))
  const pay = useMutation((paymentId: number) => FinancesService.Orders.pay(paymentId))

  const handleTopup = async () => {
    let order = null
    try {
      const res = await initiator.mutateAsync(amount)
      order = res.data
    } catch (err: any) {
      message.error(err?.message)
      return
    }
    try {
      const orderId = order.id
      const res = await pay.mutateAsync(orderId)
      const snapToken = res?.data?.meta?.token
      window?.snap.pay(snapToken, {
        onSuccess: (result: any) => {
          /* You may add your own implementation here */
          window.location.reload()
        },
        onPending: (result: any) => {
          /* You may add your own implementation here */
        },
        onError: (result: any) => {
          /* You may add your own implementation here */
          window.location.reload()
        },
        onClose: (result: any) => {
          /* You may add your own implementation here */
        }
      })
    } catch (err: any) {
      message.error(err?.message)
    }
  }

  return (
    <div className='space-y-4'>
      <div className="text-sm breadcrumbs hidden md:block">
        <ul>
          <li><Link to='/'>Beranda</Link></li>
          <li>Dompet</li>
          <li>Pengisian</li>
        </ul>
      </div>
      <div className="text-center space-y-2">
        <div>
          <CoinAmountInput
            value={amount}
            onChange={v => setAmount(+(v || 0))}
          />
        </div>
        {canTopup && (
          <div>
            <div>Jumlah yang harus dibayar (belum termasuk PPN): <span className='font-bold'>{formattedEstimatedPaymentAmount}</span></div>
            <div>Saldo setelah pengisian: <span className='font-bold'>{formattedAfterBalance}</span></div>
          </div>
        )}
        <div>
          <button className='btn btn-sm btn-primary' disabled={!canTopup} onClick={handleTopup}>Proses Pengisian Saldo</button>
        </div>
      </div>
    </div>
  )
}

function Withdraw() {
  return (
    <div className='space-y-4'>
      <div className="text-sm breadcrumbs hidden md:block">
        <ul>
          <li><Link to='/'>Beranda</Link></li>
          <li>Dompet</li>
          <li>Penarikan</li>
        </ul>
      </div>
      <div className="text-center py-8">
        <div className="inline-flex rounded-full bg-yellow-100 p-2">
          <div className="rounded-full stroke-yellow-600 bg-yellow-200 p-2">
            <svg className="w-8 h-8" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.0002 9.33337V14M14.0002 18.6667H14.0118M25.6668 14C25.6668 20.4434 20.4435 25.6667 14.0002 25.6667C7.55684 25.6667 2.3335 20.4434 2.3335 14C2.3335 7.55672 7.55684 2.33337 14.0002 2.33337C20.4435 2.33337 25.6668 7.55672 25.6668 14Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
          </div>
        </div>
        <h1 className="mt-4 font-bold text-slate-800 text-2xl">Sedang Masa Pemeliharaan</h1>
        <p className="text-slate-600 mt-2 text-base">Penarikan koin masih belum dapat diakses untuk saat ini, karena masih dalam masa pemeliharaan untuk sementara waktu.</p>
      </div>
    </div>
  )
}

type WalletManagerProps = { wallet: any }
export default function WalletManager ({ wallet }: WalletManagerProps) {
  const formattedBalance = formatter.format(+wallet?.balance || 0)
  const [tab, setTab] = useState('transactions')

  return (
    <div className='container py-4 flex gap-4 flex-col md:flex-row'>
      <div className='w-full md:w-1/3'>
        <div className='border rounded-lg relative md:sticky md:top-[72px] bg-white'>
          <div className='px-4 py-8 text-center border-b'>
            <div className='font-black text-4xl'>{formattedBalance}</div>
            <div className='font-black'>KOIN</div>
          </div>
          <div className='p-2'>
            <ul className="menu menu-horizontal md:menu-vertical bg-white gap-2 rounded-lg">
              <li><a className={tab === 'transactions' ? 'active' : ''} onClick={() => setTab('transactions')}>Histori Transaksi</a></li>
              <li><a className={tab === 'topup' ? 'active' : ''} onClick={() => setTab('topup')}>Pengisian</a></li>
              <li><a className={tab === 'withdraw' ? 'active' : ''} onClick={() => setTab('withdraw')}>Penarikan</a></li>
            </ul>
          </div>
        </div>

      </div>
      <div className='w-full md:w-2/3'>

        {tab === 'transactions' && <Transactions wallet={wallet} />}
        {tab === 'topup' && <Topup wallet={wallet} />}
        {tab === 'withdraw' && <Withdraw />}
      </div>
    </div>
  )
}
