import { Select, SelectProps } from 'antd'
import useCustomComponent from 'hooks/useCustomComponent'
import { debounce } from 'lodash'
import { useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import UsersService from 'services/Users'

export type UserIdInputProps = SelectProps
export default function UserIdInput ({ value, defaultValue, onChange, ...otherProps }:UserIdInputProps) {
  const [computedValue, triggerValueChange] = useCustomComponent({ value, defaultValue, onChange: onChange as any })
  const [search, setSearch] = useState('')
  const userQuery = useQuery(`users[${computedValue}]`, () => UsersService.findById(computedValue), { enabled: !!computedValue })
  const usersQuery = useQuery(`users[search:${search}]`, () => UsersService.findMany({ search }))
  const users = usersQuery?.data?.data || []
  const user = userQuery?.data?.data

  const setSearchDebounced = debounce(e => setSearch(e), 1000)

  const options = useMemo(() => {
    const usersById: any = {}
    if (user) {
      usersById[user.id] = user
    }
    users.forEach((u: any) => {
      usersById[u.id] = u
    })
    return Object.keys(usersById).map(id => {
      return {
        key: usersById[id].id,
        value: usersById[id].id,
        label: usersById[id].fullName
      }
    })
  }, [user, users])

  return (
    <Select
      showSearch
      allowClear
      value={+computedValue || undefined}
      placeholder="Find user..."
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={false}
      onSearch={setSearchDebounced}
      onChange={triggerValueChange}
      notFoundContent={null}
      options={options}
      style={{ width: '100%' }}
      {...otherProps}
    />
  )
}
