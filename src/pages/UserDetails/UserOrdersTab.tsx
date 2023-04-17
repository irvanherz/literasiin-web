import { Button, List, message, Space, Typography } from 'antd'
import RenderTimeFromNow from 'components/shared/RenderTimeFromNow'
import useOrders from 'hooks/useOrders'
import { upperCase } from 'lodash'
import { cloneElement, ReactElement, useMemo } from 'react'
import { FormattedMessage } from 'react-intl'
import { useMutation } from 'react-query'
import FinancesService from 'services/Finances'

declare const window: any

const formatter = new Intl.NumberFormat('id-ID')

type PayOrderButtonProps = { children: ReactElement, order: any }
function OrderPayButton ({ children, order }: PayOrderButtonProps) {
  const pay = useMutation((paymentId: number) => FinancesService.Orders.pay(paymentId))

  const handlePay = async () => {
    try {
      const orderId = order?.id
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
  return cloneElement(children, { onClick: handlePay })
}

type OrderListItemProps = { order: any }
function OrderListItem ({ order }: OrderListItemProps) {
  const renderedStatus = useMemo(() => {
    const status = upperCase(order?.payment?.status || 'unpaid')
    if (status === 'UNPAID') {
      return (
        <OrderPayButton order={order}>
          <Button type='primary'><FormattedMessage defaultMessage='CONTINUE PAYMENT' /></Button>
        </OrderPayButton>
      )
    } else if (status === 'PENDING') {
      return (
        <OrderPayButton order={order}>
          <Button type='primary' danger><FormattedMessage defaultMessage='WAITING PAYMENT' /></Button>
        </OrderPayButton>
      )
    } else if (status === 'PAID') {
      return <Typography.Text type='success' strong><FormattedMessage defaultMessage='ALREADY PAID' /></Typography.Text>
    } else if (status === 'FAILED') {
      return <Typography.Text type='danger' strong><FormattedMessage defaultMessage='FAILED' /></Typography.Text>
    } else {
      return <Typography.Text strong>{status}</Typography.Text>
    }
  }, [order])

  return (
    <List.Item extra={renderedStatus}>
      <List.Item.Meta
        title={<Space><span>{`#${order.id}`}</span></Space>}
        description={
          <Space direction='vertical'>
            <div>{<Typography.Text strong>{'Rp' + formatter.format(order.amount)}</Typography.Text>}</div>
            <div><RenderTimeFromNow timestamp={order.createdAt} /></div>
          </Space>
        }
      />
    </List.Item>
  )
}

type UserOrdersTabProps = { user: any }
export default function UserOrdersTab ({ user }: UserOrdersTabProps) {
  const { data } = useOrders({ userId: user?.id, sortBy: 'createdAt', sortOrder: 'DESC' }, { enabled: !!user?.id })
  const orders = data?.data || []

  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      <List
        dataSource={orders}
        renderItem={order => (
          <OrderListItem order={order} />
        )}
      />
    </Space>

  )
}
