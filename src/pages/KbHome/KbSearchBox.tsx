import { AutoComplete, AutoCompleteProps } from 'antd'
import useKbs from 'hooks/useKbs'
import { slugifyContentId } from 'libs/slug'
import { debounce } from 'lodash'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function KbSearchBox () {
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState('')
  const { data } = useKbs({ search: keyword, limit: 10 })
  const kbs: any[] = data?.data || []
  const options: AutoCompleteProps['options'] = kbs.map(kb => ({ label: kb.title, value: kb.id }))

  const handleSelect: AutoCompleteProps['onSelect'] = (id) => {
    const selected = kbs.find(kb => kb.id === id)
    if (!selected) return
    navigate(`/hc/${slugifyContentId(selected.category, 'name')}/${slugifyContentId(selected)}`)
  }
  const handleSearch = () => {}

  const setKeywordDebounced = debounce(e => setKeyword(e), 1000)
  return (
    <AutoComplete
      style={{ width: '100%' }}
      options={options}
      onSelect={handleSelect}
      onSearch={handleSearch}
      onChange={setKeywordDebounced}
      placeholder="Search resources..."
      />
  )
}
