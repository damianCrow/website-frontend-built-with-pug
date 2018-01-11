import Mapbox from 'mapbox-gl'

export default class Contact {
  constructor() {
    const mapEle = document.getElementById('map')

    Mapbox.accessToken = 'pk.eyJ1IjoibXJhd2Vzb21lIiwiYSI6ImNqMzJzeDN4ZjAwMHAyd250YmRyZm04MDcifQ.YcsqDP3hqulR3f523AoB1g'
    const map = new Mapbox.Map({
      container: 'map',
      center: [mapEle.getAttribute('data-center-lng'), mapEle.getAttribute('data-center-lat')],
      zoom: 16,
      style: 'mapbox://styles/mapbox/dark-v9',
    })

    JSON.parse(mapEle.getAttribute('data-markers')).map((markerData, idx) => {

      const marker = document.createElement('div')
      marker.setAttribute('data-content', markerData.text)
      marker.classList.add('marker')

      new Mapbox.Marker(marker)
      .setLngLat([markerData.dataLng, markerData.dataLat])
      .addTo(map)
    })
  }
}
