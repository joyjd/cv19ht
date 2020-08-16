import React from "react";
import { connect } from "react-redux";

import "./../Location/Location.style.scss";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import AddressDisplay from "./AddressDisplay/AddressDisplay.component";
import MapsDisplay from "./../Common/MapsDisplay/MapsDisplay.component";
import TagsDisplay from "./../Common/TagsDisplay/TagsDisplay.component";
import { setLocationTags } from "./../../redux/userAddress/locationTags.action";
import { setLocationModal } from "./../../redux/locationInput/locationInput.action";
import Ambulance from "./../Ambulance/Ambulance.component";
import SelectedHospitalSnapShot from "./SelectedHospitalSnapShot/SelectedHospitalSnapShot.component";

import BorderColorIcon from "@material-ui/icons/BorderColor";
const exclusiveKeywords = ["country"];

class Location extends React.Component {
  renderCount = 0;
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidUpdate() {
    if (this.props.addressComponents !== null) {
      this.prepareLocationTags();
    }
  }
  static getDerivedStateFromProps(props, state) {
    // console.log("getDerivedStateFromProps executed");
    return null;
  }
  shouldComponentUpdate(nextProps, nextState) {
    // console.log("shouldComponentUpdate executed");
    return true;
  }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    // console.log("getSnapshotBeforeUpdate executed");
    return null;
  }

  prepareLocationTags = () => {
    let finalTags = this.props.addressComponents.filter((dataElem) => {
      return !dataElem.types.some((el) => exclusiveKeywords.includes(el));
    });

    this.props.setLocationTags([...new Set(finalTags.map((el) => el["long_name"]).filter((el) => el !== "West Bengal"))]);
  };

  handleOpenLocationModal = () => {
    this.props.setLocationModal(true);
  };

  render() {
    return this.props.addressComponents !== null ? (
      <div>
        <div className='locationCardContainer'>
          <Paper elevation={3} className='transparentBorder'>
            <AddressDisplay accessPermission={this.props.accessPermission} />
            <MapsDisplay />

            {!this.props.commuteFlag ? (
              <div className='addressInputHolder'>
                <div className='addressInputIconHolder'>
                  <BorderColorIcon fontSize='small' />
                </div>
                <Button
                  style={{
                    fontWeight: "500",
                    letterSpacing: "0",
                    textTransform: "none",
                  }}
                  size='small'
                  onClick={() => this.handleOpenLocationModal()}
                >
                  Not Correct? Type your current address
                </Button>
              </div>
            ) : null}

            <TagsDisplay tagtype='userTag' />
            <SelectedHospitalSnapShot />
          </Paper>
        </div>
        <Ambulance />
      </div>
    ) : null;
  }
}

const mapDispatchToProps = (dispatch) => ({
  setLocationTags: (locationTags) => dispatch(setLocationTags(locationTags)),
  setLocationModal: (locationModal) => dispatch(setLocationModal(locationModal)),
});

const mapStateToProps = (state) => ({
  addressComponents: state.addressComponents.addressComponents,
  commuteFlag: state.commmuteFlag.commuteFlag,
});

export default connect(mapStateToProps, mapDispatchToProps)(Location);
