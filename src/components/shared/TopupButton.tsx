import { InputNumber, InputNumberProps, message, Modal, Space, Tag } from 'antd'
import useCustomComponent from 'hooks/useCustomComponent'
import { cloneElement, ReactElement, useState } from 'react'
import { useMutation } from 'react-query'
import FinancesService from 'services/Finances'

declare const window: any

const RECOMMENDED_AMOUNT = [
  { label: '10.000', value: 10000 },
  { label: '25.000', value: 25000 },
  { label: '50.000', value: 50000 },
  { label: '100.000', value: 100000 },
  { label: '500.000', value: 500000 }
]

type CoinAmountInputProps = InputNumberProps

function CoinAmountInput ({ value, defaultValue, onChange }: CoinAmountInputProps) {
  const [computedValue, triggerValueChange] = useCustomComponent({ value, defaultValue, onChange })
  const isOtherAmount = (!!computedValue && !RECOMMENDED_AMOUNT.some(amount => amount.value === computedValue))

  return (
    <Space direction='vertical' style={{ width: '100%', textAlign: 'center' }}>
      <Space>
        {RECOMMENDED_AMOUNT.map(amount => (
          <Tag.CheckableTag key={amount.value} onClick={() => triggerValueChange(amount.value)} checked={amount.value === computedValue}>{amount.label}</Tag.CheckableTag>
        ))}
        <Tag.CheckableTag onClick={() => triggerValueChange(0)} key={'o'} checked={isOtherAmount}>Other</Tag.CheckableTag>
      </Space>
      <InputNumber key="o" placeholder='Deposit amount...' step={1000} min={10000} style={{ width: '100%' }} value={computedValue} onChange={triggerValueChange} />
    </Space>

  )
}

type TopupButtonProps = {
  children: ReactElement
}

export default function TopupButton ({ children }:TopupButtonProps) {
  const [amount, setAmount] = useState(0)
  const [open, setOpen] = useState(false)
  const canTopup = amount >= 10000

  const initiator = useMutation((amount: number) => FinancesService.createDepositCoin({ userId: 1, amount }))
  const pay = useMutation((invoiceId: number) => FinancesService.Invoices.pay(invoiceId))

  const handlePlay = async () => {
    let invoice = null
    try {
      const res = await initiator.mutateAsync(amount)
      invoice = res.data
    } catch (err: any) {
      message.error(err?.message)
      return
    }
    try {
      const invoiceId = invoice.id
      const res = await pay.mutateAsync(invoiceId)
      const snapToken = res?.data?.payment?.token
      window?.snap.pay(snapToken, {
        onSuccess: (result: any) => {
          /* You may add your own implementation here */
          window.location.reload()
        },
        onPending: (result: any) => {
          /* You may add your own implementation here */
        },
        onError: (result: any) => {
          /* You may add your own implementation here */
          window.location.reload()
        },
        onClose: (result: any) => {
          /* You may add your own implementation here */
        }
      })
    } catch (err: any) {
      message.error(err?.message)
    }
  }

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      {cloneElement(children, { onClick: handleOpen })}
      <Modal
        centered
        open={open}
        onCancel={handleClose}
        onOk={handlePlay}
        confirmLoading={initiator.isLoading || pay.isLoading}
        okText="Topup"
        okButtonProps={{ disabled: !canTopup }}

      >
        <CoinAmountInput
          value={amount}
          onChange={v => setAmount(+(v || 0))}
        />
      </Modal>
    </>
  )
}
