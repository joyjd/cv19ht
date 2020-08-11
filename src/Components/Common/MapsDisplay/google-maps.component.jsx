import React from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import GoogleCredentials from "./../../../Utils/GoogleCredentials";
import "./../MapsDisplay/google-maps.style.scss";
const containerStyle = {
  position: "relative",
  width: "inherit",
  height: "inherit",
};

class GoogleMaps extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className='mapHolder'>
        <Map
          key={new Date().getTime()}
          google={this.props.google}
          zoom={14}
          containerStyle={containerStyle}
          initialCenter={{
            lat: this.props.currentLat,
            lng: this.props.currentLong,
          }}
        >
          <Marker />
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: GoogleCredentials.apiKey,
})(GoogleMaps);
