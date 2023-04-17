import { Button, Dropdown } from 'antd'

export default function LangMenu () {
  return (
    <Dropdown
      menu={{ items: [{ key: 'en', label: 'English' }, { key: 'id', label: 'Bahasa Indonesia' }] }}
    >
      <Button shape='circle'>ID</Button>
    </Dropdown>
  )
}
