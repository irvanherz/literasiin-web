import { message, Space } from 'antd'
import { copyToClipboard, HOME_URL } from 'libs/common'
import qs from 'qs'

type ProfileShareSegmentProps = {
  user: any
}

export default function ProfileShareSegment ({ user }: ProfileShareSegmentProps) {
  const username = user?.username
  const profileUrl = `${HOME_URL}/users/${username}`
  const whatsappUrl = 'https://api.whatsapp.com/send' + qs.stringify({ text: `Lihat profil ${user?.username} di Literasiin. ${profileUrl}` }, { addQueryPrefix: true })
  const facebookUrl = 'https://www.facebook.com/sharer/sharer.php' + qs.stringify({ u: profileUrl, quote: `Lihat profil ${user?.username} di Literasiin` }, { addQueryPrefix: true })
  const twitterUrl = 'https://twitter.com/intent/tweet' + qs.stringify({ text: `Lihat profil ${user?.username}" di Literasiin. ${profileUrl}` }, { addQueryPrefix: true })
  const mailUrl = 'mailto:' + qs.stringify({ subject: `Lihat profil ${user?.username}`, body: `Lihat profil ${user?.username} di Literasiin. ${profileUrl}` }, { addQueryPrefix: true })

  const handleCopyLink = (e: any) => {
    e?.preventDefault()
    copyToClipboard(profileUrl)
    message.success('Link copied to clipboard')
  }

  return (
    <Space style={{ width: '100%', justifyContent: 'center' }}>
      <a target='_blank' href={whatsappUrl} className='share-link' rel="noreferrer">
        <img className='share-image' src={`${process.env.PUBLIC_URL}/assets/icons/whatsapp-32x32.png`} />
      </a>
      <a target='_blank' href={facebookUrl} className='share-link' rel="noreferrer">
        <img className='share-image' src={`${process.env.PUBLIC_URL}/assets/icons/facebook-32x32.png`} />
      </a>
      <a target='_blank' href={twitterUrl} className='share-link' rel="noreferrer">
        <img className='share-image' src={`${process.env.PUBLIC_URL}/assets/icons/twitter-32x32.png`} />
      </a>
      <a target='_blank' href={mailUrl} className='share-link' rel="noreferrer">
        <img className='share-image' src={`${process.env.PUBLIC_URL}/assets/icons/mail-32x32.png`} />
      </a>
      <a href="#" onClick={handleCopyLink} className='share-link'>
        <img className='share-image' src={`${process.env.PUBLIC_URL}/assets/icons/copy-32x32.png`} />
      </a>
    </Space>
  )
}
