import { Loader, LoaderOptions } from '@googlemaps/js-api-loader'
import { ReactNode, useState } from 'react'
import useDeepCompareEffect from 'use-deep-compare-effect'
import GoogleMapsContext from './GoogleMapsContext'

type GoogleMapsContextProviderProps = {
  children: ReactNode
  options: LoaderOptions
}
export default function GoogleMapsContextProvider ({ children, options }: GoogleMapsContextProviderProps) {
  const [status, setStatus] = useState<'initial' | 'loading' | 'success' | 'error'>('initial')
  const [error, setError] = useState()

  const init = async (options: LoaderOptions) => {
    try {
      setStatus('loading')
      const loader = new Loader(options)
      await loader.load()
      setStatus('success')
      return 'success'
    } catch (err: any) {
      setStatus('error')
      setError(err)
      return 'error'
    }
  }

  useDeepCompareEffect(() => {
    init(options)
  }, [options])

  return (
    <GoogleMapsContext.Provider
      value={{
        init,
        status,
        error
      }}
    >
      {children}
    </GoogleMapsContext.Provider>
  )
}
