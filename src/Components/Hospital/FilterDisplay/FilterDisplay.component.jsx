import React from "react";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import "./../FilterDisplay/FilterDisplay.style.scss";

import { setSelectedHospitalList } from "./../../../redux/selectedHospital/selectedHospital.action";
import { setSearchText } from "./../../../redux/search/search.action";
import { setSelectedHospitalZoneTags } from "./../../../redux/selectedHospital/selectedHospitalZoneTags.action";

import FilterTags from "./FilterModal/FilterAreaTags.component";

class FilterDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      areaTagsOption: false,
    };
  }

  handleCloseAreaTags = (el, opt) => {
    if (opt == "") {
      let temp = [];
      el.forEach((e) => {
        if (this.props.hospitalDetails[e]) {
          temp = temp.concat(this.props.hospitalDetails[e]);
        }
      });

      this.props.setSelectedlList(temp);
      this.props.setSelectedHospitalZoneTags(el);
    }
    this.setState(
      {
        areaTagsOption: false,
      },
      () => this.props.setSearchText(null)
    );
  };

  handleOpenAreaTags = () => {
    this.setState({
      areaTagsOption: true,
    });
  };

  render() {
    return this.props.selectedHospitalZoneTags != null && this.props.hospitalDetails != null ? (
      <div className='filterDiv'>
        <Button variant='contained' color='primary' onClick={() => this.handleOpenAreaTags()}>
          Filter by Area / Zones
        </Button>
        <FilterTags open={this.state.areaTagsOption} onClose={(el, opt) => this.handleCloseAreaTags(el, opt)} />
      </div>
    ) : null;
  }
}

const mapStateToProps = (state) => ({
  selectedHospitalZoneTags: state.selectedHospitalZoneTags.selectedHospitalZoneTags,
  hospitalDetails: state.totalHospitalDetails.totalHospitalDetails,
});

const mapDispatchToProps = (dispatch) => ({
  setSelectedlList: (selectedHospitalList) => dispatch(setSelectedHospitalList(selectedHospitalList)),
  setSearchText: (search) => dispatch(setSearchText(search)),
  setSelectedHospitalZoneTags: (selectedZoneTags) => dispatch(setSelectedHospitalZoneTags(selectedZoneTags)),
});
export default connect(mapStateToProps, mapDispatchToProps)(FilterDisplay);
