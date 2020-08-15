import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

import "./../ErrorModal/ErrorModal.style.scss";
import BuildIcon from "@material-ui/icons/Build";
import NewReleasesIcon from "@material-ui/icons/NewReleases";
import Button from "@material-ui/core/Button";

export const ErrorModal = ({ open, onclose, body }) => {
  return (
    <Dialog
      BackdropProps={{
        style: {
          background: "#b0c1cf",
          opacity: "0.97",
        },
      }}
      PaperProps={{
        style: {
          borderRadius: "5px",
          height: "400px",
          width: "400px",
          backgroundColor: "#b0c1cf",

          boxShadow: "6px 6px 12px #96a4b0,-6px -6px 12px #cadeee",
        },
      }}
      onClose={onclose}
      aria-labelledby='simple-dialog-title'
      open={open}
    >
      <DialogContent>
        <div className='ErrorBody'>
          <div className='ErrorHeader'>
            <div className='contentdiv'>
              <NewReleasesIcon fontSize='large' />
            </div>
            <div className='contentdiv'>
              <BuildIcon fontSize='large' />
            </div>
            <div className='contentdiv textHeader'> OOPS !</div>
          </div>
          <div className='ErrorDesc'>{body}</div>
          <div className='ErrorAction'>
            <div>
              <Button variant='contained' color='primary' onClick={() => onclose(true)}>
                Okay
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
