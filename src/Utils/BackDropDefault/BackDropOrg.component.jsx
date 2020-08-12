import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import LinearProgress from "@material-ui/core/LinearProgress";
export const BackDropDefault = ({ open }) => {
  return open ? (
    <Backdrop open style={{ backgroundColor: "#183259", zIndex: "1", opacity: "0.95" }}>
      <div className='loadTrackerWelcome'>
        <div className='loaderContainer'>
          <CircularProgress />
        </div>
        <div className='loaderTextContainer'>Please wait while we try to trace your current location..</div>
        <LinearProgress />
      </div>
    </Backdrop>
  ) : null;
};
