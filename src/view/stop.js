import L from 'leaflet';
import API from '../core/endpoint.js';
import Request from '../util/request.js';
import { getCachedStop, cacheStop } from '../util/cache.js';
import StopInfo from '../view/stop_info.js';

export default class Stop {
  constructor(options) {
    this.latitude = options.latitude;
    this.longitude = options.longitude;
  }

  build() {
    var icon = L.icon({
      iconUrl: 'dist/icons/bus-stop-south.png',
      iconRetinaUrl: 'dist/icons/bus-stop-south@2x.png',
      iconSize: [27, 31],
      iconAnchor: [13.5, 13.5],
      popupAnchor: [0, -11]
    });


    var mark = L.marker([this.latitude, this.longitude], {icon: icon})
    .on('click', () => {
      let request = new Request();
      let token = localStorage.getItem('tokenTracker');
      let position = [this.latitude, this.longitude];
      let cached = getCachedStop(position);
      let params = {
        latitude: `${this.latitude}`,
        longitude: `${this.longitude}`,
        token: `${token}`,
        cidade: `jpa`
      };

      if (!token) {
        alert('Por favor, faça o login primeiro.');
        return;
      }

      /*
      * We are caching this position with stop info
      * Here We improve a stop info avoiding many requests to API
      */
      if (!cached) {
        request.post(API.POSITION, params, (data) => {
          cacheStop({position: position, objs: data});
          cached = data;
        });
      }

      new StopInfo(JSON.parse(cached));
    });

    return mark;
  }
}
