let Request = function() {
  let xhttp = new XMLHttpRequest();
  let parseParams = (params) => {
    return Object.keys(params).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`).join('&');
  };
  let response = function(callback) {
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        callback(this.responseText);
      }
    };
  };

  return {
    get: (url, callback) => {
      xhttp.open('GET', url, true);
      xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhttp.send();
      response(callback);
    },

    post: (url, params, callback) => {
      xhttp.open('POST', url, true);
      xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhttp.send(parseParams(params));
      response(callback);
    },
  };
};

export default Request;
