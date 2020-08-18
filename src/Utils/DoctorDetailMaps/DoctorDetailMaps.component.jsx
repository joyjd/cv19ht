import React from "react";

import Button from "@material-ui/core/Button";

import GmapIframe from "./../../Modals/HospitalDetailsModal/RoadDirectionHospital/gmapIframe.component";

class DoctorDetailMaps extends React.Component {
  proxyNeedFlagDocDetails = false;
  DocDetailsFetchTryCount = 0;
  constructor(props) {
    super(props);
    this.state = {
      mapsEnabled: null,
    };
  }

  getDetails = () => {
    this.setState({
      mapsEnabled: "",
    });
  };
  render() {
    return this.state.mapsEnabled !== null ? (
      <GmapIframe zoom={15} hospitalCord={[this.props.location.lat, this.props.location.lng]} />
    ) : (
      <Button style={{ backgroundColor: "#8398a9", color: "#ffffff", margin: "10px 0", padding: "0 5px" }} onClick={() => this.getDetails()}>
        Get Road Directions
      </Button>
    );
  }
}

export default DoctorDetailMaps;
