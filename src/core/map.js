import L from 'leaflet';

export default class Map {

  constructor(params) {
    this.map = this.setup(params);
    this.findUser();
  }

  setup(params) {
    let map = L.map(params.id).setView(params.location, 12);
    L.tileLayer('http://{s}.{base}.maps.cit.api.here.com/maptile/2.1/{type}/{mapID}/normal.day/{z}/{x}/{y}/{size}/{format}?app_id={app_id}&app_code={app_code}&lg={language}', {
      attribution: 'Map &copy; 1987-2014 <a href="http://developer.here.com">HERE</a>',
      subdomains: '1234',
      mapID: 'newest',
      app_id: 'AXOe436PxWbYjlecdvLz',
      app_code: 'VFyswxuc1jtQ6TV6iJyg2w',
      base: 'base',
      maxZoom: 18,
      type: 'maptile',
      language: 'eng',
      format: 'png8',
      size: '256'
    }).addTo(map);
    return map;
  }

  findUser() {
    let onLocationFound = (e, map) => {
      var radius = e.accuracy / 2;
      L.marker(e.latlng).addTo(map).bindPopup(`Você está em um raio de ${radius}m de distância.`).openPopup();
      L.circle(e.latlng, radius).addTo(map);
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
