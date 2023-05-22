import { message } from 'antd'
import { cloneElement, ReactElement } from 'react'
import { useMutation } from 'react-query'
import FinancesService from 'services/Finances'

declare const window: any

type PayOrderButtonProps = {
  children: ReactElement
  orderId: number
  onSuccess?: (result: any) => void
  onPending?: (result: any) => void
  onError?: (result: any) => void
  onClose?: (result: any) => void
}

function defaultPaymentCallback (result: any) {

}

export default function OrderPayButton ({ children, orderId, onSuccess = defaultPaymentCallback, onPending = defaultPaymentCallback, onError = defaultPaymentCallback, onClose = defaultPaymentCallback }: PayOrderButtonProps) {
  const pay = useMutation((paymentId: number) => FinancesService.Orders.pay(paymentId))

  const handlePay = async () => {
    try {
      const res = await pay.mutateAsync(orderId)
      const snapToken = res?.data?.meta?.token
      window?.snap.pay(snapToken, {
        onSuccess,
        onPending,
        onError,
        onClose
      })
    } catch (err: any) {
      message.error(err?.message)
    }
  }
  return cloneElement(children, { onClick: handlePay })
}
