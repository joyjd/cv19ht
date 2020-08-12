import React from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import GoogleCredentials from "./../../../Utils/GoogleCredentials";
import "./../MapsDisplay/google-maps.style.scss";

import { connect } from "react-redux";

import { setUserCords } from "./../../../redux/userAddress/userCords.action";
import { setCordChangeFlag } from "./../../../redux/userAddress/cordChangeFlag.action";

const containerStyle = {
  position: "relative",
  width: "inherit",
  height: "inherit",
};

class GoogleMaps extends React.Component {
  constructor() {
    super();
  }
  onMarkerDragEnd = (coord) => {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();
    this.props.setUserCords([lat, lng]);
    this.props.setuserCordsFlag(true);
    //console.log(lat + "," + lng);
  };
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
          <Marker title='Your current location' position={{ lat: this.props.currentLat, lng: this.props.currentLong }} name={"Your position"} id={1} draggable={true} onDragend={(t, map, coord) => this.onMarkerDragEnd(coord)}>
            <InfoWindow visible={true}>
              <div>
                <p>Click on the map or drag the marker to change your location</p>
              </div>
            </InfoWindow>
          </Marker>
        </Map>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setUserCords: (userCords) => dispatch(setUserCords(userCords)),
  setuserCordsFlag: (flag) => dispatch(setCordChangeFlag(flag)),
});

export default connect(
  null,
  mapDispatchToProps
)(
  GoogleApiWrapper({
    apiKey: GoogleCredentials.apiKey,
  })(GoogleMaps)
);
