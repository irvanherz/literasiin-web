import GoogleMapsContext from 'contexts/GoogleMapsContext'
import { useContext } from 'react'

export default function useGoogleMapsContext () {
  return useContext(GoogleMapsContext)
}
