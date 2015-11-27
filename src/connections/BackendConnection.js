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

  getRanking(offset, limit, callback) {
    this.doGet(this.url + 'schools/ranking', { offset: offset, limit: limit }, callback, (errorResponse) => {
      console.log(errorResponse);
    });
  }

  rateSchool(schoolId, rating, callback) {
    this.doPost(this.url + 'schools/' + schoolId + '/rates', { stars: rating }, callback, (errorResponse) => {
      console.log(errorResponse);
    });
  }

  getKindergarten(id, callback, errorCallback) {
    this.doGet(this.url + `schools/${id}`, {}, callback, errorCallback);
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
