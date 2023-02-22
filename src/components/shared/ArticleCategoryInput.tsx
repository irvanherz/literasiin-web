import { Select, SelectProps } from 'antd'
import { useQuery } from 'react-query'
import ArticlesService from 'services/Articles'

type ArticleCategoryInputProps = SelectProps
export default function ArticleCategoryInput (props: ArticleCategoryInputProps) {
  const { data, isLoading } = useQuery('articles.categories', () => ArticlesService.Categories.findMany())
  const categories: any[] = data?.data || []

  const options = categories.map(cat => ({ key: cat.id, label: cat.name, value: cat.value }))

  return (
    <Select {...props} loading={isLoading} options={options} />
  )
}
