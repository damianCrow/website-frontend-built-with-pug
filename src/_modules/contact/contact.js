import Mapbox from 'mapbox-gl'

export default class Contact {
  constructor() {
  	Mapbox.accessToken = 'pk.eyJ1IjoibXJhd2Vzb21lIiwiYSI6ImNqMzJzeDN4ZjAwMHAyd250YmRyZm04MDcifQ.YcsqDP3hqulR3f523AoB1g'
		const map = new Mapbox.Map({
			container: 'map',
			center: [-0.10618954583290952, 51.51381053435017],
			zoom: 16,
			style: 'mapbox://styles/mapbox/dark-v9'
		})

		const marker = document.createElement('div')
		marker.classList.add('marker')

		new Mapbox.Marker(marker)
      .setLngLat([-0.10718954583290952, 51.51381053435017])
      .addTo(map);
  }
}