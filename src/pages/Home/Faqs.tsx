/* eslint-disable no-unreachable */
import { useState } from 'react'

type FaqsProps = {
  config: any
}
export default function Faqs ({ config }: FaqsProps) {
  const faqs: any[] = config?.faqs || []
  const [currentCollapsedId, setCurrentCollapsedId] = useState('')

  return (
    <div className='py-8 space-y-4'>
      <div className='container font-black text-2xl text-center'>
        FAQ
      </div>
      <div className='container space-y-2'>
        {faqs.map(faq => (
          <div key={faq.id} className="collapse bg-white shadow">
            <input type="radio" checked={currentCollapsedId === faq.id } onChange={e => setCurrentCollapsedId(faq.id)} />
            <div className="collapse-title text-lg font-bold">{faq.question}</div>
            <div className="collapse-content">
              <p dangerouslySetInnerHTML={{ __html: faq.answer }}></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
