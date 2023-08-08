import { message, Space } from 'antd'
import analytics from 'libs/analytics'
import { copyToClipboard, HOME_URL } from 'libs/common'
import qs from 'qs'

type StorytellingShareSegmentProps = {
  storytelling: any
}

export default function StorytellingShareSegment ({ storytelling }: StorytellingShareSegmentProps) {
  const storytellingId = storytelling.id
  const storytellingUrl = `${HOME_URL}/storytellings/${storytellingId}`
  const whatsappUrl = 'https://api.whatsapp.com/send' + qs.stringify({ text: `Baca cerita "${storytelling.title}" di Literasiin. ${storytellingUrl}` }, { addQueryPrefix: true })
  const facebookUrl = 'https://www.facebook.com/sharer/sharer.php' + qs.stringify({ u: storytellingUrl, quote: `Baca cerita "${storytelling.title}" di Literasiin.` }, { addQueryPrefix: true })
  const twitterUrl = 'https://twitter.com/intent/tweet' + qs.stringify({ text: `Baca cerita "${storytelling.title}" di Literasiin. ${storytellingUrl}` }, { addQueryPrefix: true })
  const mailUrl = 'mailto:' + qs.stringify({ subject: `Baca cerita "${storytelling.title}"`, body: `Baca cerita "${storytelling.title}" di Literasiin. ${storytellingUrl}` }, { addQueryPrefix: true })

  const trackShare = (method:string) => {
    analytics.track('share', {
      method,
      content_type: 'storytelling',
      item_id: storytellingId
    })
  }

  const handleCopyLink = (e: any) => {
    e?.preventDefault()
    copyToClipboard(storytellingUrl)
    message.success('Link copied to clipboard')
    trackShare('link')
  }

  return (
    <Space style={{ width: '100%', justifyContent: 'center' }}>
      <a target='_blank' href={whatsappUrl} className='share-link' rel="noreferrer" onClick={() => trackShare('whatsapp')}>
        <img className='share-image' src={`${process.env.PUBLIC_URL}/assets/icons/whatsapp-32x32.png`} />
      </a>
      <a target='_blank' href={facebookUrl} className='share-link' rel="noreferrer" onClick={() => trackShare('facebook')}>
        <img className='share-image' src={`${process.env.PUBLIC_URL}/assets/icons/facebook-32x32.png`} />
      </a>
      <a target='_blank' href={twitterUrl} className='share-link' rel="noreferrer" onClick={() => trackShare('twitter')}>
        <img className='share-image' src={`${process.env.PUBLIC_URL}/assets/icons/twitter-32x32.png`} />
      </a>
      <a target='_blank' href={mailUrl} className='share-link' rel="noreferrer" onClick={() => trackShare('email')}>
        <img className='share-image' src={`${process.env.PUBLIC_URL}/assets/icons/mail-32x32.png`} />
      </a>
      <a href="#" onClick={handleCopyLink} className='share-link'>
        <img className='share-image' src={`${process.env.PUBLIC_URL}/assets/icons/copy-32x32.png`} />
      </a>
    </Space>
  )
}
