import React from "react";

import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

export default function BackDropCustom(props) {
  return props.open == true ? (
    <Dialog open={props.open} onClose={props.handleAlertClose} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
      <DialogContent>
        <CircularProgress></CircularProgress>
      </DialogContent>
    </Dialog>
  ) : null;
}
