import { message, Space } from 'antd'
import { copyToClipboard, HOME_URL } from 'libs/common'
import qs from 'qs'

type StoryChapterShareSegmentProps = {
  story: any
  chapter: any
}

export default function StoryChapterShareSegment ({ story, chapter }: StoryChapterShareSegmentProps) {
  const chapterId = chapter.id
  const storyUrl = `${HOME_URL}/stories/chapters/${chapterId}`
  const whatsappUrl = 'https://api.whatsapp.com/send' + qs.stringify({ text: `Baca cerita "${story.title}: ${chapter.title}" di Literasiin. \n${storyUrl}` }, { addQueryPrefix: true })
  const facebookUrl = 'https://www.facebook.com/sharer/sharer.php' + qs.stringify({ u: storyUrl, quote: `Baca cerita "${story.title}: ${chapter.title}" di Literasiin` }, { addQueryPrefix: true })
  const twitterUrl = 'https://twitter.com/intent/tweet' + qs.stringify({ text: `Baca cerita "${story.title}: ${chapter.title}" di Literasiin. ${storyUrl}` }, { addQueryPrefix: true })
  const mailUrl = 'mailto:' + qs.stringify({ subject: `Baca cerita "${story.title}: ${chapter.title}"`, body: `Baca cerita "${story.title}: ${chapter.title}" di Literasiin. \n${storyUrl}` }, { addQueryPrefix: true })

  const handleCopyLink = (e: any) => {
    e?.preventDefault()
    copyToClipboard(storyUrl)
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
