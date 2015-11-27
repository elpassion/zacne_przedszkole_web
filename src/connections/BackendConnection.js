import configuration from '../configuration.js'

class BackendConnection {
  constructor() {
    this.url = configuration.backendUrl;
  }

  getLocations(callback) {
    this.doGet(this.url + 'schools/locations', {}, callback, (errorResponse) => {
      console.log(errorResponse);
    });
  }

  doGet(url, data, successCallback, errorCallback) {
    this.doAjax('GET', url, data, successCallback, errorCallback);
  }

  doPut(url, data, successCallback, errorCallback) {
    this.doAjax('PUT', url, data, successCallback, errorCallback);
  }

  doPost(url, data, successCallback, errorCallback) {
    this.doAjax('POST', url, data, successCallback, errorCallback);
  }

  doAjax(type, url, data, successCallback, errorCallback) {
    $.ajax({
      type: type,
      url: url,
      data: data
    })
    .fail(errorCallback)
    .done(successCallback);
  }
}

export default new BackendConnection;
