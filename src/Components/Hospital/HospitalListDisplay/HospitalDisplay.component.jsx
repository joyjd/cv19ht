import React from "react";
import { connect } from "react-redux";

import CardMedia from "@material-ui/core/CardMedia";
import "./../HospitalListDisplay/HospitalDisplay.style.scss";

import { CommunicatorFetch } from "./../../../Utils/Communicator/Communicator.component";
import ApiUrls from "./../../../Utils/ApiUrls.data";

import HospitalItem from "./HospitalItem/HospitalItem.component";
import { HospitalModalDetailTemplate } from "./../../../Modals/HospitalDetailsModal/HospitalModalDetailTemplate.component";
import HospitalListModal from "./HospitalListModal/HospitalListModal.component";

class HospitalListDisplay extends React.Component {
  completeHospitalData = [];
  modalContent = {
    body: "",
    headerTitle: "",
  };

  constructor() {
    super();
    this.state = {
      openZoneBackDrop: false,
      openModal: false,
    };
  }
  componentDidMount() {
    if (this.props.completeHospitalData != null) {
      this.completeHospitalData = this.props.completeHospitalData;
    }
  }
  createHospitalDetailModayBody = (data, c_bed, h_dist) => {
    let tempHtml;
    if (typeof data == "string") {
      tempHtml = <HospitalModalDetailTemplate c_bed={c_bed} h_dist={h_dist} />;
      this.modalContent.headerTitle = data;
    } else {
      tempHtml = <HospitalModalDetailTemplate data={data} c_bed={c_bed} h_dist={h_dist} />;
      this.modalContent.headerTitle = data["name"];
    }

    this.modalContent.body = tempHtml;
  };
  handleOpenModal = () => {
    this.setState({ openModal: true, openZoneBackDrop: false });
  };
  handleHospitalDetailsPre = (h_name, h_zone, c_bed, h_dist) => {
    this.setState(
      {
        openZoneBackDrop: true,
      },
      () => this.handleHospitalDetails(h_name, h_zone, c_bed, h_dist)
    );
  };

  handleHospitalDetails = (h_name, h_zone, c_bed, h_dist) => {
    if (this.completeHospitalData[h_name]) {
      this.createHospitalDetailModayBody(this.completeHospitalData[h_name], c_bed, h_dist);
      this.handleOpenModal();
    } /* else if(){
           // For satellite cases
    }  */ else {
      let searchText = "" + h_name + "," + h_zone + ",West Bengal,India";
      let params = searchText + "&inputtype=textquery&fields=place_id";

      CommunicatorFetch(ApiUrls.getPlaceDetails, params)
        .then(
          (data) => {
            if (data["candidates"].length != 0) {
              let place_id = data["candidates"][0]["place_id"];
              let prms = place_id + "&fields=name,geometry,photos,rating,adr_address,business_status,formatted_address,formatted_phone_number,international_phone_number,opening_hours,website,price_level,rating,review,user_ratings_total";
              return prms;
              //return CommunicatorFetch(ApiUrls.getHospitalCompleteDetails, prms);
            } else {
              return "";
            }
          },
          (error) => {
            //handle error scenerio for first call
            console.log("HospitalZoneComponent+ First call====p_id-=====ERROR !!!!!!");
          }
        )
        .then((prms) => CommunicatorFetch(ApiUrls.getHospitalCompleteDetails, prms))
        .then(
          (data) => {
            if (data != "") {
              //get the new data
              if (data != undefined) {
                this.completeHospitalData[h_name] = data["result"];
                //Call function to form body
                this.createHospitalDetailModayBody(this.completeHospitalData[h_name], c_bed, h_dist);
                this.handleOpenModal();
              } else {
                this.createHospitalDetailModayBody(h_name, c_bed, h_dist);
                this.handleOpenModal();
              }
            } else {
              this.createHospitalDetailModayBody(h_name, c_bed, h_dist);
              this.handleOpenModal();
            }
          },
          (error) => {
            // handle error scenerio for second call
            console.log("HospitalZoneComponent+ Second call====details-=====ERROR !!!!!!");
          }
        );
    }
  };

  handleCloseModal = () => {
    this.setState({ openModal: false });
    this.modalContent.headerTitle = "";
    this.modalContent.body = "";
  };

  render() {
    return this.props.selectedHospitalList != null ? (
      <CardMedia>
        <div className='hospitalListHoldContainer'>
          <HospitalItem selectedHospitalList={this.props.selectedHospitalList} onClick={(h_name, h_zone, c_bed, h_dist) => this.handleHospitalDetailsPre(h_name, h_zone, c_bed, h_dist)} />
        </div>
        <div className='disclaimerHospital'>
          <div>* Data displayed is as per WB Government website</div>
          <div>* Distances shown are tentative and may not be exactly accurate</div>
        </div>
        <HospitalListModal open={this.state.openModal} onClose={this.handleCloseModal} headerTitle={this.modalContent.headerTitle} body={this.modalContent.body} />
      </CardMedia>
    ) : null;
  }
}
const mapStateToProps = (state) => ({
  selectedHospitalList: state.selectedHospitalList.selectedHospital,
  completeHospitalData: state.rawHospitalData.rawHospitalData,
});
export default connect(mapStateToProps)(HospitalListDisplay);
