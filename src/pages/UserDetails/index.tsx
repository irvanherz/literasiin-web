import { Cog6ToothIcon, ShareIcon } from '@heroicons/react/24/solid'
import { Tabs } from 'antd'
import Layout from 'components/Layout'
import PageHeader from 'components/PageHeader'
import ProfileShareButton from 'components/ProfileShareButton'
import RouteGuard from 'components/RouteGuard'
import RenderTimeFromNow from 'components/shared/RenderTimeFromNow'
import useCurrentUser from 'hooks/useCurrentUser'
import analytics from 'libs/analytics'
import { DEFAULT_PHOTO } from 'libs/variables'
import { useEffect, useMemo } from 'react'
import { Helmet } from 'react-helmet'
import { FormattedMessage } from 'react-intl'
import { useQuery } from 'react-query'
import { Link, useParams } from 'react-router-dom'
import UsersService from 'services/Users'
import AnnouncementsSection from './AnnouncementsSection'
import ChatButton from './ChatButton'
import FollowButton from './FollowButton'
import FollowerButton from './FollowersButton'
import FollowingButton from './FollowingButton'
import ProfileCard from './ProfileCard'
import PublicationsTab from './PublicationsTab'
import ReadingListTab from './ReadingListTab'
import UserArticlesTab from './UserArticlesTab'
import UserOrdersTab from './UserOrdersTab'
import UserStoriesTab from './UserStoriesTab'
import WalletCard from './WalletCard'

export default function UserDetails () {
  const params = useParams()
  const currentUser = useCurrentUser()
  const username = params?.username
  const { data, refetch } = useQuery(`users[${username}]`, () => UsersService.findByUsername(username!), { enabled: !!username })
  const user = data?.data

  const { data: dataContext, refetch: refetchContext } = useQuery(`users[${username}].context`, () => UsersService.findContextById(user?.id), { enabled: !!user?.id })
  const context = dataContext?.data

  const photo = user?.photo?.meta?.objects?.find?.((object: any) => object.id === 'sm')

  const tabItems = useMemo(() => {
    const res = [
      { key: 'stories', tabKey: 'stories', label: <FormattedMessage defaultMessage="Stories" />, children: <UserStoriesTab user={user} /> },
      { key: 'articles', tabKey: 'articles', label: <FormattedMessage defaultMessage="Articles" />, children: <UserArticlesTab user={user}/> },
      { key: 'reading-list', tabKey: 'reading-list', label: <FormattedMessage defaultMessage="Reading List" />, children: <ReadingListTab user={user} /> }
    ]
    if (currentUser && currentUser?.id === user?.id) {
      res.push({ key: 'publications', tabKey: 'publications', label: <FormattedMessage defaultMessage="Publications" />, children: <PublicationsTab user={user}/> })
      res.push({ key: 'orders', tabKey: 'orders', label: <FormattedMessage defaultMessage="Orders" />, children: <UserOrdersTab user={user}/> })
    }
    return res
  }, [user, currentUser])

  useEffect(() => {
    analytics.page({
      title: user?.username ? `${user.fullName} (@${user.username}) - Literasiin` : 'Literasiin',
      url: window.location.href
    })
  }, [user])

  return (
    <RouteGuard require={username === 'me' ? 'authenticated' : undefined}>
      <Layout.Default
        beforeContent={
          <PageHeader
            className='bg-slate-50'
            title={
              <div className='space-y-2 font-normal text-center'>
                <div className='flex-none'>
                  <div className="avatar shadow-md">
                    <div className="w-32 rounded">
                      <img src={photo?.url || DEFAULT_PHOTO} />
                    </div>
                  </div>
                </div>
                <div className='flex-1'>
                  <div className='font-black text-xl'>{user?.fullName}</div>
                  <div className='text-slate-600 text-sm'>@{user?.username}</div>
                </div>
                <div className='space-x-2'>
                  <FollowButton user={user} context={context} afterUpdated={refetchContext}/>
                  <ChatButton user={user} />
                </div>
                <div className='space-x-2'>
                  <FollowerButton user={user} context={context} />
                  <FollowingButton user={user} context={context} />
                </div>
              </div>
            }
          />
        }
      >
        <div>
          <div className='bg-slate-50 border-b py-2'>
            <div className='container flex items-center gap-2'>
              <div className='flex-1 text-sm'>
                <span className='text-slate-600'>Bergabung sejak <RenderTimeFromNow timestamp={user?.createdAt} /></span>&nbsp;&nbsp;&middot;&nbsp;&nbsp;
                <span className='text-slate-600'>Terakhir masuk <RenderTimeFromNow timestamp={user?.lastLoginAt} /></span>
              </div>
              <div className='flex-0 flex gap-2'>
                {currentUser?.id === user?.id && <Link to='/users/me/edit' className='btn btn-sm'><Cog6ToothIcon className='w-4' /><span className='hidden md:inline'>Edit Profil</span></Link>}
                <ProfileShareButton user={user}>
                  <button className='btn btn-sm'><ShareIcon className='w-4' /></button>
                </ProfileShareButton>
              </div>
            </div>
          </div>
          <div className='pt-4 space-y-4'>
            <div className='container flex flex-col md:flex-row gap-4'>
              <div className='w-full md:w-1/4'>
                <div className="space-y-4 relative md:sticky top-auto md:top-[72px]">
                  <WalletCard user={user} />
                  <ProfileCard user={user || {}} afterUpdated={refetch} />
                </div>
              </div>
              <div className='w-full md:w-3/4'>
                <Tabs
                  items={tabItems}
                />
              </div>
            </div>
            <AnnouncementsSection />
          </div>
        </div>
        <Helmet>
          <title>{user?.username ? `${user.fullName} (@${user.username}) - Literasiin` : 'Literasiin'}</title>
        </Helmet>
      </Layout.Default>
    </RouteGuard>
  )
}
