import L from 'leaflet';

export default class Map {

  constructor(params) {
    this.map = this.setup(params);
    this.findUser();
  }

  setup(params) {
    let map = L.map(params.id).setView(params.location, 12);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw'
    }).addTo(map);
    return map;
  }

  findUser() {
    let onLocationFound = (e, map) => {
      var radius = e.accuracy / 2;
      L.marker(e.latlng).addTo(map).bindPopup(`Você está em um raio de ${radius}m de distância.`).openPopup();
      L.circle(e.latlng, radius).addTo(map);
      // map.panTo(e.latlng);
      map.setZoomAround(e.latlng, 72);
    };

    this.map.on('click', function(x) {
      console.log(x.latlng);
    });
    this.map.locate({maxZoom: 16});
    this.map.on('locationfound', (e) => {
      onLocationFound(e, this.map);
    });
  }

  addMark(location) {
    var busIcon = L.divIcon({className: 'map-icon map-icon-bus-station'});
    L.marker(location, {icon: busIcon}).addTo(this.map);
  }
}
