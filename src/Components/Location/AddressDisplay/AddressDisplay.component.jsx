import React from "react";
import { connect } from "react-redux";

import LocationOnIcon from "@material-ui/icons/LocationOn";
import PersonPinIcon from "@material-ui/icons/PersonPin";

import CustomSwitch from "./../../../Utils/Switch/CustomSwitch.component";
import { setCommuteFlag } from "./../../../redux/userAddress/commuteFlag.action";

import "./../AddressDisplay/AddressDisplay.style.scss";

const AddressDisplay = ({ formattedAddress, setCommuteFlag }) => {
  const [state, setState] = React.useState({
    commuteFlag: false,
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
            <div className='commuterHolder'>
              <CustomSwitch handleChangeSwitch={(e) => handleChangeSwitch(e)} /> <div className={state.commuteFlag ? "labelSwitchActive" : "labelSwitchDefault"}>I am commuting/travelling right now.</div>
            </div>
          </div>
        </div>
      </div>
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
