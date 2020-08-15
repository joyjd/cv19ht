import React from "react";
import { connect } from "react-redux";

import LocationOnIcon from "@material-ui/icons/LocationOn";
import PersonPinIcon from "@material-ui/icons/PersonPin";

import CustomSwitch from "./../../../Utils/Switch/CustomSwitch.component";
import { setCommuteFlag } from "./../../../redux/userAddress/commuteFlag.action";
import InfoIcon from "@material-ui/icons/Info";
import Dialog from "@material-ui/core/Dialog";
import CloseIcon from "@material-ui/icons/Close";
import "./../AddressDisplay/AddressDisplay.style.scss";

const AddressDisplay = ({ accessPermission, formattedAddress, setCommuteFlag }) => {
  const [state, setState] = React.useState({
    commuteFlag: false,
    infoFlag: false,
  });

  let loc_commuteFlag = false;
  const handleChangeSwitch = (event) => {
    // console.log(event.target.checked);
    setState({
      commuteFlag: event.target.checked,
    });
    loc_commuteFlag = event.target.checked ? "labelSwitchActive" : "labelSwitchDefault";
    setCommuteFlag(event.target.checked);
  };

  const handleInfoClose = () => {
    setState({
      infoFlag: false,
    });
  };

  const openInfoFlag = () => {
    setState({
      infoFlag: true,
    });
  };

  return (
    <div>
      <div className='locationTitleContainer'>
        <div className={state.commuteFlag ? "locationIconholder locationIconholderGlow" : "locationIconholder"}>
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
            {accessPermission ? (
              <div className='commuterHolder'>
                <CustomSwitch handleChangeSwitch={(e) => handleChangeSwitch(e)} />
                <div className={state.commuteFlag ? "labelSwitchActive" : "labelSwitchDefault"}>
                  <div className='textSpan'> I am commuting/travelling right now.</div>
                  <div className='enbContainer'>
                    <span className='EnableDisable'>{state.commuteFlag ? "Enabled" : "Disabled"}</span>
                    <span onClick={() => openInfoFlag()}>
                      <InfoIcon style={{ color: "#a3cccb" }} fontSize='medium' />
                    </span>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <Dialog onClose={() => handleInfoClose()} aria-labelledby='Commute Description' open={state.infoFlag}>
        <div className='InfoCloseDiv'>
          <CloseIcon onClick={() => handleInfoClose()} />
        </div>
        <div className='infoBody'>
          Enabling <strong>"I am commuting/travelling right now" </strong> indicates that you are not at a particular position/home but travelling to someplece right now. Once enabled, we will track your current changing location details and update available hospitals nearby to you automatically in a periodic manner as you travel.
          <br />
          <br />
          Note: If you need to search a particular hospital details or check available hospitals of different zones/areas, we suggest you to <strong>disable this option</strong> so that the location updates doesn't disrupt your activity.
        </div>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => ({
  formattedAddress: state.formattedAddress.formattedAddress,
});
const mapDispatchToProps = (dispatch) => ({
  setCommuteFlag: (commuteFlag) => dispatch(setCommuteFlag(commuteFlag)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AddressDisplay);
