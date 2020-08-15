import React from "react";

import "./../Footer/Footer.style.scss";

import BottomNavigation from "@material-ui/core/BottomNavigation";

import ContactMe from "./../ContactMe/ContactMe.component";
import ContactMailIcon from "@material-ui/icons/ContactMail";
import IconButton from "@material-ui/core/IconButton";

export class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contactMe: false,
    };
  }

  openContactMe = () => {
    this.setState({
      contactMe: true,
    });
  };

  closeContactMe = () => {
    this.setState({
      contactMe: false,
    });
  };
  render() {
    return (
      <div>
        <BottomNavigation showLabels className='Footer'>
          <div className='cpDiv'>
            <div>&copy; Copyright 2020, COVID19HospitalTracker.</div>
            <div>All rights reserved.</div>
          </div>
          <div className='authorAvatar' onClick={() => this.openContactMe()}>
            <IconButton aria-label='delete' style={{ padding: "5px 0", color: "#00fff9" }}>
              <ContactMailIcon />
            </IconButton>
          </div>
        </BottomNavigation>
        <ContactMe open={this.state.contactMe} onClose={() => this.closeContactMe()} />
      </div>
    );
  }
}
