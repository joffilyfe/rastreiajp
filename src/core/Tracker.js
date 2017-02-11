import Map from './map.js';
import FormLogin from './form_login.js';

export default class Tracker {
  constructor() {
    this.map = new Map({id: 'map', location: [-7.1605094514961, -34.869918823242195]});
    this.formLogin = new FormLogin().build();
    this.map.addMark([-7.149567, -34.843796]);
    this.getStopInfo();
  }

  getStopInfo() {
  }
}
