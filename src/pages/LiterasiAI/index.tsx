/* eslint-disable no-unused-vars */
import classNames from 'classnames'
import Layout from 'components/Layout'
import PageHeader from 'components/PageHeader'
import { Link, useParams } from 'react-router-dom'
import Autofix from './Autofix'
import Paraphrase from './Paraphrase'
import StoryIdeas from './StoryIdeas'

export default function LiterasiAI () {
  const params = useParams()
  const sectionId = params.sectionId || 'story-ideas'

  return (
    <Layout.Default
      beforeContent={
        <PageHeader
          title="LiterasiAI"
          description="Koleksi AI literasiin untuk membantumu menulis cerita lebih menarik"
        />
      }
    >
      <div className='container py-4 flex flex-col md:flex-row gap-4'>
        <div className='w-full md:w-1/3'>
          <div className='border rounded-lg bg-white shadow'>
            <div className='p-4 border-b text-center'>
              <div className='font-black text-lg'>LiterasiAI</div>
              <div className='text-slate-500'>Bantu kamu menulis lebih gampang</div>
            </div>
            <ul className="menu menu-horizontal md:menu-vertical bg-white gap-2 rounded-lg">
              <li><Link replace to='/literasi-ai/story-ideas' className={classNames(sectionId === 'story-ideas' && 'active')}>Cari Ide Cerita</Link></li>
              <li><Link replace to='/literasi-ai/paraphrase' className={classNames(sectionId === 'paraphrase' && 'active')}>Parafrase</Link></li>
              <li><Link replace to='/literasi-ai/autofix' className={classNames(sectionId === 'autofix' && 'active')}>Perbaiki Tulisan</Link></li>
            </ul>
          </div>
        </div>
        <div className='w-full md:w-3/4'>
          <div className='border rounded-lg bg-white shadow p-4'>
            {sectionId === 'story-ideas' && <StoryIdeas />}
            {sectionId === 'paraphrase' && <Paraphrase />}
            {sectionId === 'autofix' && <Autofix />}
          </div>
        </div>
      </div>
    </Layout.Default>
  )
}
