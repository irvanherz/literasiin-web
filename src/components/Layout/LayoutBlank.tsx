import classNames from 'classnames'
import { CSSProperties, ReactNode } from 'react'

type LayoutBlankProps = {
  children: ReactNode
  style?: CSSProperties
  className?: string
  contentStyle?: CSSProperties
  contentClassName?: string
}

export default function LayoutBlank ({ children, style, className, contentStyle, contentClassName }: LayoutBlankProps) {
  return (
    <div style={style} className={classNames('min-h-screen flex', className)}>
      <div className={classNames('flex-1', contentClassName)} style={contentStyle}>
        {children}
      </div>
    </div>
  )
}
