import { XMarkIcon } from '@heroicons/react/24/solid'
import useCustomComponent from 'hooks/useCustomComponent'
import { uniq } from 'lodash'
import { KeyboardEventHandler, useState } from 'react'

type TagsInputProps = {
  value?: string[]
  defaultValue?: string[]
  onChange?: (val: string[]) => void
}
export default function TagsInput({ value, defaultValue, onChange }: TagsInputProps) {
  const [text, setText] = useState('')
  const [computedValue, triggerChange] = useCustomComponent({ value, defaultValue, onChange })

  const computedValueAsTags = (computedValue || []).filter(c => !!c)

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      const newTags = uniq([...computedValueAsTags, text])
      setText('')
      triggerChange(newTags)
    } else if (e.key === 'Backspace') {
      if (text === '') {
        const newTags = [...computedValueAsTags]
        if (newTags.length) newTags.pop()
        triggerChange(newTags)
      }
    }
  }

  const handleBlur = () => {
    if (text !== '') {
      const newTags = uniq([...computedValueAsTags, text])
      setText('')
      triggerChange(newTags)
    }
  }

  const handleRemoveTag = (tag: string) => {
    const newTags = [...computedValueAsTags].filter(c => c !== tag)
    triggerChange(newTags)
  }

  return (
    <div className="border rounded-lg bg-white p-2 flex flex-wrap gap-2 outline-none focus-within:outline focus-within:outline-slate-300">
      {computedValueAsTags.map(tag => (
        <div
          key={tag}
          className="rounded-full flex-none px-2 bg-slate-200 text-sm flex items-center gap-2"
        >
          <span>{tag}</span>
          <button type='button' onClick={() => handleRemoveTag(tag)}><XMarkIcon className='w-4 text-red-500' /></button>
        </div>
      ))}
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        onBlur={handleBlur}
        className="flex-1 px-0 outline-none min-w-[48px] text-sm"
        placeholder="Masukkan tag..."
        onKeyDown={handleKeyDown}
      />
    </div>
  )
}
