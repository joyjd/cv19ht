import React from "react";
import { connect } from "react-redux";

const HospitalCountDisplay = ({ selectedHospitalList, searchText }) => {
  return selectedHospitalList !== null ? (
    <div>
      <div>Hospitals Found ({selectedHospitalList.length})*</div>
      {searchText === null ? <div className='listNature'>* based on your current location areas</div> : <div className='listNature'>* based on Search Results</div>}
    </div>
  ) : null;
};
const mapStateToProps = (state) => ({
  selectedHospitalList: state.selectedHospitalList.selectedHospital,
  searchText: state.searchText.searchText,
});
export default connect(mapStateToProps)(HospitalCountDisplay);
