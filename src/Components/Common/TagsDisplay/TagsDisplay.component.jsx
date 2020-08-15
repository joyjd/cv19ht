import React from "react";
import { connect } from "react-redux";
import "./../TagsDisplay/TagsDisplay.style.scss";

const TagsDisplay = (props) => {
  return props.locationTags !== null && props.selectedHospitalZoneTags !== null ? (
    props.tagtype === "userTag" ? (
      <div className='staticTagHolderContainer'>
        {props.locationTags.map((elem, index) => (
          <div key={index} className='staticKeyTags'>
            {elem}
          </div>
        ))}
      </div>
    ) : (
      <div className='staticTagHolderContainer'>
        {props.selectedHospitalZoneTags.map((elem, index) => (
          <div key={index} className='staticKeyTags'>
            {elem}
          </div>
        ))}
      </div>
    )
  ) : null;
};

const mapStateToProps = (state) => ({
  locationTags: state.locationTags.locationTags,
  selectedHospitalZoneTags: state.selectedHospitalZoneTags.selectedHospitalZoneTags,
});

export default connect(mapStateToProps)(TagsDisplay);
