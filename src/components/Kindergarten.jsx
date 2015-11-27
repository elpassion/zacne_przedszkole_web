import React from 'react';
import {default as update} from 'react-addons-update';

import {GoogleMap, Marker} from 'react-google-maps';
import ScriptjsLoader from 'react-google-maps/lib/async/ScriptjsLoader';
import MarkerClusterer from "react-google-maps/lib/addons/MarkerClusterer"

import BackendConnection from '../connections/BackendConnection';
import configuration from '../configuration.js'
import LocalStorage from '../lib/LocalStorage';

export default class Kindergarten extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      kindergarten: {},
      marker: {},
      isMarkerLoaded: false,
      alreadyVoted: true
    }
    this.getKindergarten();
  }

  render() {
    return (
      <div id='home-page' className='page-content'>
        <div className='kindergartens-map'>
          <ScriptjsLoader
            hostname={"maps.googleapis.com"}
            pathname={"/maps/api/js"}
            query={{v: '3', libraries: "geometry,drawing,places"}}
            loadingElement={
              <div {...this.props} style={{ height: "100%" }} />
            }
            containerElement={
              <div {...this.props} style={{ height: "100%" }} />
            }
            googleMapElement={
              <GoogleMap
                ref='map'
                defaultZoom={configuration.defaultMapZoom}
                zoom={this.mapZoom()}
                defaultCenter={configuration.defaultMapCenter}
                center={this.mapCenter()}>
                <MarkerClusterer
                  averageCenter={true}
                  enableRetinaIcons={true}
                  gridSize={60}>
                  {this.renderMarker()}
                </MarkerClusterer>
              </GoogleMap>
            }
          />
        </div>
        <div className='kindergarten-info'>
          <div className='kindergarten-header l-box'>
            <div className='pure-g'>
              <div className='pure-u-3-4 kindergarten-name'>
                <h3>{this.state.kindergarten.name}</h3>
              </div>
              <div className='pure-u-1-4 kindergarten-rating'>
                <div className='rating pull-right'>
                  {Math.floor(this.state.kindergarten.stars || 0)}/10
                </div>
              </div>
            </div>
          </div>

          <div className='pure-g'>
            <div className='pure-u-1-4' />
            <div className='pure-u-1-2 separator' />
          </div>


          <div className='pure-g' hidden={this.state.alreadyVoted}>
            <div className='pure-u-1'>
              <div className='pure-g'>
                <div className='pure-u-1 center'>
                  <span>Jak oceniasz to przedszkole?</span>
                  <div className='stars-rating'>
                    <span onClick={this.rate.bind(this, 10)}>☆</span>
                    <span onClick={this.rate.bind(this, 9)}>☆</span>
                    <span onClick={this.rate.bind(this, 8)}>☆</span>
                    <span onClick={this.rate.bind(this, 7)}>☆</span>
                    <span onClick={this.rate.bind(this, 6)}>☆</span>
                    <span onClick={this.rate.bind(this, 5)}>☆</span>
                    <span onClick={this.rate.bind(this, 4)}>☆</span>
                    <span onClick={this.rate.bind(this, 3)}>☆</span>
                    <span onClick={this.rate.bind(this, 2)}>☆</span>
                    <span onClick={this.rate.bind(this, 1)}>☆</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='pure-u-1-4' />
            <div className='pure-u-1-2 separator' />
          </div>

          <div className='pure-g'>
            <div className='pure-u-1-2 pure-md-u-1'>
              <div className='column l-box right-border'>
                <div className='header'>Adres</div>
                <div className='pure-g'>
                  <div className='pure-u-1-2 field-name'>Miasto</div>
                  <div className='pure-u-1-2 field-value'>{this.state.kindergarten.city}</div>
                  <div className='pure-u-1-2 field-name'>Ulica</div>
                  <div className='pure-u-1-2 field-value'>{this.state.kindergarten.address}</div>
                  <div className='pure-u-1-2 field-name'>Kod pocztowy</div>
                  <div className='pure-u-1-2 field-value'>{this.state.kindergarten.postCode}</div>
                </div>
              </div>
            </div>

            <div className='pure-u-1-2 pure-md-u-1'>
              <div className='column l-box'>
                <div className='header'>Kontakt</div>
                <div className='pure-g'>
                  <div className='pure-u-1-2 field-name'>Telefon</div>
                  <div className='pure-u-1-2 field-value'>{this.state.kindergarten.phone}</div>
                  <div className='pure-u-1-2 field-name'>Email</div>
                  <div className='pure-u-1-2 field-value'>{this.state.kindergarten.email}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  rate(rating) {
    console.log(this);
    BackendConnection.rateSchool(this.state.kindergarten.id, rating, this.kindergartenRated.bind(this));
  }

  kindergartenRated(school) {
    const votes = LocalStorage.getObject("votes");
    votes[this.state.kindergarten.id] = true;
    LocalStorage.setObject("votes", votes);
    this.kindergatenLoaded(school);
  }

  renderMarker() {
    if (this.state.isMarkerLoaded) return <Marker {...this.state.marker}/>;
  }

  mapZoom() {
    return (this.state.isMarkerLoaded) ? 15 : 11;
  }

  mapCenter() {
    return (this.state.isMarkerLoaded) ? {lat: this.state.marker.position.lat, lng: this.state.marker.position.lng} : configuration.defaultMapCenter;
  }

  getKindergarten() {
    BackendConnection.getKindergarten(this.props.params.id, this.kindergatenLoaded.bind(this), this.kindergatenNotLoaded.bind(this));
  }

  kindergatenLoaded(response) {
    this.setState({
      marker: this.markerFromKindergarten(response),
      kindergarten: response,
      isMarkerLoaded: this.validPositions(response),
      alreadyVoted: this.alreadyVoted(response.id)
    });
    document.title = response.name;
  }

  alreadyVoted(schoolId) {
    return LocalStorage.getObject("votes")[schoolId.toString()];
  }

  markerFromKindergarten(kindergarten) {
    return {
      position: {
        lat: kindergarten.latitude,
        lng: kindergarten.longitude
      },
      key: kindergarten.id,
      name: kindergarten.name,
      animation: 2
    }
  }

  validPositions(kindergarten) {
    return kindergarten.latitude && kindergarten.longitude;
  }

  kindergatenNotLoaded() {
    this.props.history.pushState(null, '/przedszkole/brak', {});
  }

}
