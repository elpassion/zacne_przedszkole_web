import React from 'react';
import {default as update} from 'react-addons-update';

import {GoogleMap, Marker} from 'react-google-maps';
import {default as ScriptjsLoader} from 'react-google-maps/lib/async/ScriptjsLoader';
import {default as MarkerClusterer} from "react-google-maps/lib/addons/MarkerClusterer"

import BackendConnection from '../connections/BackendConnection';
import configuration from '../configuration.js'

export default class Kindergarten extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      kindergarten: {},
      marker: {},
      isMarkerLoaded: false
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
      </div>
    );
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
      marker: {
        position: {
          lat: response.latitude,
          lng: response.longitude,
          id: response.id,
          name: response.name
        }
      },
      isMarkerLoaded: true
    });
  }

  kindergatenNotLoaded() {
    console.log('Reirect here!!!!!');
  }

}
