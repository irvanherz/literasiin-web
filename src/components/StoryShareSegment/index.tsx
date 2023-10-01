import { message, Space } from 'antd'
import analytics from 'libs/analytics'
import { copyToClipboard, HOME_URL } from 'libs/common'
import { slugifyContentId } from 'libs/slug'
import qs from 'qs'

type StoryShareSegmentProps = {
  story: any
}

export default function StoryShareSegment ({ story }: StoryShareSegmentProps) {
  const storyId = story?.id
  const storyUrl = `${HOME_URL}/stories/${slugifyContentId(story)}`
  const whatsappUrl = 'https://api.whatsapp.com/send' + qs.stringify({ text: `Baca cerita "${story?.title}" di Literasiin. ${storyUrl}` }, { addQueryPrefix: true })
  const facebookUrl = 'https://www.facebook.com/sharer/sharer.php' + qs.stringify({ u: storyUrl, quote: `Baca cerita "${story?.title}" di Literasiin.` }, { addQueryPrefix: true })
  const twitterUrl = 'https://twitter.com/intent/tweet' + qs.stringify({ text: `Baca cerita "${story?.title}" di Literasiin. ${storyUrl}` }, { addQueryPrefix: true })
  const mailUrl = 'mailto:' + qs.stringify({ subject: `Baca cerita "${story?.title}"`, body: `Baca cerita "${story?.title}" di Literasiin. ${storyUrl}` }, { addQueryPrefix: true })

  const trackShare = (method:string) => {
    analytics.track('share', {
      method,
      content_type: 'story',
      item_id: storyId
    })
  }

  const handleCopyLink = (e: any) => {
    e?.preventDefault()
    copyToClipboard(storyUrl)
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
