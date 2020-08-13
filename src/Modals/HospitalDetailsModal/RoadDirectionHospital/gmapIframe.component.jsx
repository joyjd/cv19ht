import React from "react";
import { connect } from "react-redux";
import GoogleCredentials from "./../../../Utils/GoogleCredentials";

const iframe = "<iframe   width='100%' height='300px' frameborder='0' style='border:0' src='https://www.google.com/maps/embed/v1/directions?key=";

const GmapIframe = (props) => {
  return <div className='iframe-container' dangerouslySetInnerHTML={{ __html: iframe ? iframe + GoogleCredentials.apiKey + "&origin=" + props.userCords[0] + "," + props.userCords[1] + "&destination=" + props.hospitalCord[0] + "," + props.hospitalCord[1] + "&zoom=9&avoid=tolls|highways' allowfullscreen></iframe>" : "" }} />;
};

const mapStateToProps = (state) => ({
  userCords: state.userCords.userCords,
});
export default connect(mapStateToProps)(GmapIframe);
