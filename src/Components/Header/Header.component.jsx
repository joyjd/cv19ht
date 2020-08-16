import React from "react";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";

import ContactMe from "./../ContactMe/ContactMe.component";
import ContactMailIcon from "@material-ui/icons/ContactMail";
import IconButton from "@material-ui/core/IconButton";

import "./../Header/Header.style.scss";

export class Header extends React.Component {
  loc_connection;
  constructor() {
    super();
    this.state = {
      contactMe: false,
      connection: navigator.connection.effectiveType,
    };
    this.loc_connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    this.loc_connection.addEventListener("change", () => this.updateConnectionStatus());
  }

  updateConnectionStatus = () => {
    this.setState({
      connection: this.loc_connection.effectiveType,
    });
  };
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
        <AppBar position='static' className='Header'>
          <Container maxWidth='md' style={{ display: "flex", justifyContent: "space-between" }}>
            <div id='back-to-top-anchor'>
              <Typography variant='h6' gutterBottom>
                <span className='logoHolderText2 '>COVID19</span>
                <span className='logoHolderText'>HospitalTracker</span>
              </Typography>
              <div style={{ fontSize: "small" }}>Having speed ={this.state.connection}</div>
            </div>
            <div onClick={() => this.openContactMe()}>
              <IconButton aria-label='delete' style={{ padding: "5px 0", color: "#00fff9" }}>
                <ContactMailIcon />
              </IconButton>
            </div>
          </Container>
        </AppBar>
        <ContactMe open={this.state.contactMe} onClose={() => this.closeContactMe()} />
      </div>
    );
  }
}
