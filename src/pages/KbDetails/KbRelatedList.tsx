import { FileOutlined } from '@ant-design/icons'
import { Menu, MenuProps } from 'antd'
import useKbs from 'hooks/useKbs'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const StyledMenu = styled(Menu)`
border: none !important;
`

type KbRelatedListProps = { kb: any }

export default function KbRelatedList ({ kb }: KbRelatedListProps) {
  const categoryId = kb?.categoryId
  const navigate = useNavigate()
  const { data } = useKbs({ categoryId }, { enabled: !!categoryId })
  const kbs: any[] = data?.data || []
  const menuItems: MenuProps['items'] = kbs.map(kb => ({
    key: kb.id,
    icon: <FileOutlined />,
    label: kb.title,
    onClick: () => {
      navigate(`/hc/${kb.categoryId}/${kb.id}`)
    }
  }))
  return (
    <StyledMenu
      selectedKeys={[kb?.id]}
      style={{ background: 'none' }}
      items={menuItems}
    />
  )
}
