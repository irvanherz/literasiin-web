import { useMemo, useState } from 'react'

type UseCustomComponentProps<T> = {
  value?: T,
  defaultValue?: T
  onChange?: (value: T) => void
}

export default function useCustomComponent<T> ({ value, defaultValue, onChange }: UseCustomComponentProps<T>): [T | undefined, (v:T) => void] {
  const [internalValue, setInternalValue] = useState<T>()
  const computedValue = useMemo(() => {
    const res = value === undefined ? internalValue : value
    return res === undefined ? defaultValue : res
  }, [internalValue, value, defaultValue])

  const triggerChange = (newValue: T) => {
    if (newValue === computedValue) return
    if (value === undefined) setInternalValue(newValue)
    if (onChange) return onChange(newValue)
  }

  return [computedValue, triggerChange]
}
