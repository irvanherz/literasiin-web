import { DEFAULT_PHOTO } from 'libs/variables'

type PartnersProps = {
  config: any
}

export default function Partners ({ config }: PartnersProps) {
  const partners = config?.partners || []

  return (
    <div className='bg-emerald-700 pt-4 pb-8'>
      <div className='container space-y-4'>
        <div className='font-black text-white text-center'>Partner Kami</div>
        <div className='flex justify-center gap-4'>
          {partners.map((partner: any) => (
            <div className="avatar" key={partner.id}>
              <div className="w-20 rounded-full">
                <img src={partner?.image || DEFAULT_PHOTO} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
