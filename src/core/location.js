export default class Location {
  constructor() {

  }

  find(callback) {
    if (!'geolocation' in navigator) {
      return ["Your browser don't support geolocation."];
    }

    let success = function(position) {
      callback(position.coords.latitude, position.coords.longitude);
    }

    let error = function() {
      callback(null, null);
    }

    let options = {
      maximumAge        : 30000,
      timeout           : 27000
    };

    navigator.geolocation.getCurrentPosition(success, error,);
  }
}
