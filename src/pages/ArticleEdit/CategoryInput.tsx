import useArticleCategories from 'hooks/useArticleCategories'

export default function CategoryInput() {
  const { data } = useArticleCategories({})
  const categories: any[] = data?.data || []

  return (
    <select className="select select-sm select-bordered w-full max-w-xs" placeholder='Pilih kategori'>
      {categories.map(cat => (
        <option key={cat.id} value={cat.id}>{cat.name}</option>
      ))}
    </select>
  )
}
