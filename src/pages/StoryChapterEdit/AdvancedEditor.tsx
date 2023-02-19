import useCustomComponent from 'hooks/useCustomComponent'
import { isEqual } from 'lodash'
import Quill from 'quill'
import { RefObject, useEffect, useRef, useState } from 'react'
import { QuillOptions } from 'react-quill'
import useDeepCompareEffect from 'use-deep-compare-effect'
const BubbleTheme = Quill.import('themes/bubble')

class ExtendBubbleTheme extends BubbleTheme {
  constructor (quill: any, options: any) {
    super(quill, options)

    quill.on('selection-change', (range: any) => {
      if (range) {
        quill.theme.tooltip.show()
        quill.theme.tooltip.position(quill.getBounds(range))
      }
    })
  }
}

Quill.register('themes/bubble', ExtendBubbleTheme)

export function useEditor (options?: QuillOptions) {
  const ref = useRef<HTMLDivElement>(null)
  const [quill, setQuill] = useState<Quill | null>(null)

  useDeepCompareEffect(() => {
    if (ref.current) {
      const quillHandle = new Quill(ref.current, {
        theme: 'bubble',
        modules: {
          toolbar: [['bold', 'italic', 'underline']]
        },
        ...options
      })
      setQuill(quillHandle)
    }
  }, [options, ref.current])

  return [ref, quill] as [RefObject<HTMLDivElement>, Quill | null]
}

type AdvancedEditorProps = {
  value?: any;
  onChange?: (v: string) => void
}
export default function AdvancedEditor ({ value, onChange }: AdvancedEditorProps) {
  const [computedValue, triggerValueChange] = useCustomComponent({ value, onChange })
  const [editorRef, quill] = useEditor()

  useEffect(() => {
    if (quill) {
      const currentContent = quill.root.innerHTML
      if (isEqual(computedValue, currentContent)) {
        quill.root.innerHTML = computedValue || ''
      }
    }
  }, [computedValue, quill])

  useEffect(() => {
    if (quill) {
      quill.on('text-change', function (delta, oldDelta, source) {
        triggerValueChange(quill.root.innerHTML)
      })
    }
  }, [quill])

  return (
    <div ref={editorRef}></div>
  )
}
