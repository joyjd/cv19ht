import React from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import GoogleCredentials from "./../../../Utils/GoogleCredentials";
import "./../SelectedHospitalSnapShot/SelectedHospitalSnapShot.style.scss";

import { connect } from "react-redux";

const containerStyle = {
  position: "relative",
  width: "inherit",
  height: "inherit",
};

class SelectedHospitalSnapShot extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.searchText != null) {
      return false;
    } else if (JSON.stringify(nextProps.selectedHospitalList.sort()) == JSON.stringify(this.props.selectedHospitalList.sort())) {
      return false;
    } else {
      if (JSON.stringify(nextProps.selectedHospitalZoneTags) == JSON.stringify(this.props.selectedHospitalZoneTags)) {
        return false;
      } else {
        return true;
      }
    }
  }

  render() {
    return this.props.selectedHospitalList != null ? (
      <div className='mapHolderHospitalSnapshot'>
        <Map
          key={new Date().getTime()}
          google={this.props.google}
          zoom={10}
          containerStyle={containerStyle}
          initialCenter={{
            lat: this.props.userCords[0],
            lng: this.props.userCords[1],
          }}
        >
          {this.props.selectedHospitalList.map((loc, index) => (
            <Marker key={index} position={{ lat: loc.h_loc.lat, lng: loc.h_loc.lng }} name={loc.h_name} id={1}></Marker>
          ))}
        </Map>
        <div className='instructionSnapShot'>
          <strong>{this.props.selectedHospitalList.length} Hospitals </strong> found at your selected Areas/Zones.
          <br />
          Scroll down to view the detailed list of hospitals.
        </div>
      </div>
    ) : null;
  }
}

const mapStateToProps = (state) => ({
  userCords: state.userCords.userCords,
  selectedHospitalList: state.selectedHospitalList.selectedHospital,
  searchText: state.searchText.searchText,
  selectedHospitalZoneTags: state.selectedHospitalZoneTags.selectedHospitalZoneTags,
});

export default connect(mapStateToProps)(
  GoogleApiWrapper({
    apiKey: GoogleCredentials.apiKey,
  })(SelectedHospitalSnapShot)
);
