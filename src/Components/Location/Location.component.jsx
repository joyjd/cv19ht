import React from "react";
import { connect } from "react-redux";

import "./../Location/Location.style.scss";
import Paper from "@material-ui/core/Paper";

import AddressDisplay from "./AddressDisplay/AddressDisplay.component";
import MapsDisplay from "./../Common/MapsDisplay/MapsDisplay.component";
import TagsDisplay from "./../Common/TagsDisplay/TagsDisplay.component";
import { setLocationTags } from "./../../redux/userAddress/locationTags.action";

const exclusiveKeywords = ["country"];

class Location extends React.Component {
  renderCount = 0;
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidUpdate() {
    if (this.props.addressComponents != null) {
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

  render() {
    return this.props.addressComponents != null ? (
      <div className='locationCardContainer'>
        <Paper elevation={3} className='transparentBorder'>
          <AddressDisplay />
          <MapsDisplay />
          <TagsDisplay tagtype='userTag' />
        </Paper>
      </div>
    ) : null;
  }
}

const mapDispatchToProps = (dispatch) => ({
  setLocationTags: (locationTags) => dispatch(setLocationTags(locationTags)),
});

const mapStateToProps = (state) => ({
  addressComponents: state.addressComponents.addressComponents,
});

export default connect(mapStateToProps, mapDispatchToProps)(Location);
