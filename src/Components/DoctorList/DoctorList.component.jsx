import React from "react";
import { connect } from "react-redux";

import "./../DoctorList/DoctorList.style.scss";
import { CommunicatorFetch } from "./../../Utils/Communicator/Communicator.component";
import ApiUrls from "./../../Utils/ApiUrls.data";

import DoctorListModal from "./../../Modals/DoctorListModal/DoctorListModal.component";

class DoctorList extends React.Component {
  listOpen = false;
  proxyNeedFlagDoc = false;
  DocFetchTryCount = 0;
  constructor() {
    super();
    this.state = {
      openModal: false,
      loc_cords: [],
      loc_cordsChanged: false,
      doctorListData: null,
    };
  }
  componentDidMount() {}

  componentDidUpdate() {
    if (this.state.loc_cordsChanged) {
      this.getDocList();
    }
  }

  shouldComponentUpdate() {
    if (!this.listOpen) {
      return false;
    }
    return true;
  }

  handleOpenModal = () => {
    this.listOpen = true;
    this.setState({
      openModal: true,
      loc_cordsChanged: this.props.userCords === this.state.loc_cords ? false : true,
      loc_cords: this.props.userCords === this.state.loc_cords ? this.state.loc_cords : this.props.userCords,
    });
  };
  handleCloseModal = () => {
    this.setState(
      {
        openModal: false,
      },
      () => (this.listOpen = false)
    );
  };

  getDocList = () => {
    let doctorFetchCall;
    if (this.proxyNeedFlagDoc) {
      doctorFetchCall = CommunicatorFetch(ApiUrls.getDoctorList, this.props.userCords[0] + "," + this.props.userCords[1] + "&rankby=distance&type=doctor", "proxyNeeded");
    } else {
      doctorFetchCall = CommunicatorFetch(ApiUrls.getDoctorList, this.props.userCords[0] + "," + this.props.userCords[1] + "&rankby=distance&type=doctor");
    }
    //fetch("https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=doctor&location=" + this.props.userCords[0] + "," + this.props.userCords[1] + "&rankby=distance&type=doctor&key=AIzaSyArulgFkLD1tIDxd0ia5YDtjMd53J8Zuwc")
    doctorFetchCall.then(
      (data) => {
        this.setState({
          loc_cordsChanged: false,
          doctorListData: data["results"],
        });
      },
      (error) => {
        ++this.DocFetchTryCount;
        if (this.DocFetchTryCount === 1) {
          this.proxyNeedFlagDoc = true;
          this.getDocList();
        }
        if (this.DocFetchTryCount > 1) {
          this.DocFetchTryCount = 0;
          this.proxyNeedFlagDoc = false;
          this.handleCloseModal();
        }
      }
    );
  };

  render() {
    return (
      <div className='DoctorHolderContainer'>
        <div className='DoctorHolder' onClick={() => this.handleOpenModal()}></div>
        <DoctorListModal open={this.state.openModal} doctorListData={this.state.doctorListData} onclose={() => this.handleCloseModal()} />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  userCords: state.userCords.userCords,
});
export default connect(mapStateToProps)(DoctorList);
