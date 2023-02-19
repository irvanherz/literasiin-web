import { Input, InputProps } from 'antd'
import useCustomComponent from 'hooks/useCustomComponent'

type UsernameInputProps = Omit<InputProps, 'onChange' | 'value' | 'defaultValue'> & {
  value?: string
  defaultValue?: string
  onChange?: (v: string) => void
}
export default function UsernameInput ({ value, defaultValue, onChange, ...otherProps }: UsernameInputProps) {
  const [computedValue, triggerValueChange] = useCustomComponent({ value, defaultValue, onChange })

  const handleChange: InputProps['onChange'] = (e) => {
    let val = e.target.value || ''
    val = val.toLowerCase().replace(/[^a-zA-Z0-9_]/g, '')
    triggerValueChange(val)
  }
  return <Input {...otherProps} value={computedValue} onChange={handleChange} />
}
