import useCustomComponent from 'hooks/useCustomComponent'
import { DetailedHTMLProps, InputHTMLAttributes } from 'react'

type UsernameInputProps = Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'onChange' | 'value' | 'defaultValue'> & {
  value?: string
  defaultValue?: string
  onChange?: (v: string) => void
}
export default function UsernameInput ({ value, defaultValue, onChange, ...otherProps }: UsernameInputProps) {
  const [computedValue, triggerValueChange] = useCustomComponent({ value, defaultValue, onChange })

  const handleChange: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>['onChange'] = (e) => {
    let val = e.target.value || ''
    val = val.toLowerCase().replace(/[^a-zA-Z0-9_]/g, '')
    triggerValueChange(val)
  }
  return <input {...otherProps} value={computedValue} onChange={handleChange} />
}
