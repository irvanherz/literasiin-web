import { Button, InputNumber, InputNumberProps, message, Space, Tag, Typography } from 'antd'
import useCustomComponent from 'hooks/useCustomComponent'
import { useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useMutation } from 'react-query'
import FinancesService from 'services/Finances'
import WalletsService from 'services/Wallets'
import styled from 'styled-components'

declare const window: any

const CoinAmountInputWrapper = styled.div`
.ant-input-number-input-wrap input {
  font-weight: 900;
  text-align: center;
}
`

const RECOMMENDED_AMOUNT = [
  { label: '10 coin', value: 10 },
  { label: '25 coin', value: 25 },
  { label: '50 coin', value: 50 },
  { label: '100 coin', value: 100 },
  { label: '500 coin', value: 500 }
]

type CoinAmountInputProps = InputNumberProps

function CoinAmountInput ({ value, defaultValue, onChange }: CoinAmountInputProps) {
  const intl = useIntl()
  const [computedValue, triggerValueChange] = useCustomComponent({ value, defaultValue, onChange })
  const isOtherAmount = !RECOMMENDED_AMOUNT.some(amount => amount.value === +(computedValue || 0))

  return (
    <CoinAmountInputWrapper>
      <Space direction='vertical' style={{ width: '100%', textAlign: 'center' }}>
        <Space>
          {RECOMMENDED_AMOUNT.map(amount => (
            <Tag.CheckableTag key={amount.value} onClick={() => triggerValueChange(amount.value)} checked={amount.value === computedValue}>{amount.label}</Tag.CheckableTag>
          ))}
          <Tag.CheckableTag onClick={() => triggerValueChange(0)} key={'o'} checked={isOtherAmount}><FormattedMessage defaultMessage='Other'/></Tag.CheckableTag>
        </Space>
        <InputNumber
          size='large'
          key="o"
          placeholder={intl.formatMessage({ defaultMessage: 'Deposit amount...' })}
          step={1} min={10}
          style={{ width: '100%', maxWidth: 400, fontWeight: 900, textAlign: 'center' }}
          value={computedValue}
          onChange={triggerValueChange}
        />
      </Space>
    </CoinAmountInputWrapper>
  )
}

type WalletManagerTopupTabProps = {
  wallet: any
}

const formatter = new Intl.NumberFormat('id-ID')

export default function WalletManagerTopupTab ({ wallet }: WalletManagerTopupTabProps) {
  const [amount, setAmount] = useState(0)
  const canTopup = amount >= 10
  const estimatedPaymentAmount = amount * 1000
  const afterBalance = +wallet.balance + +amount
  const formattedAfterBalance = formatter.format(afterBalance)
  const formattedEstimatedPaymentAmount = formatter.format(estimatedPaymentAmount)

  const initiator = useMutation((amount: number) => WalletsService.createDepositOrder(wallet.id, { amount }))
  const pay = useMutation((paymentId: number) => FinancesService.Orders.pay(paymentId))

  const handleTopup = async () => {
    let order = null
    try {
      const res = await initiator.mutateAsync(amount)
      order = res.data
    } catch (err: any) {
      message.error(err?.message)
      return
    }
    try {
      const orderId = order.id
      const res = await pay.mutateAsync(orderId)
      const snapToken = res?.data?.meta?.token
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

  return (
    <div>
      <Space direction='vertical' style={{ width: '100%', textAlign: 'center' }}>
        <CoinAmountInput
          value={amount}
          onChange={v => setAmount(+(v || 0))}
        />
        {canTopup
          ? <Typography.Text style={{ display: 'block' }}><FormattedMessage defaultMessage='Estimated payment amount (excluding tax)' />: <b>{formattedEstimatedPaymentAmount}</b></Typography.Text>
          : null
        }
        {canTopup
          ? <Typography.Text style={{ display: 'block' }}><FormattedMessage defaultMessage='Estimated balance after topup' />: <b>{formattedAfterBalance}</b></Typography.Text>
          : null
        }
        <Button type='primary' disabled={!canTopup} onClick={handleTopup}><FormattedMessage defaultMessage='Process Topup' /></Button>
      </Space>
    </div>
  )
}
