import L from 'leaflet';
import Stop from '../view/stop.js';

export default class Map {

  constructor(params) {
    this.map = this.setup(params);
    this.findUser();
    this.addMark();
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

  addMark() {
    var positions = [
      {latitude: -7.149273346503699, longitude: -34.8425441980362},
      {latitude: -7.148086380373045, longitude: -34.84359562397004},
      {latitude: -7.1514609755513705, longitude: -34.85128283500672},
      {latitude: -7.1357641059487875, longitude: -34.8755031824112},
      {latitude: -7.097900979464709, longitude: -34.84474897384644},
      {latitude: -7.152461639359923, longitude: -34.838719367980964},
      {latitude: -7.117953441932844, longitude: -34.89006757736207}
    ];

    positions.forEach((position) => {
      new Stop(position).build().addTo(this.map);
    });
  }
}
