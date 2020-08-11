import React from "react";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import "./../SortDisplay/SortDisplay.style.scss";

import { setSelectedHospitalList } from "./../../../redux/selectedHospital/selectedHospital.action";

import SortModal from "./SortModal/SortModal.component";

class SortDisplay extends React.Component {
  sortOptions = "";
  constructor(props) {
    super(props);
    this.state = {
      openFilteralert: false,
    };
  }

  sortData = () => {
    if (this.sortOptions == "isChecked_op_hospital") {
      let temp = this.props.selectedHospitalList.sort((a, b) => Number(a["h_dist"]) - Number(b["h_dist"]));
      let lastIndex = null;
      let remArr = [];
      temp.forEach((hospital, index) => {
        if (hospital["h_dist"] == "") {
          lastIndex = index;
        }
      });

      if (lastIndex != null) {
        remArr = temp.splice(0, lastIndex + 1);
      }
      console.log(remArr);
      temp = temp.concat(remArr);

      this.props.setSelectedlList(temp);
    } else {
      this.props.setSelectedlList(this.props.selectedHospitalList.sort((a, b) => b["c_bed"] - a["c_bed"]));
    }
  };
  handleSwitchChange = (val) => {
    this.sortOptions = val;
  };

  handleOpenFilter = () => {
    this.setState({
      openFilteralert: true,
    });
  };
  handleCloseAlert = (el) => {
    this.setState({
      openFilteralert: false,
    });
    if (el) {
      this.sortData();
    }
  };

  render() {
    return (
      <div className='sortDiv'>
        <Button variant='contained' color='primary' onClick={() => this.handleOpenFilter()}>
          Manage View
        </Button>
        <SortModal open={this.state.openFilteralert} onClose={(el) => this.handleCloseAlert(el)} initialVal={this.sortOptions} handleRadioChange={(val) => this.handleSwitchChange(val)} />
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  setSelectedlList: (selectedHospitalList) => dispatch(setSelectedHospitalList(selectedHospitalList)),
});

const mapStateToProps = (state) => ({
  selectedHospitalList: state.selectedHospitalList.selectedHospital,
});

export default connect(mapStateToProps, mapDispatchToProps)(SortDisplay);
