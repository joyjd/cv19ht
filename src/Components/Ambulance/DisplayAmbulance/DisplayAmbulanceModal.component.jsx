import React from "react";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";

import "./../DisplayAmbulance/DisplayAmbulanceModal.style.scss";
import Divider from "@material-ui/core/Divider";

import GoogleCredentials from "./../../../Utils/GoogleCredentials";

import Button from "@material-ui/core/Button";

const iframe = "<iframe width='100%' height='450px' frameborder='0' style='border:0' src='https://www.google.com/maps/embed/v1/search?key=";

const Iframe = (props) => {
  //props.iframe = props.iframe + props.pin + "' allowfullscreen></iframe>";
  return <div className='iframe-container' dangerouslySetInnerHTML={{ __html: props.iframe ? props.iframe + GoogleCredentials.apiKey + "&center=" + props.userCords[0] + "," + props.userCords[1] + "&zoom=11&q=health+ambulance+service+medical+near+" + props.pin + "' allowfullscreen></iframe>" : "" }} />;
};

const DisplayAmbulance = (props) => {
  return (
    <Dialog fullScreen open={props.open} onClose={props.onclose} aria-labelledby='Display Ambulances' aria-describedby='Display Ambulances'>
      <div className='filterTagsHeader'>Check Ambulance Services Near You</div>
      <div className='filterTagsBodySortAmbulance'>
        <div className='SortTitleDesc'>View available ambulance services near you.We strongly suggest to call and book an appointment.</div>
        <div className='dividerHolder'>
          <Divider />
        </div>
        <div className='iframeContainer'>
          <Iframe iframe={iframe} pin={props.addressComponents[props.addressComponents.length - 1]["long_name"]} userCords={props.userCords} />
        </div>
        <div className='actionHolder'>
          <Button variant='contained' color='primary' onClick={() => props.onclose()}>
            Close
          </Button>
        </div>
      </div>
    </Dialog>
  );
};
const mapStateToProps = (state) => ({
  addressComponents: state.addressComponents.addressComponents,
  userCords: state.userCords.userCords,
});
export default connect(mapStateToProps)(DisplayAmbulance);
