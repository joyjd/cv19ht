import React from "react";
import { connect } from "react-redux";

import Paper from "@material-ui/core/Paper";
import "./../MapsDisplay/MapsDisplay.style.scss";

import GoogleMaps from "./google-maps.component";

const MapsDisplay = ({ userCords }) => {
  return userCords != null ? (
    <div className='mapcontainer'>
      <Paper variant='outlined' className='shadowCustom'>
        <div className='mapcontainer'>
          <GoogleMaps currentLat={userCords[0]} currentLong={userCords[1]}></GoogleMaps>
        </div>
      </Paper>
    </div>
  ) : null;
};

const mapStateToProps = (state) => ({
  userCords: state.userCords.userCords,
});

export default connect(mapStateToProps)(MapsDisplay);
