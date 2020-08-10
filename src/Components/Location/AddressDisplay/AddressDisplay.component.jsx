import React from "react";
import { connect } from "react-redux";

import LocationOnIcon from "@material-ui/icons/LocationOn";
import PersonPinIcon from "@material-ui/icons/PersonPin";

import "./../AddressDisplay/AddressDisplay.style.scss";

const AddressDisplay = ({ formattedAddress }) => {
  return (
    <div>
      <div className='locationTitleContainer'>
        <div className='locationIconholder'>
          <LocationOnIcon fontSize='large' color='primary'></LocationOnIcon>
        </div>
        <div className='locationDesc'>
          <div>
            <PersonPinIcon />
          </div>
          <div> Your current location :</div>
        </div>
      </div>
      <div>
        <div className='AddressContainer'>
          <div className='addressHolder'>
            <address>{formattedAddress}</address>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  formattedAddress: state.formattedAddress.formattedAddress,
});

export default connect(mapStateToProps)(AddressDisplay);
