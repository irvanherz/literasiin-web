import { LoaderOptions } from '@googlemaps/js-api-loader'
import { createContext } from 'react'

export type GoogleMapsContextStatus = 'initial' | 'loading' | 'success' | 'error'
export type GoogleMapsContextType = {
  init: (options: LoaderOptions) => Promise<GoogleMapsContextStatus>
  status: GoogleMapsContextStatus
  error?: any
}

const GoogleMapsContext = createContext<GoogleMapsContextType>({
  init: () => Promise.resolve('initial'),
  status: 'initial',
  error: undefined
})

export default GoogleMapsContext
