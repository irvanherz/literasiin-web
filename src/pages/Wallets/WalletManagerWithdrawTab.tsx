import { Result } from 'antd'

type WalletManagerWithdrawTabProps = {
  wallet: any
}

export default function WalletManagerWithdrawTab ({ wallet }: WalletManagerWithdrawTabProps) {
  return (
    <div>
      <Result
        status='warning'
        title="Oops"
        subTitle="This faeture currently under maintenance."
      />
    </div>
  )
}
