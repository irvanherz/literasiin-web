import useCustomComponent from 'hooks/useCustomComponent'
import useGoogleMapsContext from 'hooks/useGoogleMapsContext'
import { LOCATION_MARKER_IMAGE } from 'libs/variables'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

const PlacePickerContainer = styled.div`
position: relative;
min-width: 300px;
width: 100%;
padding-top: 50%;
display: block;
.place-picker-map {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.place-picker-map-marker {
  position: absolute;
  height: 32px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -32px);
  pointer-events: none;
}
`

type PlacePickerProps = {
  value?: any
  onChange?: (val: any) => void
  onMapChange?: (map: google.maps.Map) => void
}
export default function PlacePicker ({ value, onChange, onMapChange }: PlacePickerProps) {
  const [computedValue, triggerValueChange] = useCustomComponent({ value, onChange })
  const ctx = useGoogleMapsContext()
  const [map, setMap] = useState<google.maps.Map>()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ctx.status === 'success' && ref.current && !map) {
      const map = new google.maps.Map(ref.current!, {
        center: { lat: computedValue?.[0] || -6.200000, lng: computedValue?.[1] || 106.816666 },
        zoom: 10,
        streetViewControl: false,
        fullscreenControl: false,
        mapTypeControl: false
      })
      map.addListener('center_changed', () => {
        const center = map.getCenter()
        triggerValueChange?.([center!.lat(), center!.lng()])
      })
      setMap(map)
      onMapChange?.(map)
    }
  }, [ref, ctx.status])

  return (
    <PlacePickerContainer>
      {ctx.status === 'success' ? <div className='place-picker-map' ref={ref} /> : null}
      <img className='place-picker-map-marker' src={LOCATION_MARKER_IMAGE} />
    </PlacePickerContainer>
  )
}
