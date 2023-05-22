export default class GoogleMapsServices {
  static async geocodeLocation (location: google.maps.LatLng | google.maps.LatLngLiteral | null | undefined) {
    const geocoder = new google.maps.Geocoder()
    const result = await geocoder.geocode({ location })
    return result
  }
}
