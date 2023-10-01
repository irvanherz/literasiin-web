import useAuthContext from 'hooks/useAuthContext'
import useCurrentUser from 'hooks/useCurrentUser'
import { DEFAULT_PHOTO } from 'libs/variables'
import { Link } from 'react-router-dom'

export default function ProfileMenu () {
  const auth = useAuthContext()
  const user = useCurrentUser()

  const handleSignout = () => {
    auth.setToken(null, null)
  }

  const md = user?.photo?.meta?.objects?.find((object: any) => object.id === 'md')

  const menuItems = [
    {
      key: '/users/me',
      label: <Link to={'/users/me'}>Profil</Link>
    },
    {
      key: '/stories/mine',
      label: <Link to={'/stories/mine'}>Ceritaku</Link>
    },
    {
      key: '/articles/mine',
      label: <Link to={'/articles/mine'}>Artikelku</Link>
    },
    {
      key: '/storytellings/mine',
      label: <Link to={'/storytellings/mine'}>Storytellingku</Link>
    },
    {
      key: '/notifications',
      label: <Link to={'/notifications'}>Notifikasi</Link>
    },
    {
      key: '/chats',
      label: <Link to={'/chats'}>Pesan</Link>
    },
    {
      key: 'signout',
      label: <span className='text-red-600' onClick={handleSignout}>Keluar</span>
    }
  ]

  return (
    <>
      <div className="drawer drawer-end">
        <input id="profile-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex">
          <label htmlFor="profile-drawer" className="btn btn-sm btn-circle overflow-hidden drawer-button">
            <img src={md?.url || DEFAULT_PHOTO} />
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="profile-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 min-h-full text-slate-800 bg-white">
            <div className='text-center pb-4'>
              <div className="avatar mb-2">
                <div className="w-24 rounded-xl">
                  <img src={md?.url || DEFAULT_PHOTO} />
                </div>
              </div>
              <div style={{ fontWeight: 800 }}>{user?.fullName}</div>
              <div>@{user?.username}</div>
            </div>
            {menuItems.map(menu => (
              <li className='font-bold text-base md:text-lg' key={menu.key}>{menu.label}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
