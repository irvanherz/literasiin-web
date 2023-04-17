import { message, Space } from 'antd'
import { copyToClipboard, HOME_URL } from 'libs/common'
import qs from 'qs'

type ArticleShareSegmentProps = {
  article: any
}

export default function ArticleShareSegment ({ article }: ArticleShareSegmentProps) {
  const articleId = article?.id || 0
  const articleUrl = `${HOME_URL}/articles/${articleId}`
  const whatsappUrl = 'https://api.whatsapp.com/send' + qs.stringify({ text: `Baca artikel "${article.title}" di Literasiin. ${articleUrl}` }, { addQueryPrefix: true })
  const facebookUrl = 'https://www.facebook.com/sharer/sharer.php' + qs.stringify({ u: articleUrl, quote: `Baca artikel "${article.title}" di Literasiin.` }, { addQueryPrefix: true })
  const twitterUrl = 'https://twitter.com/intent/tweet' + qs.stringify({ text: `Baca artikel "${article.title}" di Literasiin. ${articleUrl}` }, { addQueryPrefix: true })
  const mailUrl = 'mailto:' + qs.stringify({ subject: `Baca artikel "${article.title}"`, body: `Baca artikel "${article.title}" di Literasiin. ${articleUrl}` }, { addQueryPrefix: true })

  const handleCopyLink = (e: any) => {
    e?.preventDefault()
    copyToClipboard(articleUrl)
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
