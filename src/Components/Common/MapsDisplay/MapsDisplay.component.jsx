import React from "react";
import { connect } from "react-redux";

import Paper from "@material-ui/core/Paper";
import "./../MapsDisplay/MapsDisplay.style.scss";

import GoogleMaps from "./google-maps.component";

const MapsDisplay = ({ userCords, commuteFlag }) => {
  return userCords !== null ? (
    <div className='mapcontainer'>
      <Paper variant='outlined' className='shadowCustom'>
        <div className='mapcontainer'>
          <GoogleMaps currentLat={userCords[0]} currentLong={userCords[1]} draggable={!commuteFlag}></GoogleMaps>
          {!commuteFlag ? <div className='instruction'>Drag the Locator to change your present location.</div> : null}
        </div>
      </Paper>
    </div>
  ) : null;
};

const mapStateToProps = (state) => ({
  userCords: state.userCords.userCords,
  commuteFlag: state.commmuteFlag.commuteFlag,
});

export default connect(mapStateToProps)(MapsDisplay);
