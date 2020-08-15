import { connect } from "react-redux";

const HostiptalZoneCountDisplay = ({ selectedHospitalZoneTags }) => {
  return selectedHospitalZoneTags !== null ? selectedHospitalZoneTags.length : null;
};

const mapStateToProps = (state) => ({
  selectedHospitalZoneTags: state.selectedHospitalZoneTags.selectedHospitalZoneTags,
});
export default connect(mapStateToProps)(HostiptalZoneCountDisplay);
