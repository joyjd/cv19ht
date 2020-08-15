import React from "react";
import { connect } from "react-redux";
import DialogContent from "@material-ui/core/DialogContent";
import Container from "@material-ui/core/Container";
import Dialog from "@material-ui/core/Dialog";
import "./../ContactMe/ContactMe.style.scss";
import CloseIcon from "@material-ui/icons/Close";
import Snackbar from "@material-ui/core/Snackbar";

export default class ContactMe extends React.Component {
  constructor(props) {
    super(props);
    this.state = { feedback: "", name: "", email: "joydas1611@gmail.com", errorMessage: "", snkBar: false };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event, type) {
    if (type == "feedbackDesc") {
      this.setState({ feedback: event.target.value });
    } else {
      this.setState({ name: event.target.value });
    }
  }

  handleSubmit = (event) => {
    const templateId = "template_lddOxOX0";
    if (this.state.name != "" && this.state.feedback != "") {
      this.setState(
        {
          errorMessage: "",
        },
        () => this.sendFeedback(templateId, { message_html: this.state.feedback, from_name: this.state.name, reply_to: this.state.email })
      );
    } else if (this.state.name == "") {
      this.setState({
        errorMessage: "Opps ! You missed out your name.",
      });
    } else if (this.state.feedback == "") {
      this.setState({
        errorMessage: "Please dont send me blank messages !",
      });
    }
  };
  sendFeedback(templateId, variables) {
    window.emailjs
      .send("gmail", templateId, variables)
      .then((res) => {
        this.setState({
          errorMessage: "",
          feedback: "",
          name: "",
          snkBar: true,
        });
      })
      // Handle errors here however you like, or use a React error boundary
      .catch((err) =>
        this.setState({
          errorMessage: "Message sending failed.Please try again in sometime.",
        })
      );
  }

  closeModal = () => {
    this.setState(
      {
        snkBar: false,
        errorMessage: "",
      },
      () => this.props.onClose()
    );
  };

  closeSnackBar = () => {
    this.setState({
      snkBar: false,
    });
  };
  render() {
    return (
      <div>
        <Dialog fullScreen open={this.props.open} onClose={this.props.onclose} aria-labelledby='Contact Me' aria-describedby='About Me'>
          <div
            className='bod_Skeleton'
            style={{
              backgroundColor: "##ebecf0",
            }}
          >
            <DialogContent
              style={{
                backgroundColor: "##ebecf0",
              }}
            >
              <Container maxWidth='xs' style={{ padding: "0" }}>
                <div onClick={() => this.closeModal()}>
                  <CloseIcon fontSize='large' />
                </div>
                <div className='bod_Container'>
                  <div className='bod_ImageHolder'>
                    <div className='div_Welcome'>
                      <h2>Insights</h2>
                    </div>
                    <div className='div_avatar'>
                      <div className='div_Avatar_ImgContainer'>
                        <div className='avt_inner'></div>
                      </div>
                    </div>
                  </div>
                  <div className='bod_FormHolder'>
                    <div className='desContainer'>
                      Hi! I am <strong>Joy</strong> and I develop web applications and websites as part of my livelihood. COVID19 HospitalTracker is a pet-project of mine and is intended as a giveaway to the community during tough times.
                      <br />
                      If you find it useful, drop a message to show your love and appreciation ! <br />
                      <br />
                      Cheers !
                    </div>
                    <div className='formContainer'>
                      <label>
                        <input id='userName' name='userName' onChange={(e) => this.handleChange(e, "userName")} type='text' value={this.state.name} placeholder='Your Name' required />
                      </label>
                      <label>
                        <textarea id='feedbackDesc' name='feedbackDesc' onChange={(e) => this.handleChange(e, "feedbackDesc")} required value={this.state.feedback} placeholder='Your Message To Me...' rows='4' cols='35' />
                      </label>
                    </div>
                    {this.state.errorMessage != "" ? <div className='errorHolder'>{this.state.errorMessage}</div> : null}
                  </div>
                  <div className='bod_ActionHolder'>
                    <div className='btnContactMe' onClick={this.handleSubmit}>
                      Send Message
                    </div>
                    <div className='btnContactMe' onClick={() => this.closeModal()}>
                      No, maybe later
                    </div>
                  </div>
                </div>
              </Container>
            </DialogContent>
          </div>
        </Dialog>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={this.state.snkBar}
          onClose={() => this.closeSnackBar()}
          autoHideDuration={2000}
          message='Message delivered succesfully!'
        />
      </div>
    );
  }
}
