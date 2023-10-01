import { ArrowRightIcon } from '@heroicons/react/24/solid'
import useCurrentUser from 'hooks/useCurrentUser'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import WalletsService from 'services/Wallets'

const formatter = new Intl.NumberFormat('id-ID')

type WalletCardProps = { user: any}
export default function WalletCard ({ user }: WalletCardProps) {
  const currentUser = useCurrentUser()
  const canLoad = currentUser?.id === user?.id
  const { data } = useQuery('wallets[me]', () => WalletsService.findMany({ userId: 'me' }), { enabled: canLoad })

  const wallet = data?.data?.[0]

  const formattedBalance = formatter.format(+wallet?.balance || 0)

  return (currentUser && canLoad && wallet)
    ? (
      <div className='shadow-md rounded-lg bg-emerald-700 text-white px-4 py-2 flex items-center'>
        <div className='flex-1'>
          <div className='font-black text-2xl'>{formattedBalance}</div>
          <div className='text-sm'>KOIN</div>
        </div>
        <div className='flex-none'>
          <Link to='/wallets'>
            <button className='btn btn-sm btn-circle btn-ghost'><ArrowRightIcon className='w-4' /></button>
          </Link>
        </div>
      </div>
      )
    : null
}
