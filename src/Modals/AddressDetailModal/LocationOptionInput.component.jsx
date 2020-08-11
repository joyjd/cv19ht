import React, { useState } from "react";

import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import { Header } from "./../../Components/Header/Header.component";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import "./../AddressDetailModal/LocationOptionInput.style.scss";

export default class LocationOptionInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locality: "",
      district: "",
      pin: "",
      state: "West Bengal",
      country: "India",
    };
  }

  handleInputChange = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  };

  render() {
    return (
      <Dialog fullScreen open={this.props.open} onClose={this.props.handleAlertClose} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
        <Header />
        <Container>
          <div className='shadowCustom locBodyHolder'>
            <Paper elevation={3}>
              <div className='locPromptheader'>Provide address details</div>
              <div className='locPromptbody'>
                <div>We can trace your current location based on the address details you provide.</div>
                <div className='textFieldContainer'>
                  <TextField className='w_100' id='standard-multiline-static' name='locality' value={this.state.locality} onChange={(e) => this.handleInputChange(e)} label='Your locality' multiline rows={4} />
                </div>
                <div className='textFieldContainer'>
                  <TextField className='w_100' id='standard-basic' name='district' value={this.state.district} onChange={(e) => this.handleInputChange(e)} label='District' />
                </div>
                <div className='textFieldContainer'>
                  <TextField className='w_100' id='standard-basic' name='pin' value={this.state.pin} onChange={(e) => this.handleInputChange(e)} type='number' label='Pin Code' />
                </div>
                <div className='textFieldContainer'>
                  <TextField
                    className='w_100'
                    id='standard-read-only-input'
                    label='State'
                    defaultValue='West Bengal'
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </div>
                <div className='textFieldContainer'>* Currently we are only supporting this application within West Bengal</div>
                <div className='textFieldContainer'>
                  <Button variant='contained' color='primary' onClick={() => this.props.onClose(this.state)}>
                    Submit Location Details
                  </Button>
                </div>
              </div>
            </Paper>
          </div>
        </Container>
      </Dialog>
    );
  }
}
