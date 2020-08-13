import React from "react";
import { connect } from "react-redux";
import "./../Hospital/Hospital.style.scss";

import Paper from "@material-ui/core/Paper";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import DomainTwoToneIcon from "@material-ui/icons/DomainTwoTone";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Typography from "@material-ui/core/Typography";
import ExposureIcon from "@material-ui/icons/Exposure";

import HospitalCountDisplay from "./../Hospital/HospitalCountDisplay.component";
import SearchBox from "./../Hospital/SearchBox/SearchBox.component";
import FilterDisplay from "./FilterDisplay/FilterDisplay.component";
import SortDisplay from "./SortDisplay/SortDisplay.component";
import TagsDisplay from "./../Common/TagsDisplay/TagsDisplay.component";
import HostiptalZoneCountDisplay from "./HostiptalZoneCountDisplay.component";
import HospitalListDisplay from "./HospitalListDisplay/HospitalDisplay.component";
import * as geolib from "geolib";

import { customSort, capitalletter } from "./../../Utils/Sort.component";

import { setSelectedHospitalList } from "./../../redux/selectedHospital/selectedHospital.action";
import { setSelectedHospitalZoneTags } from "./../../redux/selectedHospital/selectedHospitalZoneTags.action";

class Hospital extends React.Component {
  loc_selectedHospitalCount = 0;
  pendingChange = false;
  constructor(props) {
    super(props);
    this.state = {
      loc_hospitalZoneTags: [],
    };
  }

  componentDidMount() {}
  componentDidUpdate() {
    if (this.props.locationTags != null && this.props.hospitalDetails != null && this.props.userCords != null && this.props.searchText == null) {
      this.prepareSelectedZoneHospitalList();
    } else if (this.props.locationTags != null && this.props.hospitalDetails != null && this.props.userCords != null && this.props.searchText != null) {
      this.pendingChange = true; //********** IMPLEMENT LATER */
    }
  }

  prepareSelectedZoneHospitalList = () => {
    let tempHptlList = [];
    let hospitalZoneTags = [];

    this.props.locationTags.forEach((elem) => {
      if (this.props.hospitalDetails[capitalletter(elem)]) {
        this.props.hospitalDetails[capitalletter(elem)].forEach((el) => {
          if (el["h_loc"]["lat"] != undefined || el["h_loc"]["lng"] != undefined) {
            el["h_dist"] = Number(geolib.getPreciseDistance({ latitude: this.props.userCords[0], longitude: this.props.userCords[1] }, { latitude: el["h_loc"]["lat"], longitude: el["h_loc"]["lng"] }) / 1000);
          }
          // console.log(el["h_dist"]);
          tempHptlList.push(el);
        });
        hospitalZoneTags.push(capitalletter(elem));
      }
    });
    //By default Show Kolkata zone- if nothing matches
    if (hospitalZoneTags.length == 0) {
      this.props.hospitalDetails["Kolkata"].forEach((elem) => {
        tempHptlList.push(elem);
      });
      hospitalZoneTags.push("Kolkata");
    }

    this.props.setSelectedlList(customSort(tempHptlList));
    this.props.setSelectedHospitalZoneTags(hospitalZoneTags);
    this.loc_selectedHospitalCount = tempHptlList.length;
    this.pendingChange = false;
  };

  render() {
    return this.props.locationTags != null ? (
      <Paper elevation={3} className='transparentBorder' id='containerHospitalList'>
        <div className='hospitalTitleContainer'>
          <div className='hospitalIconholder transparentBorder'>
            <DomainTwoToneIcon fontSize='large' color='primary'></DomainTwoToneIcon>
          </div>
          <div className='hospitalTitleHolderContainer'>
            <div className='hospitalAvatar'>
              <LocalHospitalIcon color='secondary' />
            </div>
            <HospitalCountDisplay />
          </div>
        </div>
        <SearchBox />
        <div className='customButtonGroup'>
          <Paper variant='outlined' square>
            {this.props.searchText == null ? (
              <div className='btnCol'>
                <FilterDisplay />
                <SortDisplay />
              </div>
            ) : null}
            {this.props.searchText == null ? (
              <div>
                <div className='tagHeaderTitle'>
                  <Typography color='textSecondary'>
                    <ExposureIcon fontSize='small' />
                  </Typography>
                  <Typography color='textSecondary'>
                    Selected Areas / Zones (<HostiptalZoneCountDisplay />)
                  </Typography>
                </div>
                <div>
                  <TagsDisplay tagtype='hospitalTag' />
                </div>
              </div>
            ) : null}
          </Paper>
        </div>
        <HospitalListDisplay />
      </Paper>
    ) : null;
  }
}

const mapDispatchToProps = (dispatch) => ({
  setSelectedlList: (selectedHospitalList) => dispatch(setSelectedHospitalList(selectedHospitalList)),
  setSelectedHospitalZoneTags: (selectedZoneTags) => dispatch(setSelectedHospitalZoneTags(selectedZoneTags)),
});

const mapStateToProps = (state) => ({
  hospitalDetails: state.totalHospitalDetails.totalHospitalDetails,
  locationTags: state.locationTags.locationTags,
  searchText: state.searchText.searchText,
  userCords: state.userCords.userCords,
});

export default connect(mapStateToProps, mapDispatchToProps)(Hospital);
