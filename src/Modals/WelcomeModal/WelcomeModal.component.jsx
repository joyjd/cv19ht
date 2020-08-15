import React from "react";
import "./../WelcomeModal/WelcomeModal.style.scss";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";

export default function WelcomeModal(props) {
  return (
    <div id='welcomeDialogue'>
      <Dialog
        fullWidth={true}
        open={props.open}
        style={{
          backgroundColor: "#5264ca",
          color: "white",
        }}
        PaperProps={{
          style: {
            borderRadius: "5px",
            top: "30px",
          },
        }}
        onClose={props.handleAlertClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogContent style={{ backgroundColor: "#3b87ff", paddingLeft: "5px", paddingRight: "5px" }} id='welcomeContent'>
          <div className='headerImageContainer'>
            <div className='headerImageHolder'></div>
            <div className='animatorTest'>
              <div className='headerImageFiller'>
                <div className='headerImageFillerInner'></div>
              </div>
            </div>

            <div className='welcomeNote'> Hello !</div>
          </div>
          <div className='welcomeContent'>
            <div className='welcomeBodyContent'>
              <div className='div_0'>
                <strong>Lets Stand Strong Together. </strong>
              </div>
              <div className='div_1'>
                <strong>
                  <span className='NameHolder'>COVID19 HospitalTracker</span>
                </strong>
                is a mobile-friendly web app designed specifically to help you tackle the tough times of COVID19.
                <br />
                <br />
                This web-app helps you in tracking hospitals providing care for COVID19 patients based on your location.
              </div>
              <br />
              <div className='div_2'> To aid you in the best way,enable permission to access your device location when asked next.</div>
              Stay safe.
            </div>
          </div>
        </DialogContent>
        <DialogActions style={{ backgroundColor: "#3b87ff" }}>
          <div className='btn_Container'>
            <Button onClick={() => props.onClose(true)} color='primary' variant='contained'>
              Proceed
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}
