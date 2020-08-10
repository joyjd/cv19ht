import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { makeStyles } from "@material-ui/core/styles";

/* const style = {
  borderRadius: "50px",
  background: "#d6d6d6",
  boxShadow: "20px 20px 60px #b6b6b6,-20px -20px 60px #f6f6f6",
}; */

export const ErrorModal = ({ open, onClose, body }) => {
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
      onClose={onClose}
      aria-labelledby='simple-dialog-title'
      open={open}
    >
      <DialogContent>
        <div>{body}</div>
      </DialogContent>
    </Dialog>
  );
};
