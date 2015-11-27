import React from 'react';
import {default as update} from 'react-addons-update';

import {GoogleMap, Marker} from 'react-google-maps';
import {default as ScriptjsLoader} from 'react-google-maps/lib/async/ScriptjsLoader';
import {default as MarkerClusterer} from "react-google-maps/lib/addons/MarkerClusterer"

import BackendConnection from '../connections/BackendConnection';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: []
    }

    BackendConnection.getLocations((response) => {
      const markers = response.map((marker) => {
        return {
          position: {
            lat: marker.latitude,
            lng: marker.longitude,
          },
          key: marker.id,
          name: marker.name,
          defaultAnimation: 0
        };
      })
      this.setState({markers: markers});
    });
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
                defaultZoom={11}
                defaultCenter={{lat: 52.2468517, lng: 21.0075741}}>
                <MarkerClusterer
                  averageCenter={true}
                  enableRetinaIcons={true}
                  gridSize={60}>
                  {this.state.markers.map((marker, index) => {
                    return (
                      <Marker
                        {...marker}
                      />
                    );
                  })}
                </MarkerClusterer>
              </GoogleMap>
            }
          />
        </div>
      </div>
    );
  }
}
