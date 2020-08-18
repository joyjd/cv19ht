import React from "react";

import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import "./../DoctorListModal/DoctorListModal.style.scss";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";

class DoctorListModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Dialog fullScreen open={this.props.open} onClose={this.props.onclose} aria-labelledby='Doctors list' aria-describedby='get Doctors list'>
        <div className='headerBod'>Medical Practitioners/Centers near you</div>
        <DialogContent>
          <div className='DocListContainerBody'>
            {this.props.doctorListData != null
              ? this.props.doctorListData.map((doctor, index) => (
                  <div key={index} className='DocDetails'>
                    <div className='docName'>
                      <div className='docAvatar'>
                        <AssignmentIndIcon fontSize='small' />
                      </div>
                      <div>{doctor.name}</div>
                    </div>
                    {doctor["opening_hours"] ? (
                      doctor["opening_hours"]["open_now"] ? (
                        <div className='openclose'>
                          <div className='icon-green'>
                            <i></i>
                          </div>
                          <div>Open Now</div>
                        </div>
                      ) : (
                        <div className='openclose'>
                          <div className='icon-close'>
                            <i></i>
                          </div>
                          Closed Now
                        </div>
                      )
                    ) : (
                      <div className='openclose'>Not Known</div>
                    )}

                    <div className='docAddress'>{doctor.formatted_address}</div>
                    {/*  <div>{doctor.place_id}</div> */}
                  </div>
                ))
              : "Loading...."}
          </div>
        </DialogContent>
        <DialogActions>
          <Button style={{ margin: "10px 20px 10px 0" }} autoFocus onClick={() => this.props.onclose()} variant='contained' color='primary'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
export default DoctorListModal;
