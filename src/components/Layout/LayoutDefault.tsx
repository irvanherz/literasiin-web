/* eslint-disable no-unused-vars */
import { Layout } from 'antd'
import classNames from 'classnames'
import ScrollToTop from 'components/utils/ScrollToTop'
import { CSSProperties, ReactNode } from 'react'
import styled from 'styled-components'
import Footer from './Footer'
import Header from './Header'

const StyledLayout = styled(Layout)`
  .layout-default-top {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  .ant-layout-header {
    padding: 0;
    position: sticky;
    top: 0;
    z-index: 9;
    box-shadow: 0 0 20px rgb(0 0 0 / 10%);
    backdrop-filter: blur(5px);
  }
  .ant-layout-content {
    padding: 0;
  }
  .ant-layout-footer {
    padding: 0;
  }
  `

type LayoutDefaultProps = {
  children: ReactNode
  contentContainerClassName?: string
  searchComponent?: ReactNode
  beforeContent?: ReactNode
  beforeContentContainerClassName?: string
  afterContent?:ReactNode
  afterContentContainerClassName?: string
  style?: CSSProperties
  className?: string
  showUserMenu?: boolean
  contentContainerStyle?: CSSProperties
}

export default function LayoutDefault ({ children, contentContainerClassName, beforeContent, beforeContentContainerClassName, afterContent, afterContentContainerClassName, searchComponent, style, className, contentContainerStyle, showUserMenu = true }: LayoutDefaultProps) {
  return (
    <div style={style} className={classNames('bg-slate-100', className)}>
      <div className='min-h-screen flex flex-col'>
        <Header searchComponent={searchComponent} showUserMenu={showUserMenu} />
        <div className={classNames('flex-none', beforeContentContainerClassName)}>{beforeContent}</div>
        <div className={classNames('flex-1', contentContainerClassName)} style={contentContainerStyle}>
          {children}
        </div>
        <div className={classNames('flex-none', afterContentContainerClassName)}>{afterContent}</div>
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  )
}
