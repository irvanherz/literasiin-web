import { Duration } from 'dayjs/plugin/duration'
import { htmlToText } from 'html-to-text'

export const HOME_URL = window.location.protocol + '//' + window.location.host

function fallbackCopyTextToClipboard (text: string) {
  const textArea = document.createElement('textarea')
  textArea.value = text

  // Avoid scrolling to bottom
  textArea.style.top = '0'
  textArea.style.left = '0'
  textArea.style.position = 'fixed'

  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()

  try {
    const successful = document.execCommand('copy')
    const msg = successful ? 'successful' : 'unsuccessful'
    console.log('Fallback: Copying text command was ' + msg)
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err)
  }

  document.body.removeChild(textArea)
}

export function copyToClipboard (text: string) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text)
    return
  }
  navigator.clipboard.writeText(text).then(function () {
    // console.log('Async: Copying to clipboard was successful!')
  }, function (err) {
    console.error('Async: Could not copy text: ', err)
    return false
  })
}

export function titleCase (s: string) {
  if (!(typeof s === 'string' && s.length > 0)) return s
  return s.replace(
    /\w\S*/g,
    function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
    }
  )
}

export function formatAudioDuration (duration: Duration) {
  if (!duration) return null
  const h = duration.asHours()
  return h > 1
    ? duration.format('hh:mm:ss')
    : duration.format('mm:ss')
};

export function fileToDataURL(file:File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
  })
}

export function countWords(str: string = '') {
  return (str || '').trim().split(/\s+/).length
}

export function esimateReadingTimeInMinutes(html: string = '') {
  const cleanStr = htmlToText(html)
  const numWords = countWords(cleanStr)
  const minutes = Math.ceil(numWords / 200)
  return minutes
}
